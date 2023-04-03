import { START_LOADING, STOP_LOADING, StartLoading, UIActions } from "./ui.actions";

export interface State{
  isLoading : boolean;
}
const inialState:State= {
isLoading:false
};
export function uiReducer(state=inialState,action:UIActions){
  switch(action.type)
  {
    case START_LOADING :  return {isLoading:true};
    case STOP_LOADING: return{isLoading:false};
    default: return state;
  }
}
export const getIsLoading=(state:State) => state.isLoading;
