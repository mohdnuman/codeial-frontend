import React, { Component } from 'react';
import {login} from '../actions/auth';
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props){
        super(props);
        // this.emailInputRef=React.createRef();
        // this.passwordInputRef=React.createRef();
        this.state={
            email:'',
            password:''
        }
    }
    handleEmailChange=(e)=>{
        this.setState({
            email:e.target.value
        });
    }
    handlePasswordChange=(e)=>{
        this.setState({
            password:e.target.value
        });
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const {email,password}=this.state;
        if(email&&password){
            this.props.dispatch(login(email,password));
        }
        console.log(this.state);
        // console.log(this.emailInputRef,this.passwordInputRef);
    }
    render() {
        const {error,inProgress}=this.props.auth;
        return (
         <form className="login-form">
             <span className="login-signup-header">Log In</span>
             {error&&<div className="alert error-dailog">{error}</div>}
             <div className="field">
                 {/* <input type="email" placeholder="Email" required ref={this.emailInputRef} /> */}
                 <input type="email" placeholder="Email" required onChange={this.handleEmailChange} value={this.state.email}/>

             </div>
             <div className="field">
                 <input type="password" placeholder="Password" required onChange={this.handlePasswordChange} value={this.state.password}/>
             </div>
             <div className="field">
                {inProgress?<button type="submit" onClick={this.handleSubmit} disabled={inProgress}>Logging In...</button>:
                 <button type="submit" onClick={this.handleSubmit}>Log In</button>
                }
             </div>
         </form>
        );
    }
}
function mapStateToProps(state){
    return{
        auth:state.auth,
    };
}

export default connect(mapStateToProps)(Login);