import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ky from "ky";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './TicketList.css'
import {BsAirplane, BsClock, BsFillPersonVcardFill} from 'react-icons/bs'
import cardImg from './img/img.png'
import {useNavigate} from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';
import {selectByTicket} from "../slice/airSlise.jsx";
import CardT from "../Card/Card.jsx";
import {v4 as uuv4} from "uuid";

const TicketList=()=>{
    const navigate = useNavigate();
    const selectOutput = useSelector(state => state.air.selectOutput)
    const selectInput = useSelector(state => state.air.selectInput)
    const dateOutput = useSelector(state => state.air.dateOutput)
    const dateInput = useSelector(state => state.air.dateInput)
    useEffect(()=>{
        if(dateOutput==null) navigate("/")
    },[])
    const [ticket,setTicket] = useState([]);
    useEffect(()=>{
        async function fetchData() {
            setTicket(await ky('Flights', {prefixUrl: 'http://localhost:8080'}).json())
        }
        fetchData().then(r =>  r)

    },[])

    return(
        <>
            <section className="ticketlist" key={uuv4()}>
                <h2>Рейсы из {selectOutput.name} в {selectInput.name} на {new Date(dateOutput)?.getDate()+" "}
                    {new Date(dateOutput)?.toLocaleString('default', {month: 'long'})}</h2>
                 <div className="list" key={uuv4()}>
                     {
                        ticket.filter(x => x.id_v === selectOutput.id && x.id_p === selectInput.id && new Date(x.date_v).getDate() === new Date(dateOutput)?.getDate())
                            .sort((x,y)=>new Date(x.time_v).getHours()-new Date(y.time_v).getHours())
                            .map(x => (
                                // eslint-disable-next-line react/jsx-key
                                <CardT x={x}/>
                            ))
                    }
                    </div>
            </section>
        </>
    )
}
export default TicketList