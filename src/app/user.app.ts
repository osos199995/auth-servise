import {UserService} from "../domain/service/user.service";
import {UserModel} from "../domain/models/user.model";
import {BaseError} from "../infrastructure/utils/errors/customError";
import {HttpStatusCodeEnum} from "../infrastructure/utils/errors/httpStatusCode.enum";
import {UserResponseDto} from "./dto/responses/userResponse.dto";
import {UserTokenResponseDto} from "./dto/responses/userTokenResponse.dto";

export class UserApp{
    private userService: UserService
    constructor() {
        this.userService = new UserService()
    }
    public findOne =  async (filter?:any):Promise<UserResponseDto>=>{
        const user = await  this.userService.findOne(filter)
        if (!user) throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, "No Such User!")
        return {
            id:user.id,
            name:user.name,
            email:user.email
        }
    }

    public current =  async (id:string):Promise<UserResponseDto>=>{
        const user = await  this.userService.findOne(id)
        if (!user) throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, "No Such User!")
        if (!user.authenticated) throw new BaseError(HttpStatusCodeEnum.FORBIDDEN,"User already Logged out!" )
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            permissions: user.permissions
        }
    }
    async create(req: UserModel):Promise<UserResponseDto> {
        const exists = await this.userService.findOne({email: req.email})
        if (exists)  throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, "Email Already Exits!")
        const user =  await this.userService.create(req);
        return {
            id:user.id,
            name: user.name,
            email: user.email,
            permissions: user.permissions,
        }
    }
    public update = async (req: UserModel):Promise<UserResponseDto>=>{
        const exists = await this.userService.findOne(req.id)
        if (!exists)  throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, "User doesn't exits Already Exits!")
        await  this.userService.update(req)
      const user = await this.userService.findOne(req.id)
        if (!user) throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, 'User does not exits!')
        return {
            id:user.id,
            name: user.name,
            email: user.email,
            permissions: user.permissions,
        }
    }
    public login = async (req: UserModel):Promise<UserTokenResponseDto>=>{
        return this.userService.login(req)
    }

    public logout =  async (id:string):Promise<{message:string}>=>{
        const user = await  this.userService.findOne(id)
        if (!user) throw new BaseError(HttpStatusCodeEnum.NOT_FOUND, "No Such User!")
        user.authenticated= false;
        this.userService.update(user)
        return {
           message: "user logged out successfully!"
        }
    }
}
