import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";
import swaggerSpec, {swaggerUiOptions} from "./config/swagger";

// conectar a la base de datos

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.green.bold('Conexion exitosa a la base de datos'))
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('Hubo un error al conectar a la base de datos'))
    }
}

connectDB()

// instancia de express
const server = express()

// permitir conexiones
const corsOptions : CorsOptions = {
   origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
   } 
}
server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

// docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server