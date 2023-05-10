import {TabMenu} from "primereact/tabmenu";
import './MethodOpl.css'
import {useEffect, useState} from "react";
import err from './img/Error.png'
import info from './img/info.png'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ky from "ky";

const MethodOpl = ()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const [ticket,setTicket] =useState(useSelector(state => state.air.byTicket))
    const navigate = useNavigate();
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
        navigate("/success")

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