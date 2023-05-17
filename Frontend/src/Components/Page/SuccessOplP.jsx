import SuccessOpl from "../SuccessOpl/SuccessOpl.jsx";
import {useEffect} from "react";


const SuccessOplP = ()=>{
    useEffect(()=>{
        document.getElementById('root').style.background="none"
    },[])
    return(
        <>
            <SuccessOpl/>
        </>
    )
}
export default SuccessOplP