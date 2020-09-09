const express = require('express')
const app = express()
const startMongo = require('./config/db')

startMongo()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/cards', require('./routers/cards'))

// обработка 404
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))