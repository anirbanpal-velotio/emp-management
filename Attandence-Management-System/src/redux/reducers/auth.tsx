import { USER_STATE } from "../../models/user.model";
import { AUTH, AUTH_ACTION } from "../actions/auth";

export type AUTH_STATE = {
  user: USER_STATE | null;
};

const initialState: AUTH_STATE = {
  user: null,
};

export function authReducer(
  state: AUTH_STATE = initialState,
  action: AUTH_ACTION
): AUTH_STATE {
  switch (action.type) {
    case AUTH.LOGGEDIN:
      const user = action.payload!;
      return {
        ...state,
        user,
      };

    case AUTH.LOGGEDOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
