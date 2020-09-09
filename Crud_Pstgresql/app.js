const express = require('express')
const app = express()
const { postgresConnect } = require('./config/db')

postgresConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/employees', require('./routes/employees'))
app.use('/', require('./routes/db'))

// обработка 404
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!')
})

const PORT = 3000 || process.env.PORT
app.listen(PORT, console.log(`Server has been started on ${PORT} port`))