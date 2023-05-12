import logo from './img/Logo.png'
import reg from './img/reg.png'
import {NavLink, useNavigate} from "react-router-dom";
import {Dialog} from 'primereact/dialog';
import {useState} from "react";
import './Heder.css'
import {Password} from "primereact/password";
import {InputText} from "primereact/inputtext";


const Heder = () => {
    const [visible, setVisible] = useState(false);
    const [valueN, setValueN] = useState('');
    const [valueP, setValueP] = useState('');
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
                        <li>
                            <p className="btLog" onClick={() => setVisible(true)}>Авторизация</p>
                            <Dialog header="Авторизация" visible={visible} style={{width: '329px'}}
                                    onHide={() => setVisible(false)}>
                                <div className="login">
                                    <img src={reg} alt="" style={{width: "100%"}}/>
                                    <span className="p-float-label">
                                        <InputText id="username" value={valueN}
                                                   onChange={(e) => setValueN(e.target.value)}/>
                                        <label htmlFor="username" style={{color: "#829AB1", left: "-30px"}}>Телефон</label>
                                    </span>
                                    <span className="p-float-label">
                                        <Password inputId="password" value={valueP}
                                                  onChange={(e) => setValueP(e.target.value)} toggleMask/>
                                        <label htmlFor="password"
                                               style={{color: "#829AB1", left: "-30px"}}>Пароль</label>
                                    </span>
                                    <button className="registr">Вход</button>
                                </div>
                            </Dialog>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

}

export default Heder;