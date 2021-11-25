import {LOGIN_START,LOGIN_SUCCESS,LOGIN_FAILED,SIGNUP_FAILED,SIGNUP_START,SIGNUP_SUCCESS} from '../actions/actionTypes';

const initialAUthState={
    user:{},
    error:null,
    isLoggedIn:false,
    inProgress:false
}

export default function auth(state=initialAUthState,action){
    switch(action.type){
        case LOGIN_START:{
            return{
                ...state,
                inProgress:true, 
            }
        }
        case LOGIN_SUCCESS:{
            return {
                ...state,
                user:action.user,
                isLoggedIn:true,
                inProgress:false,
                error:null
            }
        } 
        case LOGIN_FAILED:{
            return{
                ...state,
                inProgress:false,
                error:action.error
            }
        }
        case SIGNUP_START:{
            return{
                ...state,
                inProgress:true, 
            }
        }
        case SIGNUP_SUCCESS:{
            return {
                ...state,
                user:action.user,
                isLoggedIn:true,
                inProgress:false,
                error:null
            }
        } 
        case SIGNUP_FAILED:{
            return{
                ...state,
                inProgress:false,
                error:action.error
            }
        }

        default:
            return state;    

    }
}