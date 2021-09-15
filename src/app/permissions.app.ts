import {PermissionService} from "../domain/service/permission.service";

export class PermissionsApp{
    private permissionService: PermissionService
    constructor() {
        this.permissionService = new PermissionService()
    }
    public find =  async (filter?:any)=>{
       return this.permissionService.find()
    }
}
