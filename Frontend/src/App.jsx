import './App.css'
import Heder from "./Components/Heder/Heder.jsx";
import {Route, Routes} from "react-router";
import Main from "./Components/Page/Main.jsx";
import Futter from "./Components/Futter/Futter.jsx";
import AppBanner from "./Components/AppBanner/AppBanner.jsx";
import SelectTicket from "./Components/Page/SelectTicket.jsx";
import ByTicket from "./Components/Page/ByTicket.jsx";
import Oplata from "./Components/Page/Oplata.jsx";
import SuccessOplP from "./Components/Page/SuccessOplP.jsx";
import RegisterList from "./Components/Page/RegisterList.jsx";
import RegisterR from "./Components/RegisterR/RegisterR.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import {useEffect} from "react";
import ky from "ky";
import {useDispatch} from "react-redux";
import {setCity} from "./Components/slice/airSlise.jsx";



function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchData() {
            dispatch(setCity(await ky('Airport', {prefixUrl: 'http://193.233.233.3:8081'}).json()))
        }
        fetchData().then(r => r)
    },[])
    return (
        <>
            <div className="str">
                <Routes>
                    <Route path='/' element={<Heder/>}/>
                    <Route path='/profile' element={<Heder/>}/>
                    <Route path='/selectticket' element={<Heder/>}/>
                    <Route path='/byticket' element={<Heder/>}/>
                    <Route path='/methodopl' element={<Heder/>}/>
                    <Route path='/success' element={<Heder/>}/>
                    <Route path='/register-list' element={<Heder/>}/>
                    <Route path='/register-form' element={<Heder/>}/>
                </Routes>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/selectticket' element={<SelectTicket/>}/>
                    <Route path='/byticket' element={<ByTicket/>}/>
                    <Route path='/methodopl' element={<Oplata/>}/>
                    <Route path='/success' element={<SuccessOplP/>}/>
                    <Route path='/register-list' element={<RegisterList/>}/>
                    <Route path='/register-form' element={<RegisterR/>}/>
                </Routes>
            </div>
            <Routes>
                <Route path='/' element={<AppBanner/>}/>
                <Route path='/selectticket' element={<AppBanner/>}/>
                <Route path='/methodopl' element={<AppBanner/>}/>
                <Route path='/success' element={<AppBanner/>}/>
                <Route path='/profile' element={<AppBanner/>}/>
            </Routes>
            <Futter/>
        </>
    )
}

export default App
