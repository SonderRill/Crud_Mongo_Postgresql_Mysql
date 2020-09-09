const pg = require("pg")

const config = {
    host: 'localhost',
    user: 'postgres',
    password: '19372882',
    database: 'crud',
    port: 5432
};

const client = new pg.Client(config);

const postgresConnect = async () => {
    try {
        await client.connect()
        console.log('Postgres connected...')


    } catch (err) {
        throw err
    }
}

module.exports = { client, postgresConnect }