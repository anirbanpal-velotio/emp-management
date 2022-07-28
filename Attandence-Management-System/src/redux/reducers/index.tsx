import { combineReducers } from "redux";
import { authReducer, AUTH_STATE } from "./auth";

export const rootReducer = combineReducers({
    auth: authReducer
})

export type reduxState = {
    auth: AUTH_STATE
}