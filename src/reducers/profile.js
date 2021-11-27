import { USER_PROFILE_FAILED,USER_PROFILE_SUCCESSFUL,FETCH_USER_PROFILE,CLEAR_PROFILE_STATE } from "../actions/actionTypes";

const initialProfileState={
    user:{},
    error:null,
    success:null,
    inProgress:false,

}

export default function profile(state=initialProfileState,action){
    switch(action.type){
        case USER_PROFILE_SUCCESSFUL:
            return {
                ...state,
                success:true,
                inProgress:false,
                user:action.user
            }
        case USER_PROFILE_FAILED:
            return {
                ...state,
                error:action.error,
                inProgress:false
            }  
        case FETCH_USER_PROFILE:
            return {
                ...state,
                inProgress:true
            }
        case CLEAR_PROFILE_STATE:{
            return{
                ...state,
                 error:null
            }
        }
        default:
            return state;

    }


}