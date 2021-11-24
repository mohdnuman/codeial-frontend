import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,Link,Route,Switch } from 'react-router-dom';
import {fetchPosts} from '../actions/posts';
import {PostsList} from './';
import {Navbar,Home} from './index';
import {Page404} from './index';

const Login=()=>{
  return (
    <div>
      Login
    </div>
  );
}
const Signup=()=>{
  return (
    <div>
      Signup
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
        <Switch>
          <Route exact path="/" 
            render={(props)=>{
              return <Home {...props} posts={posts}/>
            }}
          />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route component={Page404}/>
        </Switch>
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
