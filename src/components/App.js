import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import {fetchPosts} from '../actions/posts';
import {Navbar,Home} from './index';
import {Page404,Login,Signup} from './index';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';





class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token=localStorage.getItem('token');
    if(token){
      const user=jwtDecode(token);
      console.log(user);
      this.props.dispatch(authenticateUser({
        email:user.email,
        _id:user._id,
        name:user.name
      }));
    }
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
