import { USER_PROFILE_FAILED,USER_PROFILE_SUCCESSFUL,FETCH_USER_PROFILE,CLEAR_PROFILE_STATE } from "./actionTypes";
import { APIUrls } from "../helpers/urls";
import {getAuthTokenFromLocalStorage} from '../helpers/utils';
export function userProfileSuccess(user){
    return{
        type:USER_PROFILE_SUCCESSFUL,
        user
    }
}
export function userProfileFailed(error){
    return{
        type:USER_PROFILE_FAILED,
        error
    }
}
export function fetchUserProfileStart(){
    return {
        type:FETCH_USER_PROFILE,
    }
}
export function fetchUser(userId){
    return(dispatch)=>{
        dispatch(fetchUserProfileStart());
        const url=APIUrls.userProfile(userId);
        fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${getAuthTokenFromLocalStorage()}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.success){
                dispatch(userProfileSuccess(data.data.user));
                return;
            }
            dispatch(userProfileFailed(data.message));
        });
    }

}
export function clearProfileState(){
    return{
        type:CLEAR_PROFILE_STATE
    }
}