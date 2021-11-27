import React, { Component } from 'react';
import { fetchUser,clearProfileState } from '../actions/profile';
import {connect} from 'react-redux';
import { APIUrls } from '../helpers/urls';
import {getAuthTokenFromLocalStorage} from '../helpers/utils';
import {addToFriendsList, removeFriendFromList} from '../actions/friends';

class User extends Component {
    constructor(props){
        super(props);
        this.state={
            success:null,
            ERROR:null,
            successMessage:null
        }
    }
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
    
    checkIfUserIsAFriend=()=>{
        const {params}=this.props.match;
        const {friends}=this.props;
        
        const userId=params.userId;

        const index=friends.list.map((friend)=>friend.to_user._id).indexOf(userId);

        if(index!==-1)
        {
            return true;
        }
        return false;

    }
    handleRemoveFriend=async()=>{
        const url=APIUrls.removeFriendship(this.props.match.params.userId);
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${getAuthTokenFromLocalStorage()}`
            },
        }
        const response=await fetch(url,options);
        const data=await response.json();

        if(data.success){
            this.setState({
                success:true,
                successMessage:"FRIEND REMOVED SUCCESSFULLY"
            });
            this.props.dispatch(removeFriendFromList(this.props.match.params.userId));
        }else{
            this.setState({
                success:null,
                error:data.message
            });
        }
    }
    handleAddFriend=async()=>{
        const url=APIUrls.addFriend(this.props.match.params.userId);
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':`Bearer ${getAuthTokenFromLocalStorage()}`
            },
        }
        const response=await fetch(url,options);
        const data=await response.json();

        if(data.success){
            this.setState({
                success:true,
                successMessage:"FRIEND ADDED SUCCESSFULLY"
            });
            this.props.dispatch(addToFriendsList(data.data.friendship));
        }else{
            this.setState({
                success:null,
                error:data.message
            });
        }
    }

    render() {
        // console.log(this.props);
        const {user,inProgress,error}=this.props.profile;
        if(inProgress){
            return <h1>Loading...</h1>
        }

        const isUserAFriend=this.checkIfUserIsAFriend();
        const {success,ERROR,successMessage}=this.state;
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
                    {!isUserAFriend?<button className="button save-btn" onClick={this.handleAddFriend}>Add Friend</button>:<button className="button save-btn" onClick={this.handleRemoveFriend}>Remove Friend</button>}
                    {success&&<div className="alert success-dailog">{successMessage}</div>}
                    {ERROR&&<div className="alert error-dailog">{ERROR}</div>}

                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        profile:state.profile,
        friends:state.friends
    };

}
export default connect(mapStateToProps)(User);
