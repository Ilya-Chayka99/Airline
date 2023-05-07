import './App.css'
import Heder from "./Components/Heder/Heder.jsx";
import {Route, Routes} from "react-router";
import Main from "./Components/Page/Main.jsx";
function App() {

  return (
    <div className="str">
        <Heder/>
        <Routes>
            <Route path='/' element={<Main/>}/>
        </Routes>
    </div>
  )
}

export default App
