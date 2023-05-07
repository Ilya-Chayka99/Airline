import './App.css'
import Heder from "./Components/Heder/Heder.jsx";
import {Route, Routes} from "react-router";
import Main from "./Components/Page/Main.jsx";
import Futter from "./Components/Futter/Futter.jsx";
import AppBanner from "./Components/AppBanner/AppBanner.jsx";
function App() {

  return (
      <>
          <div className="str">
              <Heder/>
              <Routes>
                  <Route path='/' element={<Main/>}/>
              </Routes>
          </div>
          <Routes>
              <Route path='/' element={<AppBanner/>}/>
          </Routes>
          <Futter/>
      </>
  )
}

export default App
