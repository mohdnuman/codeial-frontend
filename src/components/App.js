import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/posts';
import {PostsList} from './';
import {Navbar} from './index';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  
  render() {
    const {posts}=this.props;
    // console.log("props",this.props);
    return (
      <div>
        <Navbar/>
        <PostsList posts={posts}/>
        

      </div>
    );
  }
}

function mapstatetoprops(state){
  return{
    posts:state.posts,
  };
}


export default connect(mapstatetoprops)(App);
