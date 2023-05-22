import {useEffect, useRef, useState} from "react";
import {TabMenu} from "primereact/tabmenu";
import './Profile.css'
import {
    BsFillAlarmFill,
    BsFillClipboard2CheckFill,
    BsFillClipboardXFill,
    BsInfoCircleFill,
    BsPower
} from "react-icons/bs";
import {BiHistory, FiSettings} from "react-icons/all.js";
import Cookies from "universal-cookie";
import {selectAuth} from "../slice/airSlise.jsx";
import {useDispatch, useSelector} from "react-redux";
import {json, useLocation, useNavigate} from "react-router-dom";
import ky from "ky";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FilterMatchMode} from "primereact/api";
import {Tag} from "primereact/tag";
import {Toast} from "primereact/toast";


const Profile = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [valueEmail, setValueEmail] = useState('');
    const [activeIndex_left, setActiveIndex_left] = useState(0);
    const [activeItems, setActiveItems] = useState([]);
    const [request, setRequest] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [sername, setSername] = useState('');
    const [lastname, setLastname] = useState('');
    const [serpass, setSerpass] = useState('');
    const [numderpass, setNumderpass] = useState('');
    const [items, setItems] = useState([]);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const CONFIG_APP = import.meta.env
    const toast = useRef(null);

    useEffect(() => {
        const cookies = new Cookies();
        const refresh = async (token) => {
            const formData = new FormData();
            formData.append('token', token)
            setRequest(await ky.post(`info/user`, {
                prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,
                body: formData
            }).json())
        }
        refresh(cookies.get("token")).then(r => r)
    }, [])
    useEffect(() => {
        if (request?.state === 'err') {
            cookies.remove('token')
            dispatch(selectAuth(false))
            navigate('/')
        }

        if (request?.client?.statusrole === 100) {
            setItems([{label: 'Профиль', icon: 'pi pi-fw pi-home'}, {
                label: 'Билеты',
                icon: 'pi pi-fw pi-calendar'
            }, {label: 'Админ', icon: 'pi pi-fw pi-pencil'}])
        } else {
            setItems([{label: 'Профиль', icon: 'pi pi-fw pi-home'}, {label: 'Билеты', icon: 'pi pi-fw pi-calendar'}])
        }


    }, [request])

    const save = async () => {
        if (name === '' || sername === '' || serpass === '' || numderpass === '') {
            toast.current.show({
                severity: 'error',
                summary: 'Ошибка',
                detail: 'Заполните все обязательные поля!',
                life: 3000
            });
        } else {
            const cookies = new Cookies();
            const formData = new FormData();
            formData.append('token', cookies.get("token"))
            let a = request.client
            a.lastname = lastname
            a.name = name
            a.surname = sername
            a.serpass = serpass
            a.numberpass = numderpass
            formData.append('client', a)
            console.log(a)
            await ky.post(`info/save`, {
                prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,
                json: a
            }).json()
            setActiveIndex_left(0)
        }

    }


    const items_left_profile = [
        {label: 'Информация', icon: <BsInfoCircleFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Настройки', icon: <FiSettings style={{marginRight: "10px", color: "white"}}/>},
        {
            label: 'Выйти', icon: <BsPower style={{marginRight: "10px", color: "white"}}/>, command: () => {
                const cookies = new Cookies();
                cookies.remove('token')
                dispatch(selectAuth(false))
                if (location.pathname === '/profile' || location.pathname === '/admin')
                    navigate('/')
            }
        }
    ];
    const items_left_ticket = [
        {label: 'Ближайшие вылеты', icon: <BsFillAlarmFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Все вылеты', icon: <BsFillClipboard2CheckFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Сдать билет', icon: <BsFillClipboardXFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'История', icon: <BiHistory style={{marginRight: "10px", color: "white"}}/>}
    ];

    const items_admin = [
        {label: 'Информация', icon: <BsInfoCircleFill style={{marginRight: "10px", color: "white"}}/>}

    ];
    useEffect(() => {
        setActiveItems(activeIndex === 0 ? items_left_profile : (activeIndex === 1 ? items_left_ticket : items_admin))
    }, [activeIndex])

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)}/>;
    };
    const getSeverity = (status) => {
        switch (status) {
            case "Отмена":
                return 'danger';

            case "Зарегистрирован":
                return 'success';

            case "Оплата":
                return 'info';

            case "Оформлен":
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    return (
        <>
            <Toast ref={toast}/>
            {request !== null &&
                <div className="panel-profile">
                    <TabMenu model={items} activeIndex={activeIndex}
                             onTabChange={(e) => setActiveIndex(e.index)}
                             className='profile-tabmenu'/>
                    <div className="profile-main-panel">
                        <div className="profile-main-subpanel-left">
                            <TabMenu model={activeItems} activeIndex={activeIndex_left}
                                     onTabChange={(e) => setActiveIndex_left(e.index)}
                                     className='profile-tabmenu-left'/>
                        </div>
                        <div className="profile-main-subpanel-rigcht">
                            {activeIndex === 0 && <div className="profile-info-main">
                                {activeIndex_left === 0 ? (<div className="persol-info">
                                    <span className="name-span">Персональные данные</span>
                                    <div className="block-info">
                                        <div className="info-block1 back">
                                            <div className="profile-info-name">
                                                <span>ФИО</span>
                                                <span>{request?.client?.name + " " + request?.client?.surname + " " + request?.client?.lastname}</span>
                                            </div>
                                            <div className="profile-info-name">
                                                <span>Дата рождения</span>
                                                <span>{new Date(request?.tickets[0]?.datero).getDate() + ":" +
                                                    (new Date(request?.tickets[0]?.datero).getMonth() + 1) + ":" +
                                                    new Date(request?.tickets[0]?.datero).getFullYear()}</span>
                                            </div>
                                            <div className="profile-info-name">
                                                <span>Паспорт</span>
                                                <span>{request?.client?.serpass + " " + request?.client?.numberpass}</span>
                                            </div>
                                            <div className="profile-info-name">
                                                <span>Email</span>
                                                <span>{request?.client?.email + ''}</span>
                                            </div>
                                            <div className="btn-update-info">
                                                <button onClick={() => setActiveIndex_left(1)}>Изменить данные</button>
                                            </div>
                                        </div>
                                        <div className="info-block2 back">
                                            <div className="email-profile">
                                                <label htmlFor="123" style={{
                                                    color: "white",
                                                    textAlign: "left"
                                                }}>{email === '' ? request.client.email : email}</label>
                                                <div className="email-group">
                                                    <InputText required value={valueEmail}
                                                               onChange={(e) => setValueEmail(e.target.value)}
                                                               className="imput-email"/>
                                                    <button onClick={() => {
                                                        setEmail(valueEmail)

                                                    }}>Изменить
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>) : (activeIndex_left === 1 ? ((request?.client?.name === null || request?.client?.name === '') ?
                                    <form className="block-info form-edit-info">
                                        <div className='profile-info-ver'>Верификация</div>

                                        <div className="profile-form-inputs">
                                            <InputText style={{marginBottom: '30px', width: '645px'}} value={name}
                                                       placeholder="Имя*"
                                                       onChange={(e) => {
                                                           setName(e.target.value)

                                                       }}/>
                                            <InputText style={{marginBottom: '30px', width: '645px'}} value={sername}
                                                       placeholder="Фамилия*"
                                                       onChange={(e) => {
                                                           setSername(e.target.value)
                                                       }}/>
                                            <InputText style={{marginBottom: '30px', width: '645px'}} value={lastname}
                                                       placeholder="Отчество"
                                                       onChange={(e) => {
                                                           setLastname(e.target.value)
                                                       }}/>
                                            <InputMask mask='9999' style={{marginBottom: '30px', width: '645px'}}
                                                       placeholder="Серия паспорта*"
                                                       value={serpass} onChange={(e) => setSerpass(e.target.value)}/>

                                            <InputMask mask='999999' style={{marginBottom: '30px', width: '645px'}}
                                                       placeholder="Номер паспорта*"
                                                       value={numderpass}
                                                       onChange={(e) => setNumderpass(e.target.value)}/>
                                        </div>


                                        <button type='submit' onClick={(event) => {
                                            event.preventDefault()
                                            save().then(r => r)
                                            setEmail(valueEmail)
                                        }} className="btn-save">Сохранить
                                        </button>
                                    </form> : <div style={{color:"white",fontFamily:"'Open Sans', sans-serif"}} >Вы уже заполнили данные аккаунта,
                                        если вам необходимо сменить данные то обратитесь к
                                        администратору!</div>) : (<div></div>))}
                            </div>}
                            <div>
                                {activeIndex === 1 && <div className="profile-info-main">
                                    {activeIndex_left === 3 ? (<div>
                                        <DataTable value={request.tickets} paginator rows={8} dataKey="id"
                                                   filterDisplay="row"
                                                   emptyMessage="Билетов не найдено.">
                                            <Column field="name" header="Имя" style={{minWidth: '12rem'}}/>
                                            <Column field="sename" header="Фамилия" style={{minWidth: '12rem'}}/>
                                            <Column field="lastname" header="Отчество" filterField="lastname"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="serial" header="Номер билета" filterField="serial"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="email" header="Почта" filterField="email"
                                                    style={{minWidth: '15rem'}}/>
                                            <Column field="seat_number" header="Номер места"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="date_registration" header="Дата регистрации"
                                                    style={{minWidth: '20rem'}}/>
                                            <Column field="status" header="Статус" filterField="status"
                                                    style={{minWidth: '12rem'}} body={statusBodyTemplate}/>
                                        </DataTable>
                                    </div>) : (activeIndex_left === 0 ? (<div>
                                        <DataTable value={request.tickets.filter(e => {
                                            return (e.status === "Оформлен" || e.status === "Зарегистрирован")
                                        })} paginator rows={8} dataKey="id" filterDisplay="row"
                                                   emptyMessage="Билетов не найдено.">
                                            <Column field="name" header="Имя" style={{minWidth: '12rem'}}/>
                                            <Column field="sename" header="Фамилия" style={{minWidth: '12rem'}}/>
                                            <Column field="lastname" header="Отчество" filterField="lastname"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="serial" header="Номер билета" filterField="serial"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="email" header="Почта" filterField="email"
                                                    style={{minWidth: '15rem'}}/>
                                            <Column field="seat_number" header="Номер места"
                                                    style={{minWidth: '12rem'}}/>
                                            <Column field="date_registration" header="Дата регистрации"
                                                    style={{minWidth: '20rem'}}/>
                                            <Column field="status" header="Статус" filterField="status"
                                                    style={{minWidth: '12rem'}} body={statusBodyTemplate}/>
                                        </DataTable>
                                    </div>) : <div></div>)
                                    } </div>}
                            </div>


                        </div>
                    </div>
                </div>
            }
        </>


    )
}
export default Profile;