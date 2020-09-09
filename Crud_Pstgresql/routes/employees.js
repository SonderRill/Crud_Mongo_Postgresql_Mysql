const router = require('express').Router()
const { client } = require('../config/db')

// получить всех сотрудников
router.get('/', async (req, res) => {
    try {

        const result = await client.query('SELECT * FROM employee')
        res.json(result.rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// получить сотрудника по id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    if (!Number.isInteger(+id)) {
        return res.status(404).json({ message: 'Работника с таким id нет' })
    }

    try {
        const result = await client.query('SELECT * FROM employee WHERE id=$1', [id])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Работника с таким id нет' })
        }

        res.json(result.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// создать сотрудника
router.post('/', async (req, res) => {
    const { name, email } = req.body

    if (!name || !email) {
        return res.json({ message: 'Не все поля заполнены' })
    }

    try {
        const result = await client.query('INSERT INTO employee(name, email) VALUES($1, $2) RETURNING *', [name, email])
        res.json(result.rows)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// обновить сотрудника
router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (!Number.isInteger(+id)) {
        return res.status(404).json({ message: 'Работника с таким id нет' })
    }

    const { name, email } = req.body
    if (!name || !email) {
        return res.json({ message: 'Не все поля заполнены' })
    }

    try {
        const result = await client.query('UPDATE employee SET name=$1, email=$2 WHERE id=$3 RETURNING *', [name, email, id])
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Работника с таким id нет' })
        }
        res.json(result.rows)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// удалить сотрудника
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (!Number.isInteger(+id)) {
        return res.status(404).json({ message: 'Работника с таким id нет' })
    }

    try {
        const result = await client.query('DELETE FROM employee WHERE id=$1', [id])
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Работника с таким id нет' })
        }
        res.json({ message: 'Работник удален' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router