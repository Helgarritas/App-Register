// Components
import { envs } from './config/envs';
// Components
import { Server } from "./presentation/server"
import { AppRoutes } from "./presentation/routes"
import { MongoDataBase } from "./data/mongo/mongo.database"

(() => {
    main()
})()

async function main() {
    // Connect database
    const mongo = await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // Listen server
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })

    server.start();
}   