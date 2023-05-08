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
import {Dropdown} from "primereact/dropdown";


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

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }
        return <span>{props.placeholder}</span>;
    };
    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };
    return(
        <form className="cont" onSubmit={sub}>
            <Dropdown value={selectOutput} onChange={(e) => setSelectOutput(e.value)}
                      options={city} optionLabel="name"
                      placeholder="Город вылета"
                      filter valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
            <Dropdown value={selectInput} onChange={(e) => setSelectInput(e.value)}
                      options={city} optionLabel="name"
                      placeholder="Город Прилета"
                      filter valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
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