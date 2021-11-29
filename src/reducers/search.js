import { FETCH_SEARCH_RESULTS_SUCCESS } from "../actions/actionTypes";

const initalSearchState={
    results:[]
}

export default function search(state=initalSearchState,action){
    switch(action.type){
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return{
                ...state,
                results:action.users
            }
        default:
            return state;
    }
}