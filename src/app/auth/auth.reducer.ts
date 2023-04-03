import { SET_UNAUTHENTICATED, SET_AUTHENTICATED, AuthActions } from "./auth.actions";

export interface State{
  isAuthenticated : boolean;
}
const inialState:State= {
  isAuthenticated:false
};
export function authReducer(state=inialState,action:AuthActions){
  switch(action.type)
  {
    case SET_AUTHENTICATED :  return {isAuthenticated:true};
    case SET_UNAUTHENTICATED: return{isAuthenticated:false};
    default: return state;
  }
}
export const getIsAuth=(state:State) => state.isAuthenticated;
