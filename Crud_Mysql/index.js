const express = require('express')
const { myConnect } = require('./config/db')
const app = express()

// коннект к бд
myConnect()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', require('./routes/db'))
app.use('/posts', require('./routes/posts'))

// обработка 404
app.use((req, res) => {
    res.status(404).send('Sorry cant find that!')
})


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server has been started on ${PORT}`))