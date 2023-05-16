import Banner from "../Banner/Banner.jsx";
import PopulerDirection from "../PopulerDirection/PopulerDirection.jsx";
import {useDispatch, useSelector} from "react-redux";
import {selectByTicket} from "../slice/airSlise.jsx";


const Main = () => {
    const dispatch = useDispatch()
    const form = useSelector(state => state.air.byTicket)
    if (form) dispatch(selectByTicket(null))
    return (
        <>
            <Banner/>
            <PopulerDirection/>
        </>
    )
}


export default Main