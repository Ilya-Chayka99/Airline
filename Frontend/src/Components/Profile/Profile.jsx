import {useEffect, useState} from "react";
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
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const CONFIG_APP = import.meta.env

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

    }, [request])

    const save = async () => {
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
    }

    const items = [
        {label: 'Профиль', icon: 'pi pi-fw pi-home'},
        {label: 'Билеты', icon: 'pi pi-fw pi-calendar'},
        {label: 'FAQ', icon: 'pi pi-fw pi-pencil'}
    ];
    const items_left_profile = [
        {label: 'Информация', icon: <BsInfoCircleFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Настройки', icon: <FiSettings style={{marginRight: "10px", color: "white"}}/>},
        {
            label: 'Выйти', icon: <BsPower style={{marginRight: "10px", color: "white"}}/>, command: () => {
                // const cookies = new Cookies();
                // cookies.remove('token')
                // dispatch(selectAuth(false))
                // if (location.pathname === '/profile' || location.pathname === '/admin')
                //     navigate('/')
            }
        }
    ];
    const items_left_ticket = [
        {label: 'Ближайшие вылеты', icon: <BsFillAlarmFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Все вылеты', icon: <BsFillClipboard2CheckFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Сдать билет', icon: <BsFillClipboardXFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'История', icon: <BiHistory style={{marginRight: "10px", color: "white"}}/>}
    ];
    const items_left_Faq = [
        {label: 'Информация', icon: <BsInfoCircleFill style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Настройки', icon: <FiSettings style={{marginRight: "10px", color: "white"}}/>},
        {label: 'Выйти', icon: <BsPower style={{marginRight: "10px", color: "white"}}/>}
    ];
    useEffect(() => {
        setActiveItems(activeIndex === 0 ? items_left_profile : (activeIndex === 1 ? items_left_ticket : items_left_Faq))
    }, [activeIndex])
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const countryBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.surname}</span>
            </div>
        );
    };
    return (
        <>
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
                                </div>) : (activeIndex_left === 1 ? (<form className="block-info form-edit-info">
                                    <div className="email-profile">
                                        <label htmlFor="123" style={{color: "white", textAlign: "left"}}>Серия</label>
                                        <div className="group-upgrade">
                                            <InputMask required value={serpass}
                                                       onChange={(e) => setSerpass(e.target.value)}
                                                       className="imput-email"
                                                       mask="9999"/>
                                        </div>
                                    </div>
                                    <div className="email-profile">
                                        <label htmlFor="123" style={{color: "white", textAlign: "left"}}>Номер</label>
                                        <div className="group-upgrade">
                                            <InputMask required value={numderpass}
                                                       onChange={(e) => setNumderpass(e.target.value)}
                                                       className="imput-email" mask="999999"/>
                                        </div>
                                    </div>
                                    <div className="email-profile">
                                        <label htmlFor="123" style={{color: "white", textAlign: "left"}}>Имя</label>
                                        <div className="group-upgrade">
                                            <InputText required value={name} onChange={(e) => setName(e.target.value)}
                                                       className="imput-email"/>
                                        </div>
                                    </div>
                                    <div className="email-profile">
                                        <label htmlFor="123" style={{color: "white", textAlign: "left"}}>Фамилия</label>
                                        <div className="group-upgrade">
                                            <InputText required value={sername}
                                                       onChange={(e) => setSername(e.target.value)}
                                                       className="imput-email"/>
                                        </div>
                                    </div>
                                    <div className="email-profile">
                                        <label htmlFor="123"
                                               style={{color: "white", textAlign: "left"}}>Отчество</label>
                                        <div className="group-upgrade">
                                            <InputText value={lastname} onChange={(e) => setLastname(e.target.value)}
                                                       className="imput-email"/>
                                        </div>
                                    </div>
                                    <button type='submit' onClick={(event) => {
                                        event.preventDefault()
                                        save().then(r => r)
                                        setEmail(valueEmail)
                                    }} className="btn-save">Сохранить
                                    </button>
                                </form>) : (<div></div>))}
                            </div>}
                            <div>
                                {activeIndex === 1 && <div className="profile-info-main">
                                    {activeIndex_left === 0 ? (<div>
                                        <DataTable value={request.tickets} paginator rows={10} dataKey="id" filters={filters} filterDisplay="row"
                                                   globalFilterFields={['name', 'country.name', 'representative.name', 'status']}  emptyMessage="No customers found.">
                                            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                                            <Column header="sername" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                                        </DataTable>
                                    </div>) : (<div></div>)
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