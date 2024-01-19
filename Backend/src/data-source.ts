import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Products } from "./entity/product"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    // password: "test",
    database: "taskDb",
    synchronize: true,
    logging: false,
    entities: [Products],
    migrations: [],
    subscribers: [],
})
