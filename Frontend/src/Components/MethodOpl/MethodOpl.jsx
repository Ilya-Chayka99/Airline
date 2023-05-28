import {TabMenu} from "primereact/tabmenu";
import './MethodOpl.css'
import {useEffect, useState} from "react";
import err from './img/Error.png'
import info from './img/info.png'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ky from "ky";
import {selectNumberTicket} from "../slice/airSlise.jsx";
const CONFIG_APP = import.meta.env

const MethodOpl = ()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const [ticket,setTicket] =useState(useSelector(state => state.air.byTicket))
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const form = useSelector(state => state.air.formByInfo)
    useEffect(()=>{
        if(ticket==null) navigate("/")
        if(!form) navigate("/")
    },[])
    const items = [
        {label: 'Credit card'},
        {label: 'Google Pay'},
        {label: 'Apple Pay'},
        {label: 'Paypal'},
        {label: 'Bananz'}
    ];
    const usesSave=()=>{

        // async function fetchData() {
        //     await ky.post('createTicket', {prefixUrl: 'http://localhost:8080',json:
        //             {
        //                 "id":2,
        //                 "id_client": 1,
        //                 "id_flight":5,
        //                 "date_registration":"2023-05-09",
        //                 "seat_number":null
        //             }
        //     }).json().catch(err=>console.log(err))
        // }
        // fetchData().then(r => r)

        async function fetchData() {
                const formData = new FormData();
                formData.append('phone', form.tel)
                formData.append('seat_number', null)
                formData.append('status', "Оформлен")
                formData.append('serial', "")
                const serial = await ky.post('ticket/setinfoticketseat', {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,body:
                      formData
                }).json().catch(err=>console.log(err))
                dispatch(selectNumberTicket(serial))
            }
            fetchData().then(r => r)
        setTimeout(()=>{navigate("/success")},2000)


    }
    return(
        <>
            <section className="oplata">
                <h2>Выберите способ оплаты</h2>
                <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}  />

                {activeIndex!==4?<img src={err} alt="" className="imgErr"/>:<img src={info} alt="" className="imgErr"/>}
                {activeIndex!==4?<></>:<button className="bt op" onClick={()=>usesSave()} >Оформить</button>}

            </section>
        </>
    )
}
export default MethodOpl