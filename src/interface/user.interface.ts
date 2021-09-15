import {Request, Response, Router} from "express";
import {UserApp} from "../app/user.app";
import {validate} from 'express-validation'
import {LoginUserRequest, RegisterUserRequest, UpdateUserRequest} from "../app/dto/requests/user-request.dto";
import {TokenUtil} from "../infrastructure/utils/security/token.util";
import {authMiddleware} from "./middleware/auth.middleware";
export class UserInterface{
    public router: Router
    private userApp: UserApp
    private tokenUtil: TokenUtil
    constructor() {
        this.router =  Router();
        this.userApp = new UserApp()
        this.routes();
        this.tokenUtil = new TokenUtil()
    }

    public current = async (req: Request,res: Response)=>{
        await this.userApp.current(await req.body.user.id).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public logout = async (req: Request,res: Response)=>{
        await this.userApp.logout(await req.body.user.id).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public create = async (req: Request,res: Response)=>{
        await this.userApp.create(req.body).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public update = async (req: Request,res: Response)=>{
        await this.userApp.update(req.body).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }
    public login = async (req: Request,res: Response)=>{
        await this.userApp.login(req.body).then(record=>{
            res.send(record)
        }).catch(e=>{
            return res.status(e.httpCode||500).json({
                "message":e.message
            })
        })
    }

    public routes(){
        this.router.post('/',validate(RegisterUserRequest, {}, {}),this.create);
        this.router.patch('/',validate(UpdateUserRequest, {}, {}),this.update);
        this.router.get('/current',authMiddleware,this.current);
        this.router.get('/logout',authMiddleware,this.logout);
        this.router.post('/login',validate(LoginUserRequest, {}, {}),this.login);

    }
}
