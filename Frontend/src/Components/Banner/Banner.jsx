import './Banner.css'
import Select from "../Select/Select.jsx";

const Banner = () =>{


    return(
        <div className="banner">
           <div className="Namew">
               <h3>АВИАКОМПАНИЯ</h3>
               <h1>Новый Горизонт</h1>
               <p>ОТКРЫВАЕМ ПЕРЕД ВАМИ МИР ПОЛЕТОВ,
                   УНОСЯ ВАС В ВВЛЕКАТЕЛЬНЫЕ ПРИКЛЮЧЕНИЯ И ПРЕДОСТАВЛЯЯ НЕПОВТОРИМЫЕ ВПЕЧАТЛЕНИЯ.</p>
           </div>
            <Select/>
        </div>
    )

}

export default Banner;