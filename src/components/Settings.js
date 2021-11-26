import React, { Component } from 'react';
import {connect} from 'react-redux';

class Settings extends Component {
    constructor(props){
        super(props);
        this.state={
            name:props.auth.user.name,
            password:'',
            confirm_password:'',
            editMode:false
        }
    }

    handleChange=(fieldName,val)=>{
        this.setState({
            [fieldName]:val,
        });
    }
    render() {
        const {user}=this.props.auth;
        const{editMode}=this.state;
        return (
            <div className="settings">
                <div className="img-container">
                    <img
                            src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
                            alt="user-dp"
                            id="user-dp"
                    />
                </div>
                <div className="field">
                    <div className="field-label">Email</div>
                    <div className="field-value">{user.email}</div>
                </div>
                <div className="field">
                    <div className="field-label">Full Name</div>
                    {editMode?<input type="text" onChange={(e)=>this.handleChange('name',e.target.value)} value={this.state.name}/>: <div className="field-value">{user.name}</div>}
                </div>
                {editMode&&<div className="field">
                    <div className="field-label">New Password</div>
                    <input type="password" onChange={(e)=>this.handleChange('password',e.target.value)} value={this.state.password}/>
                    </div>}
                {editMode&&<div className="field">
                    <div className="field-label">New Password</div>
                    <input type="password" onChange={(e)=>this.handleChange('confirm_password',e.target.value)} value={this.state.confirm_password}/>
                    </div>}
                <div className="btn-grp">
                    {editMode?<button className="button save-btn">Save</button>:<button className="button edit-btn" onClick={()=>{this.handleChange('editMode',true)}}>Edit Profile</button>}
                    {editMode&&<div className="go-back" onClick={()=>{this.handleChange('editMode',false)}}>Go Back</div>}
                </div>

                
            </div>
        );
    }
}
function mapstatetoprops(state){
    return{
        auth:state.auth,
    }
}

export default connect(mapstatetoprops)(Settings);
