import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import CardT from "../Card/Card.jsx";
import './ByTicketForm.css'
import bag from './img/bag.png'
import {InputMask} from "primereact/inputmask";
import {InputText} from "primereact/inputtext";
import {selectFormByInfo} from "../slice/airSlise.jsx";
import ky from "ky";


const ByTicketForm = () => {
    const dispatch = useDispatch();
    const [ticket, setTicket] = useState(useSelector(state => state.air.byTicket))
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [serName, setSerName] = useState('');
    const [dateRo, setDateRo] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [serPas, setSerPas] = useState('');
    const [nomPas, setNomPas] = useState('');
    const navigate = useNavigate();
    const form = useSelector(state => state.air.formByInfo)
    useEffect(() => {
        if (ticket == null) navigate("/")
        if (form) {
            async function fetchData() {
                await ky.delete('ticket/delete', {
                    prefixUrl: 'http://localhost:8080', json:
                        {
                            "phone": form.tel,
                        }
                }).then(r => r).catch(err => console.log(err))
            }

            fetchData().then(r => r)
            dispatch(selectFormByInfo(null))
        }
    }, [])


    const cub = (event) => {
        event.preventDefault()
        dispatch(selectFormByInfo({name, serName, lastName, dateRo, email, tel, serPas, nomPas}))

        async function fetchData() {
            await ky.post('ticket/create', {
                prefixUrl: 'http://localhost:8080', json:
                    {
                        "id": null,
                        "idclient": null,
                        "idflight": ticket.id,
                        "seat_number": null,
                        "status": 1,
                        "name": name,
                        "sename": serName,
                        "lastname": lastName,
                        "datero": dateRo,
                        "phone": tel,
                        "serpass": serPas,
                        "nompass": nomPas,
                        "email": email
                    }
            }).then(r => navigate('/methodopl')).catch(err => console.log(err))
        }

        fetchData().then(r => r)


    }

    return (
        <>
            {ticket && <section className="formBy">
                <div className="formInfo">
                    <div className="formInp">
                        <h2>Информация о пассажире</h2>
                        <span>
                            Введите необходимую информацию для каждого путешественника и убедитесь,
                            что она точно соответствует удостоверению личности государственного образца,
                            предъявленному в аэропорту.
                        </span>
                        <form className="f" onSubmit={cub}>

                            <InputText value={serName}
                                       onChange={(e) => setSerName(e.target.value)}
                                       placeholder="Фамилия*"
                                       required
                                       className="imp"
                            />
                            <InputText value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       placeholder="Имя*"
                                       required
                                       className="imp"
                            />
                            <InputText value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                       placeholder="Отчество"
                                       className="imp"
                            />
                            <InputMask value={dateRo}
                                       onChange={(e) => setDateRo(e.target.value)}
                                       mask="9999-99-99" placeholder="Дата рождения*"
                                       required
                                       slotChar="yyyy-mm-dd"
                                       className="imp"
                            />
                            <InputText value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       placeholder="Email адрес*"
                                       required
                                       className="imp"
                            />
                            <InputMask value={tel}
                                       onChange={(e) => setTel(e.target.value)}
                                       mask="+7(999) 999-9999" placeholder="Телефон*"
                                       required
                                       className="imp"
                            />
                            <InputMask value={serPas}
                                       onChange={(e) => setSerPas(e.target.value)}
                                       mask="9999" placeholder="Серия паспорта*"
                                       required
                                       className="imp"
                            />
                            <InputMask value={nomPas}
                                       onChange={(e) => setNomPas(e.target.value)}
                                       mask="999999" placeholder="Номер паспорта*"
                                       required
                                       className="imp"
                            />
                            <button className="bt" type="submit">Оформить</button>
                        </form>
                    </div>
                    {ticket && <CardT x={ticket}/>}
                </div>
                <div className="infoBag">
                    <div className="bagInfo">
                        <h2>Информация о багаже</h2>
                        <span>
                            Каждому пассажиру разрешается иметь одну бесплатную ручную кладь и одну личную вещь.
                            Первый зарегистрированный багаж для каждого пассажира также предоставляется бесплатно.
                            Для участников программы лояльности плата за повторную проверку багажа не взимается.
                            При регистрации на рейс за дополнительный багаж будет взыматься плпта.
                        </span>
                    </div>
                    <img src={bag} alt=""/>
                </div>
            </section>}
        </>
    )
}
export default ByTicketForm