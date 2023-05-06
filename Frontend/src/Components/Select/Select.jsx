import './Select.css'
import React from 'react'
import {useEffect, useState} from "react";
import ky from 'ky'
import {Listbox, Transition} from "@headlessui/react";
import { FiChevronsDown } from "react-icons/fi";
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";


const Select = () =>{
    const [city,setCity] = useState([])
    const [selectOutput,setSelectOutput] = useState({name:"Город вылета"})
    const [selectInput,setSelectInput] = useState({name:"Город прилета"})
    const [date, setDate] = useState(null);
    useEffect( ()=>{
        async function fetchData() {
            setCity(await ky('zzz', {prefixUrl: 'http://localhost:8080'}).json())
        }
        fetchData().then(r =>  r)
    },[])

    const sub = (event) => {
        console.log(event)
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
                        {city.map((city)=>(
                            <Listbox.Option value={city} key={city.id}>
                                <>
                                    <span>
                                        {city.name}
                                    </span>
                                </>
                            </Listbox.Option>
                        ))}
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
                        {city.map((city)=>(
                            <Listbox.Option value={city} key={city.id}>
                                <>
                                <span>
                                    {city.name}
                                </span>
                                </>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
            <input type="date" onChange={(event)=>console.log(event.target.value)} title="Дата вылета"/>
            <span className="p-float-label">
                <Calendar inputId="birth_date" value={date} onChange={(e) => console.log(e.value)} />
                <label htmlFor="birth_date">Birth Date</label>
            </span>
        </form>
    )

}

export default Select;