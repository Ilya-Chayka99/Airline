import MethodOpl from "../MethodOpl/MethodOpl.jsx";
import {useEffect} from "react";


const Oplata = () => {
    useEffect(()=>{
        document.getElementById('root').style.background="none"
    },[])
    return (
        <MethodOpl/>
    )
}
export default Oplata