import {LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILED} from '../actions/actionTypes';

const initialAUthState={
    user:{},
    error:null,
    isLoggedIn:false,
    inprogress:false
}

export default function auth(state=initialAUthState,action){
    switch(action.type){
        case LOGIN_START:{
            return{
                ...state,
                inprogress:true, 
            }
        }
        case LOGIN_SUCCESS:{
            return {
                ...state,
                user:action.user,
                isLoggedIn:true,
                inprogress:false,
                error:null
            }
        } 
        case LOGIN_FAILED:{
            return{
                ...state,
                inprogress:false,
                error:action.error
            }
        }
        default:
            return state;    

    }
}