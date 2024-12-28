import { useState } from "react"
import mapImage from "../images/map.jpg"
import "./Contact.css"

function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div className="contact-container">
            <h1>Связаться с нами</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Имя</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="email">Почта</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="message">Сообщение</label>
                <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                />
                <button type="submit">Отправить</button>
            </form>

            <div className="map-section">
                <h2>Местоположение офиса</h2>
                <img src={mapImage} alt="Карта офиса" className="office-map" />
            </div>

            <div className="contact-info">
                <h2>Контактная информация</h2>
                <p>Адрес: г. Москва, ул. Примерная д. 10</p>
                <p>Телефон: 8 (999) 177-17-17</p>
                <p>Email: info@architecturecomfort.ru</p>
            </div>
        </div>
    )
}

export default Contact
