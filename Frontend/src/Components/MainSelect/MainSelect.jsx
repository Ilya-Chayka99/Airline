import './MainSelect.css'
import Select from "../Select/Select.jsx";

const MainSelect = () =>{


    return(
        <>
           <div className="Name">
               <h3>АВИАКОМПАНИЯ</h3>
               <h1>Новый Горизонт</h1>
               <p>ОТКРЫВАЕМ ПЕРЕД ВАМИ МИР ПОЛЕТОВ,
                   УНОСЯ ВАС в ВВЛЕКАТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ И ПРЕДОСТАВЛЯЯ НЕПОВТОРИМЫЕ ВПЕЧАТЛЕНИЯ.</p>
           </div>
            <Select/>
        </>
    )

}

export default MainSelect;