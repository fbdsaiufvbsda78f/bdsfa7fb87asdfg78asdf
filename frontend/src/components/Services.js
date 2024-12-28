import "./Services.css"
import work1 from "../images/6801kc.jpg"
import work2 from "../images/dom-iz-monolitnogo-zhelezobetona1-e1656236065787.jpg"
import work3 from "../images/f7a56bd3562be3d296493d90f2aa78ed.jpg"

function Services() {
    return (
        <div className="services-container">
            <header className="services-header">
                <h1>Услуги</h1>
                <p>Реализуем проекты любой сложности и сопровождаем на всех этапах</p>
            </header>

            <section className="services-intro">
                <h2>Основные направления</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <h3>Строительство домов под ключ</h3>
                        <p>Полный цикл работ по возведению дома, от фундамента до отделки.</p>
                    </div>
                    <div className="service-card">
                        <h3>Проектирование</h3>
                        <p>Разработка индивидуальных и готовых проектов с учетом пожеланий.</p>
                    </div>
                    <div className="service-card">
                        <h3>Отделка и ремонт</h3>
                        <p>Внутренняя и внешняя отделка, капитальный и косметический ремонт.</p>
                    </div>
                    <div className="service-card">
                        <h3>Консультации и поддержка</h3>
                        <p>Помощь на всех этапах: выбор материалов, составление сметы и т.д.</p>
                    </div>
                </div>
            </section>

            <section className="services-details">
                <div className="service-block">
                    <h3>Подробнее о работах</h3>
                    <ul>
                        <li>Фундаменты (ленточный, плитный, столбчатый)</li>
                        <li>Стены (кирпич, дерево, газобетон)</li>
                        <li>Крыши (плоские, скатные)</li>
                        <li>Инженерные коммуникации</li>
                    </ul>
                    <p>Все проекты разрабатываются с учетом норм и стандартов.</p>
                </div>
                <div className="service-block">
                    <h3>Калькулятор стоимости</h3>
                    <p>Онлайн-инструмент, который позволяет рассчитать ориентировочную цену строительства.</p>
                </div>
            </section>

            <section className="services-gallery">
                <h2>Примеры работ</h2>
                <div className="gallery">
                    <img src={work1} alt="Работа1" />
                    <img src={work2} alt="Работа2" />
                    <img src={work3} alt="Работа3" />
                </div>
            </section>
        </div>
    )
}

export default Services
