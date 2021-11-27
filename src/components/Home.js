import React, { Component } from 'react';
import {PostsList,FriendsList} from'./index';

class Home extends Component {
    render() {
        const {posts,isLoggedIn}=this.props
        return (
            <div className="home">
                <PostsList posts={posts}/>
                {isLoggedIn && <FriendsList friends={this.props.friends}/>}
            </div>
            
        );
    }
}

export default Home;