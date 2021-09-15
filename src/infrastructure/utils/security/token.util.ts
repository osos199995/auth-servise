// tslint:disable-next-line:no-var-requires
import {BaseError} from "../errors/customError";
import {HttpStatusCodeEnum} from "../errors/httpStatusCode.enum";

// tslint:disable-next-line:no-var-requires
const jwt = require('jsonwebtoken');

export class TokenUtil{
    public async signIn(userDetails: UserTokenDetail){
        return await jwt.sign({
              ex:  "100h" ,
              data: userDetails
          }, 'secret')
    }

    public async verify(token: string){
        try {
            return await jwt.verify(token, 'secret')
        } catch(err) {
            // @ts-ignore
            throw new BaseError(HttpStatusCodeEnum.BAD_REQUEST, "Invalid Token!")
        }
    }
}

 interface UserTokenDetail{
    name: string,
    email:string,
    id:number
}
