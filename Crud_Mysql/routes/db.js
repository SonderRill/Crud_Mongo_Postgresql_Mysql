const router = require('express').Router()
const util = require('util')
const { db } = require('../config/db')

const query = util.promisify(db.query).bind(db);

// создание бд
router.get('/createdb', async (req, res) => {
    try {
        const result = await query('CREATE DATABASE IF NOT EXISTS crud')

        if (result.warningCount !== 0) {
            return res.json({ message: 'База данных уже существует' })
        }

        res.json({ message: 'База данных созданна...' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// создание таблицы
router.get('/createposttable', async (req, res) => {
    try {
        const sql = 'CREATE TABLE IF NOT EXISTS posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'
        const result = await query(sql)

        if (result.warningCount !== 0) {
            return res.json({ message: 'Таблица уже существует' })
        }

        res.json({ message: 'Таблица создана...' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// удаление таблицы
router.get('/deletetable', async (req, res) => {
    try {
        const result = await query('DROP TABLE IF EXISTS posts')

        if (result.warningCount !== 0) {
            return res.json({ message: 'Таблицы не существует' })
        }

        res.json({ message: 'Таблица удалена...' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router