import { USER_STATE } from "../../models/user.model"

export enum AUTH  {
    LOGGEDIN= 'LOGGEDIN',
    LOGGEDOUT= 'LOGGEDOUT',
}

export type AUTH_ACTION={
    type: AUTH,
    payload: USER_STATE|null
}
export function setLoggedIn(user: USER_STATE){
    return {
        type: AUTH.LOGGEDIN,
        payload: user
    }
}

export function setLoggedOut(){
    return {
        type: AUTH.LOGGEDOUT
    }
}