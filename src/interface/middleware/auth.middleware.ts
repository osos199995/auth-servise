import {Request,Response,NextFunction} from "express";
import {TokenUtil} from "../../infrastructure/utils/security/token.util";
import {UserService} from "../../domain/service/user.service";
import {BaseError} from "../../infrastructure/utils/errors/customError";
import {HttpStatusCodeEnum} from "../../infrastructure/utils/errors/httpStatusCode.enum";


export const authMiddleware=async (req:Request, res:Response, next:NextFunction) => {
    const tokenUtil = new TokenUtil()
    const token =
        req.body.token || req.query.token || req.headers.authorization;
    if (!token) {
        return res.status(403).send({message:"A token is required for authentication"});
    }
    try {
        const decoded = await tokenUtil.verify(token);

        const userService = new UserService();
        const user = await userService.findOne({id:decoded.data.id})    ;
        if (!user) return res.status(401).send({message:"NO such user"});
        if (!user.authenticated) return res.status(403).send({message:"User Already Logged Out!"});
        req.body.user = {
            id:user.id,
            name:user.name,
            email:user.email,
            permissions:user.permissions
        };
    } catch (err) {
        return res.status(401).send({message:"Invalid Token!"});
    }
    return next();
};
