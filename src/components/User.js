import React, { Component } from 'react';
import { fetchUser,clearProfileState } from '../actions/profile';
import {connect} from 'react-redux';

class User extends Component {
    componentDidMount() {
        const {params}=this.props.match;
        if(params.userId){
            //dispatch an action to fetch user 
            this.props.dispatch(fetchUser(params.userId));
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearProfileState());
    }
    
    
    render() {
        // console.log(this.props);
        const {user,inProgress,error}=this.props.profile;
        if(inProgress){
            return <h1>Loading...</h1>
        }
        return (
           
            <div className="settings">
                <div className="img-container">
                    <img
                            src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
                            alt="user-dp"
                            id="user-dp"
                    />
                </div>
                {error&&<div className="alert error-dailog">{error}</div>}
               

                <div className="field">
                    <div className="field-label">Email</div>
                    <div className="field-value">{user.email}</div>
                </div>
                <div className="field">
                    <div className="field-label">Full Name</div>
                    <div className="field-value">{user.name}</div>
                </div>

                <div className="btn-grp">
                    <button className="button save-btn">Add Friend</button>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        profile:state.profile
    };

}
export default connect(mapStateToProps)(User);
