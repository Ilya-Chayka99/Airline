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
    const [infoApi, setInfoApi] = useState(null);
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
    const usesSave=async ()=>{

        async function fetchData1() {
            const a= await ky(`createApiPaymentLink?livingTime=20000&priceType=1&price=${ticket.money}&apikey=NoAkKJ3XGHtnhCIm94BV7DoAzAyn8QRcRHfKqrRtinuBfA5YdvFP3RlSB1Ll2rZm3NdT3wZG1ApthSFZ0XO6aZyObDhJG0IPbxQMjZkSyZNgkz9rH75GM8TM0UiQwAD2pmcCDZOxEndssvVdycf3E4DZkxp4ZAiJT64gsnu0xRATRjZTtLg3EMOxHVD7N9T9UIMjX0iWDLkmD8dfLAEpzPa1JcwtmoI5yVnBQQmW8R54iRFrTCRs4e73je6PC9O`,
                {prefixUrl: 'http://193.233.233.3:8080'
            }).json().catch(err=>console.log(err))
            setInfoApi(a)
            window.open(a.link, '_blank', 'location=yes,scrollbars=yes,status=yes');
            let info= setInterval(async () => {
                const b= await ky.post(`getInfoByPaymentLink?linkKey=${a.linkKey}`,
                    {prefixUrl: 'http://193.233.233.3:8080'
                    }).json().catch(err=>console.log(err))
                console.log(b)
                if(b.paymentStatus==1){
                    clearInterval(info);
                    // eslint-disable-next-line no-inner-declarations
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
                    navigate("/success")
                }
                if(b.paymentStatus===-1){
                    clearInterval(info);

                    navigate("/")
                }
            }, 3000);

        }
        fetchData1().then(r => r)

        // async function fetchData() {
        //         const formData = new FormData();
        //         formData.append('phone', form.tel)
        //         formData.append('seat_number', null)
        //         formData.append('status', "Оформлен")
        //         formData.append('serial', "")
        //         const serial = await ky.post('ticket/setinfoticketseat', {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,body:
        //               formData
        //         }).json().catch(err=>console.log(err))
        //         dispatch(selectNumberTicket(serial))
        //     }
        //     fetchData().then(r => r)



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