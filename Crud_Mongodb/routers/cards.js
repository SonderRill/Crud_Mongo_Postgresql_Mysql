const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', async (req, res) => {
    try {
        const cards = await Card.find()
        res.json(cards)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const card = await Card.findById(id)
        if (!card) {
            return res.status(404).json({ message: 'Карточка не найдена' })
        }
        res.json(card)

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Карточка не найдена' })
        }
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})


router.post('/', async (req, res) => {
    const { title, text } = req.body
    if (!title || !text) {
        return res.status(400).json({ message: 'Не все поля заполнены' })
    }

    try {
        const newCard = await Card.create({ title, text })
        res.json(newCard)

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id

    const { title, text } = req.body
    if (!title || !text) {
        return res.status(400).json({ message: 'Не все поля заполнены' })
    }

    try {
        const card = await Card.findByIdAndUpdate(id, { title, text }, { new: true })
        res.json(card)

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Карточка не найдена' })
        }
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const card = await Card.findByIdAndDelete(id)
        if (!card) {
            return res.status(404).json({ message: 'Карточка не найдена' })
        }
        res.json(card)

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Карточка не найдена' })
        }
        console.log(err.message)
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router