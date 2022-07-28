import { IUserAttributes } from "./model";

export interface TypedJwtToken extends jwt.JwtPayload{
    id:string,
    role:string,
}
interface IParams{
    requestedUserId: number,
    requestedUserRole:string
}
export interface IUpdateUserParams extends IParams,IUserAttributes{
}
export interface IDeleteUserParams extends IParams{
    id:number;
}

export const enum ErrorTypes {
    UNAUTHORISED="Unauthorised access",
    INCORRECT_CREDENTIAL="Either of the credential is incorrect",
    USER_NOT_FOUND="User does not exist",
    INTERNAL_SERVER_ERROR="Internal Server Error",
    INVALID_USER_ID="Invalid user id",
    INVALID_REQUEST_BODY="Invalid Request Body, all required parameters are not present"
}