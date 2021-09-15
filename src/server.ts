import express from 'express';
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import {ValidationError} from "express-validation";
import {UserEntity} from "./infrastructure/persistance/entities/user.entity";
import {CustomRouter} from "./interface/custom-router";
import {BookEntity} from "./infrastructure/persistance/entities/book.entity";

class Server{
    private app: express.Application;
    private customRouter: CustomRouter

    constructor() {
        require("dotenv").config();
        this.app = express();
        this.configuration();
        this.routes();
    }
    public configuration(){
        this.app.set('port',process.env.PORT|| 3000)
    }
    public async routes(){
     await createConnection({
            type:'postgres',
            host:process.env.POSTGRES_HOST,
            port:Number(process.env.POSTGRES_PORT),
            username:process.env.POSTGRES_USER,
            password:process.env.POSTGRES_PASSWORD,
            database:process.env.POSTGRES_DATABASE,
            synchronize: Boolean(process.env.POSTGRES_SYNCHORONIZE),
            entities:[ UserEntity,BookEntity],
        }).catch(e=>{
            console.log(e)
        })
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
        // router
        this.customRouter = new CustomRouter(this.app)
        this.customRouter.routing()
        this.app.use((err:any, req:any, res:any, next:any)=> {
            if (err instanceof ValidationError) {
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(err)
        })
    }
    public start(){
        this.app.listen(this.app.get('port'),()=>{
            console.log(`listening to port ${this.app.get('port')}`)
        })
    }
}

const server = new Server()
server.start()
