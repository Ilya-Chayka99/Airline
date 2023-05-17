import Banner from "../Banner/Banner.jsx";
import PopulerDirection from "../PopulerDirection/PopulerDirection.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectByTicket} from "../slice/airSlise.jsx";
import {useEffect} from "react";


const Main = () => {
    const dispatch = useDispatch()
    const form = useSelector(state => state.air.byTicket)
    if (form) dispatch(selectByTicket(null))
    useEffect(()=>{
        document.getElementById('root').style.background="none"
    },[])
    return (
        <>
            <Banner/>
            <PopulerDirection/>
        </>
    )
}


export default Main