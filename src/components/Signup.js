import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {signup} from '../actions/auth';
import {clearAuthState} from '../actions/auth';



class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            name:'',
            password:'',
            confirm_password:''
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
      }
    handleNameChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handleEmailChange=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handlePasswordChange=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    handleConfirmPasswordChange=(e)=>{
        this.setState({
            confirm_password:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state);
        const {email,name,password,confirm_password}=this.state;
        if(email && password && password===confirm_password){
            this.props.dispatch(signup(email,name,password,confirm_password));
        }
    }
    render() {
        const {inProgress,error,isLoggedIn}=this.props.auth;
        if(isLoggedIn)
        {
           return <Redirect to="/" />
        }
        return (
         <form className="login-form">
             <span className="login-signup-header">Sign Up</span>
             {error&&<div className="alert error-dailog">{error}</div>}
             <div className="field">
                 <input type="text" placeholder="Full Name" required onChange={this.handleNameChange}/>
             </div>
             <div className="field">
                 <input type="email" placeholder="Email" required onChange={this.handleEmailChange}/>
             </div>
             <div className="field">
                 <input type="password" placeholder="Password" required onChange={this.handlePasswordChange}/>
             </div>
             <div className="field">
                 <input type="password" placeholder=" Confirm Password" required onChange={this.handleConfirmPasswordChange}/>
             </div>
             <div className="field">
                 {/* <button type="submit" onClick={this.handleSubmit}>Sign Up</button> */}
                 {inProgress?<button type="submit" onClick={this.handleSubmit} disabled={inProgress}>Signing Up...</button>:
                 <button type="submit" onClick={this.handleSubmit}>Sign Up</button>
                }
             </div>
         </form>
        );
    }
}

function mapStateToProps(state){
    return{
        auth:state.auth
    }
}
export default connect(mapStateToProps)(Signup);