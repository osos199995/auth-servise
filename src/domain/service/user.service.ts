import {UserRepository} from "../../infrastructure/persistance/repositories/user.repository";
import {getCustomRepository, UpdateResult} from "typeorm";
import {UserModel} from "../models/user.model";
import {UserTokenResponseDto} from "../../app/dto/responses/userTokenResponse.dto";
import {BaseError} from "../../infrastructure/utils/errors/customError";
import {HttpStatusCodeEnum} from "../../infrastructure/utils/errors/httpStatusCode.enum";
import {TokenUtil} from "../../infrastructure/utils/security/token.util";
import {UserEntity} from "../../infrastructure/persistance/entities/user.entity";
// tslint:disable-next-line:no-var-requires
const bcrypt = require('bcryptjs');

export class UserService{
    private userRepository: UserRepository;
    private tokenUtil: TokenUtil
    constructor() {
        this.userRepository = getCustomRepository(UserRepository)
        this.tokenUtil = new TokenUtil()
    }

    public login= async (req: UserModel):Promise<UserTokenResponseDto>=>{
        const user =await this.findOne({email:req.email })
        if (!user) throw new BaseError(HttpStatusCodeEnum.BAD_REQUEST,"No Such User!")
        if (await bcrypt.compare(req.password,user.password)){
            const token = await this.tokenUtil.signIn(user)
            user.authenticated =true;
            this.update(user)
            return {token}
        }
        throw new BaseError(HttpStatusCodeEnum.BAD_REQUEST,"No Such User!")

    }
    public find = async (filter?: any):Promise<UserModel[]>=>{
      return  this.userRepository.find(filter);
    }
    public findOne = async (filter?: any):Promise<UserModel | undefined>=>{
        return this.userRepository.findOne(filter);
    }

    public create = async (user:UserModel ):Promise<UserModel>=>{
        user.password= await bcrypt.hashSync(user.password, 10)
        user.authenticated = false;
        return await this.userRepository.save(user);
    }
    public update = async (user: UserModel):Promise<UpdateResult>=>{
        return this.userRepository.update({id:user.id},user)
    }

    public logout =  (user: UserModel)=>{
         this.userRepository.update({id:user.id},user)
    }
    public delete = async ()=>{
        return " deletes from service"

    }
}
