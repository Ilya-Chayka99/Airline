import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ky from "ky";
import { Card } from 'primereact/card';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './TicketList.css'
import {BsAirplane, BsClock, BsFillPersonVcardFill} from 'react-icons/bs'
import cardImg from './img/img.png'
import {useNavigate} from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';


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
    const header = (
        <img alt="Card" src={cardImg} />
    );
    const footer = (x)=>{

        return <p>{x.money+"₽"}</p>;

    }

    const calculate =(x)=>{

        let hourDiff = new Date(x.time_v).getTime() - new Date(x.time_p).getTime(); //in ms
        let day = new Date(x.date_p).getDate()- new Date(x.date_v).getDate()
        let minDiff = hourDiff / 60 / 1000; //in minutes
        let hDiff = hourDiff / 3600 / 1000; //in hours
        let humanReadable = {};
        humanReadable.hours = Math.floor(24*day- hDiff) ;
        humanReadable.minutes = 60- (minDiff - 60 * Math.floor(hDiff));
        return `${humanReadable.hours}:${humanReadable.minutes}`
    }
    return(
        <>
            <section className="ticketlist">
                <h2>Рейсы из {selectOutput.name} в {selectInput.name} на {new Date(dateOutput)?.getDate()+" "}
                    {new Date(dateOutput)?.toLocaleString('default', {month: 'long'})}</h2>
                 <div className="list">
                     {
                        ticket.filter(x => x.id_v === selectOutput.id && x.id_p === selectInput.id && new Date(x.date_v).getDate() === new Date(dateOutput)?.getDate())
                            .sort((x,y)=>new Date(x.time_v).getHours()-new Date(y.time_v).getHours())
                            .map(x => (
                                <>
                                    <Card title={x.aviacompani}
                                          subTitle={"Номер рейса: " + x.numberreis}
                                          footer={footer(x)} header={header}
                                          className="md:w-25rem"
                                          key={x.id}
                                    >
                                        <div className="info">
                                            <div className="stat">
                                                <BsAirplane/>
                                                <span className="sp">{x.bort}</span>
                                            </div>
                                            <div className="stat">
                                                <BsFillPersonVcardFill/>
                                                <span className="sp">{"Статус: " + x.status}</span>
                                            </div>
                                            <div className="stat">
                                                <BsClock/>
                                                <span className="sp">{calculate(x)}</span>
                                            </div>
                                        </div>
                                        <p>* Вылет
                                            в {new Date(x.time_v).getHours() + ":" + new Date(x.time_v).getMinutes()}</p>
                                        <p>* Вылет
                                            в {new Date(x.time_p).getHours() + ":" + new Date(x.time_p).getMinutes()}</p>
                                        <p>* Регистрация будет доступна за сутки до вылета</p>
                                    </Card>
                                </>
                            ))
                    }
                    </div>
            </section>
        </>
    )
}
export default TicketList