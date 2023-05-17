import logo from './img/Logo.png'
import reg from './img/reg.png'
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {Dialog} from 'primereact/dialog';
import {useEffect, useState} from "react";
import './Heder.css'
import Cookies from 'universal-cookie';
import {Password} from "primereact/password";
import {InputMask} from "primereact/inputmask";
import ky from "ky";
import {Message} from "primereact/message";
import {Avatar} from "primereact/avatar";
import {BsPersonFill} from "react-icons/bs";
const CONFIG_APP=import.meta.env


const Heder = () => {
    const [visible, setVisible] = useState(false);
    const [valueN, setValueN] = useState('');
    const [valueP, setValueP] = useState('');
    const [valueP2, setValueP2] = useState('');
    const [error, setError] = useState('');
    const [registors, setRegistors] = useState(false);
    const [auth, setAuth] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()

    const login = async () => {
        if (valueP.length < 8) {
            setError('Внимание! Длинна пароля должна быть минимум 8 символов.')
        } else {
            setError('')
            const formData = new FormData();
            formData.append('phone', valueN)
            formData.append('password', valueP)
            const request = await ky.post(`auth/login`, {prefixUrl: 'http://localhost:8080', body: formData}).json()
            if (request.state === 'err') {
                setError(request.massage)
            } else {
                const cookies = new Cookies();
                cookies.set('token', request.token);
                console.log(cookies.get('token'))
                setAuth(true)
                setVisible(false)
            }
        }
    }
    const register = async () => {
        if (valueP2 !== valueP) setError("Ошибка: Пароли должны совпадать!")
        else {
            if (valueP.length < 8)
                setError('Внимание! Длинна пароля должна быть минимум 8 символов.')
            setError('')
            const formData = new FormData();
            formData.append('phone', valueN)
            formData.append('password', valueP)
            const request = await ky.post(`auth/register`, {prefixUrl: 'http://localhost:8080', body: formData}).json()
            if (request.state === 'err') {
                setError(request.massage)
            } else {
                const cookies = new Cookies();
                cookies.set('token', request.token);
                setAuth(true)
                setVisible(false)
            }
        }
    }

    useEffect(() => {
        let request = {};
        const refresh = async (token) => {
            const formData = new FormData();
            formData.append('token', token)
            request = await ky.post(`auth/validToken`, {prefixUrl: 'http://localhost:8080', body: formData}).json()
            if (request.state === 'err') {
                cookies.remove('token')
                setAuth(false)
                navigate('/')
            } else {
                setAuth(true)
            }
        }
        const cookies = new Cookies();
        const token = cookies.get('token');
        if (token) {
            refresh(token).then(r => r)
        }

        console.log(CONFIG_APP.VITE_REACT_APP_TITLE)
    }, [])

    return (
        <>
            <header>
                <img src={logo} alt="logo"/>
                <nav className="appMenu">
                    <ul>
                        <li>
                            <NavLink end style={({isActive}) => ({color: isActive ? '#00FFFF' : 'white'})} to="/"
                                     className="nav">Главная</NavLink>
                        </li>
                        <li>
                            <NavLink style={({isActive}) => ({color: isActive ? '#00FFFF' : 'white'})}
                                     to="/register-list" className="nav">Регистрация на рейс</NavLink>
                        </li>
                        <li>
                            <NavLink style={({isActive}) => ({color: isActive ? '#00FFFF' : 'white'})} to="/fi"
                                     className="nav">О компании</NavLink>
                        </li>
                        <li className="li-prof-auth">
                            {auth ? <Avatar label={<BsPersonFill/>} size="large" className="profile"
                                            style={{backgroundColor: '#2196F3', color: '#ffffff'}} shape="circle"/>
                                : <p className="btLog" onClick={() => setVisible(true)}>Авторизация</p>}
                            {!registors ?
                                <>
                                    <Dialog header="Авторизация" visible={visible} style={{width: '329px'}}
                                            onHide={() => {
                                                setVisible(false)
                                                setRegistors(false)
                                                setError('')
                                            }}>
                                        <div className="login">
                                            <img src={reg} alt="" style={{width: "100%"}}/>
                                            {error !== '' ? <Message severity="error" text={error}/> : <></>}
                                            <span className="p-float-label">
                                                <InputMask id="username" value={valueN}
                                                           mask="+7(999)999-99-99" placeholder=""
                                                           onChange={(e) => setValueN(e.target.value)}/>
                                                <label htmlFor="username"
                                                       style={{color: "#829AB1", left: "-30px"}}>Телефон</label>
                                            </span>
                                            <span className="p-float-label">
                                                <Password inputId="password" value={valueP}
                                                          onChange={(e) => setValueP(e.target.value)} toggleMask
                                                          feedback={false}/>
                                                <label htmlFor="password"
                                                       style={{color: "#829AB1", left: "-30px"}}>Пароль</label>
                                            </span>
                                            <button className="registr" onClick={() => login()}>Вход</button>
                                            <span>Если вы еще не зарегистрированны <Link
                                                onClick={() => {
                                                    setRegistors(true)
                                                    setError('')
                                                }}
                                                to={location.pathname}>Регистрация</Link></span>
                                        </div>
                                    </Dialog>
                                </> :
                                <>
                                    <Dialog header="Регистрация" visible={visible} style={{width: '329px'}}
                                            onHide={() => {
                                                setVisible(false)
                                                setRegistors(false)
                                                setError('')
                                            }}>
                                        <div className="login">
                                            <img src={reg} alt="" style={{width: "100%"}}/>
                                            {error !== '' ? <Message severity="error" text={error}/> : <></>}
                                            <span className="p-float-label">
                                                <InputMask id="username" value={valueN}
                                                           mask="+7(999)999-99-99" placeholder=""
                                                           onChange={(e) => setValueN(e.target.value)}/>
                                                <label htmlFor="username"
                                                       style={{color: "#829AB1", left: "-30px"}}>Телефон</label>
                                            </span>
                                            <span className="p-float-label">
                                                <Password inputId="password" value={valueP}
                                                          onChange={(e) => setValueP(e.target.value)} toggleMask
                                                          feedback={false}/>
                                                <label htmlFor="password"
                                                       style={{color: "#829AB1", left: "-30px"}}>Пароль</label>
                                            </span>
                                            <span className="p-float-label">
                                                <Password inputId="password" value={valueP2}
                                                          onChange={(e) => setValueP2(e.target.value)} toggleMask
                                                          feedback={false}/>
                                                <label htmlFor="password"
                                                       style={{color: "#829AB1", left: "-30px"}}>Повтор пароля</label>
                                            </span>
                                            <button className="registr" onClick={() => register()}>Зарегистрироваться
                                            </button>
                                        </div>
                                    </Dialog>
                                </>


                            }

                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

}

export default Heder;