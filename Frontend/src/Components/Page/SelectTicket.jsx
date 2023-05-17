import Banner from "../Banner/Banner.jsx";
import TicketList from "../TicketList/TicketList.jsx";
import {useEffect} from "react";


const SelectTicket = ()=> {
    useEffect(()=>{
        document.getElementById('root').style.background="none"
    },[])

    return (
        <>
            <Banner/>
            <TicketList/>
        </>
    )
}
export default SelectTicket