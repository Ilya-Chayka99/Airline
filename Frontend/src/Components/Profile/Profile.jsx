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
import {useLocation, useNavigate} from "react-router-dom";
import ky from "ky";


const Profile = ()=>{
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeIndex_left, setActiveIndex_left] = useState(0);
    const [activeItems, setActiveItems] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [auth, setAuth] = useState(useSelector(state => state.air.auth));
    const CONFIG_APP = import.meta.env

    useEffect(()=>{
        let request = {};
        const cookies = new Cookies();
        const refresh = async (token) => {
            const formData = new FormData();
            formData.append('token', token)
            request = await ky.post(`info/user`, {
                prefixUrl: CONFIG_APP.VITE_REACT_APP_URL_BACKEND,
                body: formData
            }).json()
            console.log(request)
            if (request.state === 'err') {
                cookies.remove('token')
                dispatch(selectAuth(false))
                navigate('/')
            }}

        refresh(cookies.get("token")).then(r => r)
        },[])




    const items = [
        {label: 'Профиль', icon: 'pi pi-fw pi-home'},
        {label: 'Билеты', icon: 'pi pi-fw pi-calendar'},
        {label: 'FAQ', icon: 'pi pi-fw pi-pencil'}
    ];
    const items_left_profile = [
        {label: 'Информация', icon:  <BsInfoCircleFill style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Настройки', icon:  <FiSettings style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Выйти', icon:  <BsPower style={{marginRight: "10px",color:"white"}}/>,command: () => {
                // const cookies = new Cookies();
                // cookies.remove('token')
                // dispatch(selectAuth(false))
                // setAuth(false)
                // if (location.pathname === '/profile' || location.pathname === '/admin')
                //     navigate('/')
            }}
    ];
    const items_left_ticket = [
        {label: 'Ближайшие вылеты', icon:  <BsFillAlarmFill style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Все вылеты', icon:  <BsFillClipboard2CheckFill style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Сдать билет', icon:  <BsFillClipboardXFill style={{marginRight: "10px",color:"white"}}/>},
        {label: 'История', icon:  <BiHistory style={{marginRight: "10px",color:"white"}}/>}
    ];
    const items_left_Faq = [
        {label: 'Информация', icon:  <BsInfoCircleFill style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Настройки', icon:  <FiSettings style={{marginRight: "10px",color:"white"}}/>},
        {label: 'Выйти', icon:  <BsPower style={{marginRight: "10px",color:"white"}}/>}
    ];
    useEffect(()=>{
        setActiveItems(activeIndex===0?items_left_profile:(activeIndex===1?items_left_ticket:items_left_Faq))
    },[activeIndex])
    return(
        <div className="panel-profile">
            <TabMenu model={items} activeIndex={activeIndex}
                     onTabChange={(e) => setActiveIndex(e.index)}
                     className='profile-tabmenu' />
            <div className="profile-main-panel">
                <div className="profile-main-subpanel-left">
                    <TabMenu model={activeItems} activeIndex={activeIndex_left}
                             onTabChange={(e) => setActiveIndex_left(e.index)}
                             className='profile-tabmenu-left' />
                </div>
                <div className="profile-main-subpanel-rigcht">
                    {activeIndex===0&&<div className="profile-info-main">
                        {activeIndex_left===0?(<div className="persol-info">
                            <span className="name-span">Персональные данные</span>
                            <div className="block-info">
                                <div className="info-block1 back">
                                    <div className="profile-info-name">
                                        <span>ФИО</span>
                                        <span>123</span>
                                    </div>
                                    <div className="profile-info-name">
                                        <span>Дата рождения</span>
                                        <span>123</span>
                                    </div>
                                    <div className="profile-info-name">
                                        <span>Паспорт</span>
                                        <span>123</span>
                                    </div>
                                    <div className="profile-info-name">
                                        <span>Email</span>
                                        <span>123</span>
                                    </div>
                                </div>
                                <div className="info-block2 back">1234</div>
                            </div>
                        </div>):(activeIndex_left===1?(<div>22</div>):(<div></div>))}
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default Profile;