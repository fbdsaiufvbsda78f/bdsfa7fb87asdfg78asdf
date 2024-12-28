const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

mongoose.connect("mongodb://127.0.0.1:27017/calculations", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const calcSchema = new mongoose.Schema({
    email: String,
    calcData: Object,
    createdAt: { type: Date, default: Date.now }
})

const Calculation = mongoose.model("Calculation", calcSchema)

const app = express()
app.use(cors())
app.use(express.json())

app.post("/api/calculate", (req, res) => {
    const {
        area,
        floors,
        foundation,
        walls,
        roof,
        balcony,
        terrace,
        garage
    } = req.body

    const foundationCostMap = {
        "ленточный": 3000,
        "плитный": 4000,
        "столбчатый": 2000
    }

    const wallsCostMap = {
        "кирпич": 5000,
        "дерево": 4000,
        "газобетон": 3500
    }

    const roofCostMap = {
        "плоская": 1500,
        "скатная": 2500
    }

    let extras = 0
    if (balcony) extras += 50000
    if (terrace) extras += 60000
    if (garage) extras += 70000

    const foundationCost = foundationCostMap[foundation] * area
    const wallsCost = wallsCostMap[walls] * area * floors
    const roofCost = roofCostMap[roof] * area

    const total = foundationCost + wallsCost + roofCost + extras

    const breakdown = [
        { title: "Фундамент", cost: foundationCost },
        { title: "Стены", cost: wallsCost },
        { title: "Крыша", cost: roofCost },
        { title: "Доп. опции", cost: extras }
    ]

    return res.json({ total, breakdown })
})

app.post("/api/save", async (req, res) => {
    try {
        const { calcData, email } = req.body

        const newCalculation = new Calculation({
            email,
            calcData
        })
        await newCalculation.save()

        res.json({ message: "Расчёт успешно сохранён и письмо отправлено." })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Ошибка при сохранении данных" })
    }
})

const PORT = 5000
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
