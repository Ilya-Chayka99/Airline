import {useEffect, useState} from "react";
import ky from "ky";
import {v4 as uuv4} from "uuid";
import CardT from "../Card/Card.jsx";
import Select from "../Select/Select.jsx";


const RegisterList = () => {
    const [fl, setFl] = useState([]);
    const [flk, setFlk] = useState(fl);
    const [air, setAir] = useState([]);
    const [g_v, setG_v] = useState(null);
    const [g_p, setG_p] = useState(null);
    const [date, setDate] = useState(null);
    useEffect(() => {
        function f(z) {
            setFlk(z)
            setFl(z)
        }

        async function fetchData() {
            f(await ky('Flights', {prefixUrl: 'http://localhost:8080'}).json())
        }

        fetchData().then(r => r)

        async function fetchData1() {
            setAir(await ky('Airport', {prefixUrl: 'http://localhost:8080'}).json())
        }

        fetchData1().then(r => r)
    }, [])
    useEffect(() => {
        if (g_v !== null || g_p !== null || date !== null) {
            let v = fl.filter(x => {
                return (g_v ? (x.id_v === g_v.id) : true) && (g_p ? (x.id_p === g_p.id) : true) && (date ? (new Date(x.date_v).getDate() === new Date(date).getDate()) : true)
            })
            setFlk(v)
        }
    }, [g_p, g_v, date])

    return (
        <>
            <Select reg={true} setG_v={setG_v} setG_p={setG_p} setDate={setDate}/>
            {air &&
                <section className="ticketlist" key={uuv4()}>
                    <div className="list" key={uuv4()}>
                        {!flk.filter(x => x.status === "Регистрация").length &&
                            <span>Сейчас регистрации ни на один рейс не доступно</span>}
                        {
                            flk.filter(x => x.status === "Регистрация")
                                .sort((x, y) => new Date(x.time_v).getHours() - new Date(y.time_v).getHours())
                                .map(x => (
                                    <CardT x={x} nav={true} air={air}/>
                                ))
                        }
                    </div>
                </section>
            }
        </>
    )
}
export default RegisterList