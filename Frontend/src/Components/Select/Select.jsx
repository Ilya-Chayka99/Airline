import React, {useRef} from 'react'
import {useEffect, useState} from "react";
import ky from 'ky'
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import './Select.css'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectLoadForm} from "../slice/airSlise.jsx";
import {Dropdown} from "primereact/dropdown";


const Select = ({reg, setDate, setG_p, setG_v}) => {
    const dispatch = useDispatch();
    const [city,setCity] = useState([])
    const [selectOutput, setSelectOutput] = useState(useSelector(state => state.air.selectOutput))
    const [selectInput, setSelectInput] = useState(useSelector(state => state.air.selectInput))
    const [dateOutput, setDateOutput] = useState(useSelector(state => state.air.dateOutput));
    const [dateInput, setDateInput] = useState(useSelector(state => state.air.dateInput));
    const aRef = useRef()
    const navigate = useNavigate();
    useEffect(() => {
        if (dateOutput)
            aRef.current.innerHTML = ''
        else aRef.current.innerHTML = 'Дата вылета'
    }, [dateOutput])

    useEffect(() => {
        async function fetchData() {
            setCity(await ky('Airport', {prefixUrl: 'http://193.233.233.3:8081'}).json())
        }
        fetchData().then(r => r)
        if (reg) {
            setSelectOutput(null)
            setSelectInput(null)
            setDateOutput(null)
        }
    }, [])

    const sub = (event) => {
        event.preventDefault()
        if (reg) {
            setDate(dateOutput)
            setG_v(selectOutput)
            setG_p(selectInput)
        } else {
            if ((selectOutput.id !== 0) && (selectInput.id !== 0) && dateOutput) {
                dispatch(selectLoadForm({selectInput, selectOutput, dateInput, dateOutput}));
                navigate("/selectticket")
            }

        }

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
    return ( city &&
        <form className="cont" onSubmit={sub}>
            <Dropdown value={selectOutput} onChange={(e) => setSelectOutput(e.value)}
                      options={city} optionLabel="name"
                      placeholder="Город вылета"
                      filter valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate} className="w-full md:w-14rem"/>
            <Dropdown value={selectInput} onChange={(e) => setSelectInput(e.value)}
                      options={city} optionLabel="name"
                      placeholder="Город Прилета"
                      filter valueTemplate={selectedCountryTemplate}
                      itemTemplate={countryOptionTemplate} className="w-full md:w-14rem"/>
            <span className="p-float-label">
                <Calendar inputId="birth_date" value={dateOutput}
                          onChange={(e) => setDateOutput(e.value)}
                          minDate={new Date()}
                          dateFormat="dd/mm/yy" showIcon iconPos="left" showButtonBar/>
                <label htmlFor="birth_date" className="l" ref={aRef}>Дата вылета</label>
            </span>
            <Button label="Поиск" rounded className="b"/>
        </form>
    )

}


export default Select;