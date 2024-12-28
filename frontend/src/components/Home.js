import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../images/logo.png"
import "./Home.css"

function Home() {
    const [calcData, setCalcData] = useState({
        area: "",
        floors: 1,
        foundation: "ленточный",
        walls: "кирпич",
        roof: "плоская",
        balcony: false,
        terrace: false,
        garage: false
    })

    const [costResult, setCostResult] = useState(null)
    const [email, setEmail] = useState("")

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setCalcData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleCalculate = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(calcData)
            })
            const data = await response.json()
            setCostResult(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSendEmail = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ calcData, email })
            })
            const data = await response.json()
            alert(data.message || "Ошибка при отправке")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <nav className="header-nav">
                    <img src={logo} alt="Логотип" className="home-logo" />
                    <ul className="nav-links">
                        <li><Link to="/services" className="nav-link">Услуги</Link></li>
                        <li><Link to="/about" className="nav-link">О нас</Link></li>
                        <li><Link to="/contact" className="nav-link">Контакты</Link></li>
                    </ul>
                </nav>
                <div className="hero-content">
                    <h1>Архитектура Комфорта</h1>
                    <p>Строим дома, в которых хочется жить</p>
                    <Link to="/services" className="cta-btn">Узнать больше</Link>
                </div>
            </header>

            <section className="about-section">
                <div className="about-content">
                    <h2>О компании</h2>
                    <p>Мы — команда опытных специалистов, которые предлагают полный цикл работ по проектированию и строительству домов любого уровня сложности. Каждый проект выполняется по современным стандартам и технологиям.</p>
                    <Link to="/about" className="btn">Подробнее</Link>
                </div>
            </section>

            <section className="services-section">
                <h2>Наши услуги</h2>
                <div className="services-cards">
                    <div className="service-card">
                        <h3>Строительство</h3>
                        <p>Дома под ключ с учетом всех пожеланий и сроков.</p>
                    </div>
                    <div className="service-card">
                        <h3>Проектирование</h3>
                        <p>Индивидуальные решения для каждого клиента.</p>
                    </div>
                    <div className="service-card">
                        <h3>Отделка</h3>
                        <p>Внутренняя и внешняя отделка любой сложности.</p>
                    </div>
                </div>
            </section>

            <section className="calc-section">
                <h2>Калькулятор стоимости строительства</h2>
                <div className="calc-form">
                    <label>
                        Площадь (кв. м.):
                        <input
                            type="number"
                            name="area"
                            value={calcData.area}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Количество этажей:
                        <input
                            type="number"
                            name="floors"
                            min="1"
                            value={calcData.floors}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Тип фундамента:
                        <select
                            name="foundation"
                            value={calcData.foundation}
                            onChange={handleChange}
                        >
                            <option value="ленточный">Ленточный</option>
                            <option value="плитный">Плитный</option>
                            <option value="столбчатый">Столбчатый</option>
                        </select>
                    </label>
                    <label>
                        Материал стен:
                        <select
                            name="walls"
                            value={calcData.walls}
                            onChange={handleChange}
                        >
                            <option value="кирпич">Кирпич</option>
                            <option value="дерево">Дерево</option>
                            <option value="газобетон">Газобетон</option>
                        </select>
                    </label>
                    <label>
                        Тип крыши:
                        <select
                            name="roof"
                            value={calcData.roof}
                            onChange={handleChange}
                        >
                            <option value="плоская">Плоская</option>
                            <option value="скатная">Скатная</option>
                        </select>
                    </label>
                    <div className="checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="balcony"
                                checked={calcData.balcony}
                                onChange={handleChange}
                            />
                            Балкон
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="terrace"
                                checked={calcData.terrace}
                                onChange={handleChange}
                            />
                            Терраса
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="garage"
                                checked={calcData.garage}
                                onChange={handleChange}
                            />
                            Гараж
                        </label>
                    </div>
                    <button onClick={handleCalculate}>Рассчитать стоимость</button>
                    {costResult && (
                        <div className="calc-result">
                            <h3>Итоговая стоимость: {costResult.total} руб.</h3>
                            <ul>
                                {costResult.breakdown.map((item, index) => (
                                    <li key={index}>
                                        {item.title}: {item.cost} руб.
                                    </li>
                                ))}
                            </ul>
                            <div className="email-send">
                                <label>
                                    Отправить на email:
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </label>
                                <button onClick={handleSendEmail}>Сохранить и отправить</button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="reviews-section">
                <h2>Отзывы</h2>
                <blockquote>
                    "Мы обратились в Архитектура Комфорта для строительства нашего первого дома, и остались в полном восторге! С самого начала команда проявила высокий уровень профессионализма и внимательности к нашим пожеланиям. Проект был разработан быстро и с учетом всех наших требований. Строительство прошло в срок, а качество работ превзошло наши ожидания. Теперь у нас есть уютный дом, в котором мы счастливо живем. Рекомендуем всем!" - Анна и Сергей Петровы
                </blockquote>
                <blockquote>
                    "Хочу выразить благодарность Архитектура Комфорта за отличную работу! Я долго искал надежного подрядчика для строительства дачи, и, наконец, нашел. Команда профессионалов помогла мне на каждом этапе — от проектирования до отделки. Особенно понравился калькулятор стоимости, который позволил заранее понять, какие расходы нас ожидают. Все было сделано качественно и в срок. Обязательно буду рекомендовать вас своим друзьям!" - Игорь Сидоров
                </blockquote>
                <blockquote>
                    "С Архитектура Комфорта мы строили дом для нашей семьи. В целом, мы довольны результатом. Работы были выполнены качественно, и команда всегда была на связи, что очень важно. Единственное, что хотелось бы улучшить — это скорость выполнения некоторых этапов. Но в целом, мы получили именно тот дом, о котором мечтали. Спасибо за вашу работу!" - Елена Кузнецова
                </blockquote>
            </section>

            <section className="contact-section">
                <h2>Свяжитесь с нами</h2>
                <p>г. Москва, ул. Примерная 10</p>
                <p>Телефон: 8 (999) 177-17-17</p>
                <Link to="/contact" className="btn">Написать нам</Link>
            </section>
        </div>
    )
}

export default Home
