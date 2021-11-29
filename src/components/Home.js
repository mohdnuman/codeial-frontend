import React, { Component } from 'react';
import Chat from './Chat';
import {PostsList,FriendsList} from'./index';

class Home extends Component {
    render() {
        const {posts,isLoggedIn}=this.props
        return (
            <div className="home">
                <PostsList posts={posts}/>
                {isLoggedIn && <FriendsList friends={this.props.friends}/>}
                {isLoggedIn && <Chat/>}
            </div>
            
        );
    }
}

export default Home;