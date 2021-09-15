import {Request, Response, Router} from "express";
import {authMiddleware} from "./middleware/auth.middleware";
import {PermissionsApp} from "../app/permissions.app";
export class PermissionsInterface{
    public router: Router
    private permissionsApp: PermissionsApp
    constructor() {
        this.router =  Router();
        this.permissionsApp = new PermissionsApp()
        this.routes();
    }


    public find = async (req: Request,res: Response)=>{
        await this.permissionsApp.find().then(record=>{
            res.send({data:record})
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public routes(){
        this.router.get('/',authMiddleware,this.find);
    }
}
