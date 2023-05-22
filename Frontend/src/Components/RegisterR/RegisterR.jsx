import {InputMask} from "primereact/inputmask";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import ky from "ky";
import {useNavigate} from "react-router-dom";
import './RegisterR.css'
import {BsArrowRightSquareFill} from "react-icons/bs";
import lig from './img/business.png'
import {Dialog} from "primereact/dialog";
const CONFIG_APP = import.meta.env
import { Toast } from 'primereact/toast';


const RegisterR = () => {
    const [ticket, setTicket] = useState(useSelector(state => state.air.byTicket))
    const [ticketValid, setTicketValid] = useState(null)
    const [bil, setBil] = useState('');
    const navigate = useNavigate();
    const [air, setAir] = useState([]);
    const [setClose, setSetClose] = useState([]);
    const [serPas, setSerPas] = useState('');
    const [nomPas, setNomPas] = useState('');
    const [seat, setSeat] = useState('');
    const [info, setInfo] = useState(null);
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);
    const [_ws, _setWs] = useState();



    useEffect(() => {
        if (ticket == null) navigate("/")
        async function fetchData1() {
            setAir(await ky('Airport', {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND}).json())
        }

        fetchData1().then(r => r)
        const ws = new WebSocket('ws://localhost:8080/wsUser');
        ws.onopen = () => {
            console.log("Соединение установлено");
            _setWs(ws)
        };
        ws.onmessage = (event) => {
            // console.log("Получено сообщение: ", event.data);
            setSetClose(event.data)
        }
        ws.onclose = (event) => {
            console.log("WebSocket closed with code:", event.code);
        };
        return () => {
            ws.close();
        };
    }, [])

    const timeFormat = (date) => {
        const hourDiff = new Date(date)
        const minDiff = hourDiff.getMinutes()
        const hDiff = hourDiff.getHours()
        let humanReadable = {};
        humanReadable.hours = hDiff;
        humanReadable.minutes = minDiff
        return `${humanReadable.hours < 10 ? "0" + humanReadable.hours : humanReadable.hours}:
        ${humanReadable.minutes < 10 ? "0" + humanReadable.minutes : humanReadable.minutes}`
    }
    const cub = (event) => {
        event.preventDefault()

        async function fetchData() {
            const req=await ky.post('ticket/search', {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,json:{
                "id_flight":ticket.id,
                "bil":bil,
                "serPas":serPas,
                "nomPas":nomPas
                }}).json()
            setTicketValid(req)
            if(req===null || req===''){
                    toast.current.show({severity:'error', summary: 'Ошибка', detail:'Билет не найден!! Проверьте введеную информацию.', life: 3000});
            }
        }

        fetchData().then(r => r)
        async function fetchData1() {
            const searchParams = new URLSearchParams();
            searchParams.set('id',ticket.id)
            setSetClose(await ky.post(`ticket/seat`, {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,body:searchParams}).json())
        }
        fetchData1().then(r => r)
    }
    useEffect(() => {
        if(ticketValid!=null)
            setInfo(ticketValid)
        else
            setInfo(null)

    }, [ticketValid])
    const clickBtn = (id) => {
        setSeat(id)
    }
    const veriv = (id) => {
        if(setClose.includes(id)) return 1;
        return 0;
    }
    const reg =  () => {


        async function fetchData(){
        const formData = new FormData();
        formData.append('phone', null)
        formData.append('seat_number', seat)
        formData.append('status', "Оформлен")
        formData.append('serial', bil)
        const req= await ky.post('ticket/setinfoticketseat', {prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,body:
            formData
        }).json().catch(err=>console.log(err))
            if(req.status==="err")
                toast.current.show({severity:'error', summary: 'Ошибка', detail:req.massage, life: 3000});
            if(req.status==="OK"){
                _ws.send(JSON.stringify(ticket.id))
                toast.current.show({severity:'success', summary: '', detail:"Вы успешно зарегистрировалиись на рейс!", life: 3000});
                setTimeout(()=>{
                    navigate("/")
                },2000)
            }

        }
    fetchData().then(r => r)

    }

    return (
        <>
            {ticket && <section className="formBy">
                <div className="form-registor-ticket">
                    <div className="form-info-header">
                        <p>{air.filter(y => y.id === ticket.id_v)[0]?.name} {<BsArrowRightSquareFill style={{
                            marginLeft: "20px",
                            marginRight: "20px"
                        }}/>} {air.filter(y => y.id === ticket.id_p)[0]?.name}</p>
                    </div>
                    <img src={lig} alt=""/>
                    <span className="spk">Поиск билета</span>
                    <div className="serch">
                        <Toast ref={toast} />
                        <InputMask id="ssn" value={bil} mask="***-***-***-******" placeholder="Номер билета*"
                                   onChange={(e) => setBil(e.target.value)}></InputMask>
                        <InputMask value={serPas}
                                   onChange={(e) => setSerPas(e.target.value)}
                                   mask="9999" placeholder="Серия паспорта*"
                                   required
                        />
                        <InputMask value={nomPas}
                                   onChange={(e) => setNomPas(e.target.value)}
                                   mask="999999" placeholder="Номер паспорта*"
                                   required
                        />
                        <button className="form-btn" type="submit" onClick={cub}>Найти</button>
                    </div>
                    {info!=='' && info!==null && <div className="info-ticket-reg">
                        <span><span>Имя:</span> {info.name}</span>
                        <span><span>Фамилия:</span> {info.sename}</span>
                        <span><span>Отчество:</span> {info.lastname}</span>
                        <span><span>Дата рождения:</span> {new Date(info.datero).getDate() + "-" +
                            (new Date(info.datero).getMonth() + 1) + "-" + new Date(info.datero).getFullYear()}</span>
                        <span><span>Телефон:</span> {info.phone}</span>
                        <span><span>Дата покупки:</span> {new Date(info.date_registration).getDate() + " " +
                            new Date(info.date_registration)?.toLocaleString('default', {month: 'long'}) + " " +
                            timeFormat(info.date_registration)}</span>
                    </div>}
                    <div className={"seat"} >
                        <button className={ticketValid!=='' && ticketValid !== null?"form-btn":"form-btn-close"} style={{
                            marginBottom: "40px",
                            marginRight: "20px"
                        }} onClick={() => setVisible(ticketValid !== '' && ticketValid !== null)}>{seat === '' ? "Выбрать место" : seat}</button>
                        <button className={seat !== ''?"form-btn":"form-btn-close"} style={{marginBottom: "40px"}} onClick={()=>{
                            seat!=='' && reg()
                        }}>Зарегистрировать</button>
                    </div>
                </div>
                <Dialog visible={visible} className="airplane" style={{
                    width: '80vw', minWidth: "310px",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    height: "90vh"
                }}
                        onHide={() => setVisible(false)}>
                    <div className="air-fon">
                        <div className="btns-air-seat">
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A1") === 0 ? (seat !== "A1" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A1"}
                                        onClick={(event) => veriv("A1") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B1") === 0 ? (seat !== "B1" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B1"}
                                        onClick={(event) => veriv("B1") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C1") === 0 ? (seat !== "C1" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C1"}
                                        onClick={(event) => veriv("C1") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D1") === 0 ? (seat !== "D1" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D1"}
                                        onClick={(event) => veriv("D1") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A2") === 0 ? (seat !== "A2" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A2"}
                                        onClick={(event) => veriv("A2") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B2") === 0 ? (seat !== "B2" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B2"}
                                        onClick={(event) => veriv("B2") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C2") === 0 ? (seat !== "C2" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C2"}
                                        onClick={(event) => veriv("C2") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D2") === 0 ? (seat !== "D2" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D2"}
                                        onClick={(event) => veriv("D2") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A3") === 0 ? (seat !== "A3" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A3"}
                                        onClick={(event) => veriv("A2") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B3") === 0 ? (seat !== "B3" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B3"}
                                        onClick={(event) => veriv("B2") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C3") === 0 ? (seat !== "C3" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C3"}
                                        onClick={(event) => veriv("C3") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D3") === 0 ? (seat !== "D3" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D3"}
                                        onClick={(event) => veriv("D3") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A4") === 0 ? (seat !== "A4" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A4"}
                                        onClick={(event) => veriv("A2") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B4") === 0 ? (seat !== "B4" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B4"}
                                        onClick={(event) => veriv("B4") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C4") === 0 ? (seat !== "C4" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C4"}
                                        onClick={(event) => veriv("C4") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D4") === 0 ? (seat !== "D4" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D4"}
                                        onClick={(event) => veriv("D4") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A5") === 0 ? (seat !== "A5" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A5"}
                                        onClick={(event) => veriv("A5") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B5") === 0 ? (seat !== "B5" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B5"}
                                        onClick={(event) => veriv("B5") === 0 && clickBtn(event.target.id)}>1
                                    </button>

                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C5") === 0 ? (seat !== "C5" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C5"}
                                        onClick={(event) => veriv("C5") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D5") === 0 ? (seat !== "D5" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D5"}
                                        onClick={(event) => veriv("D5") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                            </div>


                            <div className="onek two-class">
                                <div className="tou">
                                    <button
                                        className={veriv("A6") === 0 ? (seat !== "A6" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A6"}
                                        onClick={(event) => veriv("A6") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B6") === 0 ? (seat !== "B6" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B6"}
                                        onClick={(event) => veriv("B6") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C6") === 0 ? (seat !== "C6" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C6"}
                                        onClick={(event) => veriv("C6") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D6") === 0 ? (seat !== "D6" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D6"}
                                        onClick={(event) => veriv("D6") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A7") === 0 ? (seat !== "A7" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A7"}
                                        onClick={(event) => veriv("A7") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B7") === 0 ? (seat !== "B7" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B7"}
                                        onClick={(event) => veriv("B7") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C7") === 0 ? (seat !== "C7" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C7"}
                                        onClick={(event) => veriv("C7") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D7") === 0 ? (seat !== "D7" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D7"}
                                        onClick={(event) => veriv("D7") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A8") === 0 ? (seat !== "A8" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A8"}
                                        onClick={(event) => veriv("A8") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B8") === 0 ? (seat !== "B8" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B8"}
                                        onClick={(event) => veriv("B8") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C8") === 0 ? (seat !== "C8" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C8"}
                                        onClick={(event) => veriv("C8") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D8") === 0 ? (seat !== "D8" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D8"}
                                        onClick={(event) => veriv("D8") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A9") === 0 ? (seat !== "A9" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A9"}
                                        onClick={(event) => veriv("A9") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B9") === 0 ? (seat !== "B9" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B9"}
                                        onClick={(event) => veriv("B9") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C9") === 0 ? (seat !== "C9" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C9"}
                                        onClick={(event) => veriv("C9") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D9") === 0 ? (seat !== "D9" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D9"}
                                        onClick={(event) => veriv("D9") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A10") === 0 ? (seat !== "A10" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A10"}
                                        onClick={(event) => veriv("A10") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B10") === 0 ? (seat !== "B10" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B10"}
                                        onClick={(event) => veriv("B10") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C10") === 0 ? (seat !== "C10" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C10"}
                                        onClick={(event) => veriv("C10") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D10") === 0 ? (seat !== "D10" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D10"}
                                        onClick={(event) => veriv("D10") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A11") === 0 ? (seat !== "A11" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A11"}
                                        onClick={(event) => veriv("A11") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B11") === 0 ? (seat !== "B11" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B11"}
                                        onClick={(event) => veriv("B11") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C11") === 0 ? (seat !== "C11" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C11"}
                                        onClick={(event) => veriv("C11") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D11") === 0 ? (seat !== "D11" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D11"}
                                        onClick={(event) => veriv("D11") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek two-class-v">
                                <div className="tou">
                                    <button
                                        className={veriv("A12") === 0 ? (seat !== "A12" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A12"}
                                        onClick={(event) => veriv("A12") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B12") === 0 ? (seat !== "B12" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B12"}
                                        onClick={(event) => veriv("B12") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C12") === 0 ? (seat !== "C12" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C12"}
                                        onClick={(event) => veriv("C12") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D12") === 0 ? (seat !== "D12" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D12"}
                                        onClick={(event) => veriv("D12") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A13") === 0 ? (seat !== "A13" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A13"}
                                        onClick={(event) => veriv("A13") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B13") === 0 ? (seat !== "B13" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B13"}
                                        onClick={(event) => veriv("B13") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C13") === 0 ? (seat !== "C13" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C13"}
                                        onClick={(event) => veriv("C13") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D13") === 0 ? (seat !== "D13" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D13"}
                                        onClick={(event) => veriv("D13") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A14") === 0 ? (seat !== "A14" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A14"}
                                        onClick={(event) => veriv("A14") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B14") === 0 ? (seat !== "B14" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B14"}
                                        onClick={(event) => veriv("B14") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C14") === 0 ? (seat !== "C14" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C14"}
                                        onClick={(event) => veriv("C14") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D14") === 0 ? (seat !== "D14" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D14"}
                                        onClick={(event) => veriv("D14") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A15") === 0 ? (seat !== "A15" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A15"}
                                        onClick={(event) => veriv("A15") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B15") === 0 ? (seat !== "B15" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B15"}
                                        onClick={(event) => veriv("B15") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C15") === 0 ? (seat !== "C15" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C15"}
                                        onClick={(event) => veriv("C15") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D15") === 0 ? (seat !== "D15" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D15"}
                                        onClick={(event) => veriv("D15") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek two-class-v">
                                <div className="tou">
                                    <button
                                        className={veriv("A16") === 0 ? (seat !== "A16" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A16"}
                                        onClick={(event) => veriv("A16") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B16") === 0 ? (seat !== "B16" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B16"}
                                        onClick={(event) => veriv("B16") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C16") === 0 ? (seat !== "C16" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C16"}
                                        onClick={(event) => veriv("C16") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D16") === 0 ? (seat !== "D16" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D16"}
                                        onClick={(event) => veriv("D16") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A17") === 0 ? (seat !== "A17" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A17"}
                                        onClick={(event) => veriv("A17") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B17") === 0 ? (seat !== "B17" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B17"}
                                        onClick={(event) => veriv("B17") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C17") === 0 ? (seat !== "C17" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C17"}
                                        onClick={(event) => veriv("C17") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D17") === 0 ? (seat !== "D17" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D17"}
                                        onClick={(event) => veriv("D17") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A18") === 0 ? (seat !== "A18" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A18"}
                                        onClick={(event) => veriv("A18") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B18") === 0 ? (seat !== "B18" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B18"}
                                        onClick={(event) => veriv("B18") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C18") === 0 ? (seat !== "C18" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C18"}
                                        onClick={(event) => veriv("C18") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D18") === 0 ? (seat !== "D18" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D18"}
                                        onClick={(event) => veriv("D18") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A19") === 0 ? (seat !== "A19" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A19"}
                                        onClick={(event) => veriv("A19") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B19") === 0 ? (seat !== "B19" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B19"}
                                        onClick={(event) => veriv("B19") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C19") === 0 ? (seat !== "C19" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C19"}
                                        onClick={(event) => veriv("C19") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D19") === 0 ? (seat !== "D19" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D19"}
                                        onClick={(event) => veriv("D19") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A20") === 0 ? (seat !== "A20" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A20"}
                                        onClick={(event) => veriv("A20") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B20") === 0 ? (seat !== "B20" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B20"}
                                        onClick={(event) => veriv("B20") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C20") === 0 ? (seat !== "C20" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C20"}
                                        onClick={(event) => veriv("C20") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D20") === 0 ? (seat !== "D20" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D20"}
                                        onClick={(event) => veriv("D20") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A21") === 0 ? (seat !== "A21" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A21"}
                                        onClick={(event) => veriv("A21") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B21") === 0 ? (seat !== "B21" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B21"}
                                        onClick={(event) => veriv("B21") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C21") === 0 ? (seat !== "C21" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C21"}
                                        onClick={(event) => veriv("C21") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D21") === 0 ? (seat !== "D21" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D21"}
                                        onClick={(event) => veriv("D21") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A22") === 0 ? (seat !== "A22" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A22"}
                                        onClick={(event) => veriv("A22") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B22") === 0 ? (seat !== "B22" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B22"}
                                        onClick={(event) => veriv("B22") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C22") === 0 ? (seat !== "C22" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C22"}
                                        onClick={(event) => veriv("C22") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D22") === 0 ? (seat !== "D22" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D22"}
                                        onClick={(event) => veriv("D22") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek two-class-v">
                                <div className="tou">
                                    <button
                                        className={veriv("A23") === 0 ? (seat !== "A23" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A23"}
                                        onClick={(event) => veriv("A23") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B23") === 0 ? (seat !== "B23" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B23"}
                                        onClick={(event) => veriv("B23") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C23") === 0 ? (seat !== "C23" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C23"}
                                        onClick={(event) => veriv("C23") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D23") === 0 ? (seat !== "D23" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D23"}
                                        onClick={(event) => veriv("D23") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A24") === 0 ? (seat !== "A24" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A24"}
                                        onClick={(event) => veriv("A24") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B24") === 0 ? (seat !== "B24" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B24"}
                                        onClick={(event) => veriv("B24") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C24") === 0 ? (seat !== "C24" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C24"}
                                        onClick={(event) => veriv("C24") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D24") === 0 ? (seat !== "D24" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D24"}
                                        onClick={(event) => veriv("D24") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>
                            <div className="onek">
                                <div className="tou">
                                    <button
                                        className={veriv("A25") === 0 ? (seat !== "A25" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"A25"}
                                        onClick={(event) => veriv("A25") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("B25") === 0 ? (seat !== "B25" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"B25"}
                                        onClick={(event) => veriv("B25") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>
                                <div className="tou">
                                    <button
                                        className={veriv("C25") === 0 ? (seat !== "C25" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"C25"}
                                        onClick={(event) => veriv("C25") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                    <button
                                        className={veriv("D25") === 0 ? (seat !== "D25" ? "seatY size-btn-bzn" : "seatOK size-btn-bzn") : "seatN size-btn-bzn"}
                                        id={"D25"}
                                        onClick={(event) => veriv("D25") === 0 && clickBtn(event.target.id)}>1
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>

                </Dialog>
            </section>}
        </>
    )
}
export default RegisterR