import express,{Request,Response} from 'express';
import {UserInterface} from "./user.interface";
import {BookInterface} from "./book.interface";
import {PermissionsInterface} from "./permissions.interface";

export class CustomRouter{
    private app: express.Application;
    private userInterface:UserInterface
    private bookInterface:BookInterface
    private permissionsInterface:PermissionsInterface
    constructor(app: express.Application) {
        this.app = app
    }
    public routing(){
        this.userInterface= new UserInterface();
        this.bookInterface= new BookInterface();
        this.permissionsInterface= new PermissionsInterface();
        this.app.use('/api/users/',this.userInterface.router)
        this.app.use('/api/books/',this.bookInterface.router)
        this.app.use('/api/permissions/',this.permissionsInterface.router)
        this.app.get('/',(req:Request,res:Response)=>{
            res.send('pong!')
        })
    }
}
