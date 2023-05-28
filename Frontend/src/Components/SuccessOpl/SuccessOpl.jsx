import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import success from './img/Success.png'
import './SuccessOpl.css'
import Cookies from "universal-cookie";
import ky from "ky";

const SuccessOpl = ()=>{
    const [ticket,setTicket] =useState(useSelector(state => state.air.byTicket))
    const navigate = useNavigate();
    const serial = useSelector(state => state.air.numberTicket)
    useEffect(()=>{
        if(ticket==null) navigate("/")

    },[])
    return(
        <>
            {ticket && <section className="success">
                <img src={success} alt=""/>
                <div className="infoTicketOpl">
                    <div className="pos">
                        <span>Вылет в {new Date(ticket.time_v).getHours()+":"+new Date(ticket.time_v).getMinutes()}</span>
                        <span>Дата вылета {new Date(ticket.date_v).getDate()+" "+new Date(ticket.date_v).toLocaleString('default', {month: 'long'})}</span>
                        <span>Номер билета: {serial.serial}</span>
                    </div>
                </div>
            </section>}

        </>
    )
}
export default SuccessOpl