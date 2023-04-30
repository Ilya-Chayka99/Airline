import './Select.css'

const Select = () =>{


    return(
        <>
            <form className="cont">
                <>
                    <select className="box">
                        <option value="Выбрать" selected disabled hidden>Выбрать</option>
                        <option value="Чай">Чай</option>
                    </select>
                    <select className="box">
                        <option value="Выбрать" selected disabled hidden>Выбрать</option>
                        <option value="Чай">Чай</option>
                    </select>
                </>

            </form>

        </>
    )

}

export default Select;