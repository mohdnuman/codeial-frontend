import {LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS,SIGNUP_FAILED,SIGNUP_SUCCESS,SIGNUP_START} from './actionTypes';
import{APIUrls} from '../helpers/urls';
import getFormBody from '../helpers/utils';

export function startLogin(){
    return {
        type:LOGIN_START
    };
}

export function loginFailed(message){
    return {
        type:LOGIN_FAILED,
        error:message
    };
}

export function loginSuccess(user){
    return {
        type:LOGIN_SUCCESS,
        user:user
    };
}

export function login(email,password){
    return(dispatch)=>{
        dispatch(startLogin());
        const url=APIUrls.login();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({email,password})
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data); 
            if(data.success){
                localStorage.setItem('token',data.data.token);
                dispatch(loginSuccess(data.data.user))
                return;
            }
            else{
                dispatch(loginFailed(data.message));
            }
        })
    };
}

export function startSignup(){
    return {
        type:SIGNUP_START
    };
}

export function signupFailed(message){
    return {
        type:SIGNUP_FAILED,
        error:message
    };
}

export function signupSuccess(user){
    return {
        type:SIGNUP_SUCCESS,
        user:user
    };
}

export function signup(email,name,password,confirm_password){
    return(dispatch)=>{
        dispatch(startSignup());
        const url=APIUrls.signup();
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:getFormBody({email,name,password,confirm_password})
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data); 
            if(data.success){
                dispatch(signupSuccess(data.data.user))
                return;
            }
            else{
                dispatch(signupFailed(data.message));
            }
        })
    };
}


