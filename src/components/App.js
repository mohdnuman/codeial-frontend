import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,Link,Route } from 'react-router-dom';
import {fetchPosts} from '../actions/posts';
import {PostsList} from './';
import {Navbar} from './index';



const Home=()=>{
  return (
    <div>
      Home
    </div>
  );
}


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  
  render() {
    const {posts}=this.props;
    // console.log("props",this.props);
    return (
      <Router>
      <div>
        <Navbar/>
        {/* <PostsList posts={posts}/> */}
        <Route exact path="/" component={Home}/>
         
      </div>
      </Router>
    );
  }
}

function mapstatetoprops(state){
  return{
    posts:state.posts,
  };
}


export default connect(mapstatetoprops)(App);
