import React, {useRef} from 'react'
import {useEffect, useState} from "react";
import ky from 'ky'
import {Listbox, Transition} from "@headlessui/react";
import { FiChevronsDown } from "react-icons/fi";
import { Calendar} from 'primereact/calendar';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './Select.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLoadForm} from "../slice/airSlise.jsx";


const Select = () =>{
    const dispatch = useDispatch();
    const [city,setCity] = useState([])
    const [selectOutput,setSelectOutput] = useState(useSelector(state => state.air.selectOutput))
    const [selectInput,setSelectInput] = useState(useSelector(state => state.air.selectInput))
    const [dateOutput, setDateOutput] = useState(useSelector(state => state.air.dateOutput));
    const [dateInput, setDateInput] = useState(useSelector(state => state.air.dateInput));
    const aRef = useRef()
    const bRef = useRef()
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(selectOutput)
        console.log(selectInput)
        console.log(dateOutput)
        console.log(dateInput)
    },[selectInput,selectOutput,dateInput,dateOutput])
    useEffect(()=>{
        if(dateOutput)
            aRef.current.innerHTML=''
        else aRef.current.innerHTML='Дата вылета'
    },[dateOutput])
    useEffect(()=>{
        if(dateInput)
            bRef.current.innerHTML=''
        else bRef.current.innerHTML='Дата возврата'
    },[dateInput])
    useEffect( ()=>{
        async function fetchData() {
            setCity(await ky('Airport', {prefixUrl: 'http://localhost:8080'}).json())
        }
        fetchData().then(r =>  r)
    },[])

    const sub = (event) => {
        event.preventDefault()
        dispatch(selectLoadForm({selectInput, selectOutput, dateInput, dateOutput}));
        navigate("/selectticket")
    }


    return(
        <form className="cont" onSubmit={sub}>
            <Listbox value={selectOutput || ""} onChange={setSelectOutput} name="assignee">
                <Listbox.Button className="box-city">
                    {selectOutput.name}
                    <FiChevronsDown color="white"/>
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="drop-1" >
                        {
                           city.length?city.map((city)=>(
                            <Listbox.Option value={city} key={city.id}>
                                <>
                                    <span>
                                        {city.name}
                                    </span>
                                </>
                            </Listbox.Option>
                        )):<span>Городов не найдено</span>}
                    </Listbox.Options>
                </Transition>
            </Listbox>

            <Listbox value={selectInput || ""} onChange={setSelectInput} name="assignee">
                <Listbox.Button className="box-city">
                    {selectInput.name}
                    <FiChevronsDown color="white"/>
                </Listbox.Button>
                <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="drop-2" >
                        {city.length?city.map((city)=>(
                            <Listbox.Option value={city} key={city.id}>
                                <>
                                <span>
                                    {city.name}
                                </span>
                                </>
                            </Listbox.Option>
                        )):<span>Городов не найдено</span>}
                    </Listbox.Options>
                </Transition>
            </Listbox>
            <span className="p-float-label">
                <Calendar inputId="birth_date" value={dateOutput}
                          onChange={(e) => setDateOutput(e.value)}
                          minDate={new Date()}
                          dateFormat="dd/mm/yy" showIcon iconPos="left" showButtonBar />
                <label htmlFor="birth_date" className="l" ref={aRef}>Дата вылета</label>
            </span>
            <span className="p-float-label">
                <Calendar inputId="birth_date" value={dateInput}
                          onChange={(e) => setDateInput(e.value)}
                          minDate={new Date()}
                          dateFormat="dd/mm/yy" showIcon showButtonBar  iconPos="left" />
                <label htmlFor="birth_date" className="l" ref={bRef}>Дата Возврата</label>
            </span>
            <Button label="Поиск" rounded className="b" />
        </form>
    )

}

export default Select;