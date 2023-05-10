import cardImg from "../TicketList/img/img.png";
import {selectByTicket} from "../slice/airSlise.jsx";
import {useNavigate} from "react-router-dom";
import {BsAirplane, BsClock, BsFillPersonVcardFill} from "react-icons/bs";
import {Card} from "primereact/card";
import {useDispatch} from "react-redux";
import {v4 as uuv4} from "uuid";


const CardT = (props)=>{
    const x=props.x
    const navigate = useNavigate();
    const dispatch = useDispatch()
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
    const onByClick=(x)=>{
        dispatch(selectByTicket(x))
        navigate("/byticket")
    }
    return(
        <>
            <Card title={x.aviacompani}
                  subTitle={"Номер рейса: " + x.numberreis}
                  footer={footer(x)} header={header}
                  className="md:w-25rem"
                  key={x.id}
                  onClick={()=>onByClick(x)}
            >
                <div className="info" key={uuv4()}>
                    <div className="stat" key={uuv4()}>
                        <BsAirplane/>
                        <span className="sp">{x.bort}</span>
                    </div>
                    <div className="stat" key={uuv4()}>
                        <BsFillPersonVcardFill/>
                        <span className="sp">{"Статус: " + x.status}</span>
                    </div>
                    <div className="stat" key={uuv4()}>
                        <BsClock/>
                        <span className="sp">{calculate(x)}</span>
                    </div>
                </div>
                <p>* Вылет
                    в {new Date(x.time_v).getHours() + ":" + new Date(x.time_v).getMinutes()}</p>
                <p>* Прилет
                    в {new Date(x.time_p).getHours() + ":" + new Date(x.time_p).getMinutes()}</p>
                <p>* Регистрация будет доступна за сутки до вылета</p>
            </Card>
        </>
    )
}
export default CardT