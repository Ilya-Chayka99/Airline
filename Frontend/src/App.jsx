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
function App() {

  return (
      <>
          <div className="str">
              <Heder/>
              <Routes>
                  <Route path='/' element={<Main/>}/>
                  <Route path='/selectticket' element={<SelectTicket/>}/>
                  <Route path='/byticket' element={<ByTicket/>}/>
                  <Route path='/methodopl' element={<Oplata/>}/>
                  <Route path='/success' element={<SuccessOplP/>}/>
              </Routes>
          </div>
          <Routes>
              <Route path='/' element={<AppBanner/>}/>
              <Route path='/selectticket' element={<AppBanner/>}/>
              <Route path='/methodopl' element={<AppBanner/>}/>
              <Route path='/success' element={<AppBanner/>}/>
          </Routes>
          <Futter/>
      </>
  )
}

export default App
