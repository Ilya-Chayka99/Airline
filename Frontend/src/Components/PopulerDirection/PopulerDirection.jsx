import log1 from './img/popular.png'
import log2 from './img/popular2.png'
import log3 from './img/popular3.png'
import './PopulerDirection.css'

const PopulerDirection = ()=> {

    return (
        <>
            <section className="popular">
                <h2>Популярные направления полетов</h2>
                <div className="panel">
                    <div className='card'>
                        <img src={log1} alt="1"/>
                        <p>Бали, Индонезия</p>
                    </div>
                    <div className='card'>
                        <img src={log2} alt="1"/>
                        <p>Керри, Исландия</p>
                    </div>
                    <div className='card'>
                        <img src={log3} alt="1"/>
                        <p>Сидней, Автралия</p>
                    </div>
                </div>
            </section>
        </>
    )
}
export default PopulerDirection