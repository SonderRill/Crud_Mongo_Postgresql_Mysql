const router = require('express').Router()
const { client } = require('../config/db')

// создание бд
router.get('/createdb', async (req, res) => {

    try {
        await client.query('CREATE DATABASE crud')
        res.json({ message: 'Db created...' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// создание таблицы
router.get('/createtable', async (req, res) => {
    try {
        await client.query('CREATE TABLE employee(id SERIAL NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL)')

        res.json({ message: 'Таблица создана' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// удаление таблицы
router.get('/deletetable', async (req, res) => {
    try {
        await client.query('DROP TABLE employee')

        res.json({ message: 'Таблица удалена' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router