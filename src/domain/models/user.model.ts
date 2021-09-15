export class UserModel{
    id: number;
    name: string
    email: string
    password: string
    authenticated: boolean
    permissions?:string[]
}
