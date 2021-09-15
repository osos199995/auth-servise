import {HttpStatusCodeEnum} from "./httpStatusCode.enum";

export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCodeEnum;

    constructor( httpCode: HttpStatusCodeEnum, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}
