import {Request, Response, Router} from "express";
import {validate} from 'express-validation'
import {authMiddleware} from "./middleware/auth.middleware";
import {BookApp} from "../app/book.app";
import { CreateBookRequestDto} from "../app/dto/requests/book-request.dto";
export class BookInterface{
    public router: Router
    private bookApp: BookApp
    constructor() {
        this.router =  Router();
        this.bookApp = new BookApp()
        this.routes();
    }
    public create = async (req: Request,res: Response)=>{
        if (!req.body.user.permissions.includes('WriteBook'))return  res.status(403).json({
            message:'User does not have permissions to write book! '
        })
      await this.bookApp.create(req.body).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }

    public find = async (req: Request,res: Response)=>{
        if (!req.body.user.permissions.includes('ReadBook'))return  res.status(403).json({
            message:'User does not have permissions to read book! '
        })
        await this.bookApp.find().then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public routes(){
        this.router.post('/',[validate(CreateBookRequestDto, {}, {}),authMiddleware],this.create);
        this.router.get('/',authMiddleware,this.find);
    }
}
