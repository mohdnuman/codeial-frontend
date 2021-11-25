import React, { Component } from 'react';

class Login extends Component {
    constructor(props){
        super(props);
        this.emailInputRef=React.createRef();
        this.passwordInputRef=React.createRef();
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        console.log(this.emailInputRef,this.passwordInputRef);
    }
    render() {
        return (
         <form className="login-form">
             <span className="login-signup-header">Log In</span>
             <div className="field">
                 <input type="email" placeholder="Email" required ref={this.emailInputRef} />
             </div>
             <div className="field">
                 <input type="password" placeholder="Password" required ref={this.passwordInputRef}/>
             </div>
             <div className="field">
                 <button type="submit" onClick={this.handleSubmit}>Log In</button>
             </div>
         </form>
        );
    }
}

export default Login;