import './Heder.css'
import logo from './img/Logo.png'
import {NavLink, useNavigate} from "react-router-dom";
import {Dialog} from 'primereact/dialog';
import {useState} from "react";
import {Button} from "primereact/button";


const Heder = () =>{
    const [visible, setVisible] = useState(false);
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
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
                            <p className="btLog" onClick={() => setVisible(true)}>Авторизация</p>
                            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                                <p className="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Dialog>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )

}

export default Heder;