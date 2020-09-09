const mysql = require('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'crud'
})

const myConnect = async () => {
    try {
        await db.connect()
        console.log('MySql Connected...')

    } catch (err) {
        throw err
    }
}

module.exports = { db, myConnect }