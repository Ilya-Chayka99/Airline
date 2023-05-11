import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";
import CardT from "../Card/Card.jsx";
import bag from "../ByTicketForm/img/bag.png";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import ky from "ky";
import {selectFormByInfo} from "../slice/airSlise.jsx";
import {useNavigate} from "react-router-dom";
import './RegisterR.css'
import {BsArrowRightSquareFill} from "react-icons/bs";
import lig from './img/business.png'

const RegisterR = () => {
    const dispatch = useDispatch();
    const [ticket, setTicket] = useState(useSelector(state => state.air.byTicket))
    const [bil, setBil] = useState('');
    const navigate = useNavigate();
    const [air, setAir] = useState([]);

    useEffect(() => {
        if (ticket == null) navigate("/")

        async function fetchData1() {
            setAir(await ky('Airport', {prefixUrl: 'http://localhost:8080'}).json())
        }

        fetchData1().then(r => r)
    }, [])
    const cub = (event) => {
        event.preventDefault()
        // async function fetchData() {
        //     await ky.post('ticket/create', {prefixUrl: 'http://localhost:8080',json:
        //             {
        //                 "id":null,
        //                 "id_client": null,
        //                 "id_flight":ticket.id,
        //                 "seat_number":null,
        //                 "status":1,
        //                 "name":name,
        //                 "sename":serName,
        //                 "lastname":lastName,
        //                 "datero":dateRo,
        //                 "phone":tel,
        //                 "serpass":serPas,
        //                 "nompass":nomPas
        //             }
        //     }).catch(err=>console.log(err))
        // }
        // fetchData().then(r =>r)


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
                    <div className="serch">
                        <span>Поиск билета</span>
                        <InputMask id="ssn" value={bil} mask="***-***-***-******" placeholder="***-***-***-******"
                                   onChange={(e) => setBil(e.target.value)}></InputMask>
                   
                        <button className="form-btn" type="submit" onClick={cub}>Найти</button>
                    </div>
                    <button className="form-btn" type="submit" style={{marginBottom: "40px"}}>Зарегистрировать</button>

                </div>
            </section>}
        </>
    )
}
export default RegisterR