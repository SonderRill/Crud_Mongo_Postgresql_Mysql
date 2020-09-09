const router = require('express').Router()
const { db } = require('../config/db')
const util = require('util')

const query = util.promisify(db.query).bind(db)

// найти все посты
router.get('/', async (req, res) => {
    try {

        const result = await query('SELECT * FROM posts');
        res.json(result)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// найти пост по id
router.get('/:id', async (req, res) => {

    const id = req.params.id
    try {

        const result = await query('SELECT * FROM posts WHERE id = ?', [id])

        if (!result.length) {
            return res.status(404).json({ message: 'Пост с таким id не существует' })
        }

        res.json(result)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// создать пост
router.post('/', async (req, res) => {

    const { title, body } = req.body
    if (!title || !body) {
        return res.status(400).json({ message: 'Не все поля заполнены' })
    }

    try {
        const result = await query('INSERT INTO posts SET ?', [{ title, body }])

        const post = await query('SELECT * FROM posts WHERE id = ?', [result.insertId])
        res.json(post)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// обновить пост
router.put('/:id', async (req, res) => {

    const id = req.params.id
    if (!Number.isInteger(+id)) {
        return res.status(404).json({ message: 'Пост с таким id не существует' })
    }

    const { title, body } = req.body
    if (!title || !body) {
        return res.status(400).json({ message: 'Не все поля заполнены' })
    }

    try {

        const result = await query('UPDATE posts SET title = ?, body = ? WHERE id = ?', [title, body, id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Пост с таким id не существует' })
        }

        const post = await query('SELECT * FROM posts WHERE id = ?', [id])
        res.json(post)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

// удалить пост
router.delete('/:id', async (req, res) => {

    const id = req.params.id
    if (!Number.isInteger(+id)) {
        return res.status(404).json({ message: 'Пост с таким id не существует' })
    }

    try {

        const result = await query('DELETE FROM posts WHERE id = ?', [id])

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Пост с таким id не существует' })
        }

        res.json({ message: 'Пост удален' })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router