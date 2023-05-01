import './Select.css'
import {useEffect, useState} from "react";
import ky from 'ky'
const Select = () =>{
    const [pol,setPol] = useState('')

    useEffect( ()=>{
        async function fetchData() {
            setPol(await ky('zzz', {prefixUrl: 'http://localhost:8080'}).json())
        }
        fetchData().then(r =>  r)


    },[])
    const renderPunkt = (arr) => {
        if (arr.length === 0) {
            return (
                <h5 className="text-center mt-5">Фильмов пока нет</h5>
            )
        }
        return arr.map((props) => {
            console.log(props)
            return (
                <>
                    {/* eslint-disable-next-line react/prop-types */}
                    <option value={props.name} key={props.id}>{props.name}</option>
                </>
            )
        })
    }

    const op = renderPunkt(pol)
    return(
        <>
            <form className="cont">
                <>
                    <select className="box">
                        <option value="Выбрать" selected disabled hidden>Выбрать</option>
                        {op}
                    </select>
                    <select className="box">
                        <option value="Выбрать" selected disabled hidden>Выбрать</option>
                        {op}
                    </select>
                </>

            </form>

        </>
    )

}

export default Select;