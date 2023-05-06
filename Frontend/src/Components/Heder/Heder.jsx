import './Heder.css'
import logo from './img/Logo.png'
import {NavLink} from "react-router-dom";


const Heder = () =>{


    return(
        <>
            <header>
                <img src={logo} alt="logo"/>
                <nav className="appMenu">
                    <ul>
                        <li>
                            <NavLink end style={({isActive})=>({color:isActive?'#00FFFF':'white'})} to="/" className="nav">Главная</NavLink>
                        </li>
                        <li>
                            <NavLink  style={({isActive})=>({color:isActive?'#00FFFF':'white'})} to="/f" className="nav">Все рейсы</NavLink>
                        </li>
                        <li>
                            <NavLink  style={({isActive})=>({color:isActive?'#00FFFF':'white'})} to="/fi" className="nav">О компании</NavLink>
                        </li>
                        <li>
                            <p className="btLog">Авторизация</p>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

}

export default Heder;