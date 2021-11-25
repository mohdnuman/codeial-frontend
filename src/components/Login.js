import React, { Component } from 'react';

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
        console.log(this.state);
        // console.log(this.emailInputRef,this.passwordInputRef);
    }
    render() {
        return (
         <form className="login-form">
             <span className="login-signup-header">Log In</span>
             <div className="field">
                 {/* <input type="email" placeholder="Email" required ref={this.emailInputRef} /> */}
                 <input type="email" placeholder="Email" required onChange={this.handleEmailChange} value={this.state.email}/>

             </div>
             <div className="field">
                 <input type="password" placeholder="Password" required onChange={this.handlePasswordChange} value={this.state.password}/>
             </div>
             <div className="field">
                 <button type="submit" onClick={this.handleSubmit}>Log In</button>
             </div>
         </form>
        );
    }
}

export default Login;