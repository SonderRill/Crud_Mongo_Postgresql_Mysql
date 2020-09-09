const mongoose = require('mongoose')

const startMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost/test_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Mongoose has been connected');
    } catch (error) {
        console.log(error)
    }
}

module.exports = startMongo