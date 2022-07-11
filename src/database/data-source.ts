import env from 'dotenv'
import {DataSource} from 'typeorm'

env.config()

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    migrations: [__dirname + '/migrations/*.ts'],
    entities: ['src/app/entities/*.ts'],
    migrationsRun: true,
    logging: false,
    synchronize: false
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)

    })

export default dataSource