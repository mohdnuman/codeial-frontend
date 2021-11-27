import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import {fetchPosts} from '../actions/posts';
import {Navbar,Home} from './index';
import {Page404,Login,Signup,Settings,User} from './index';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from "../actions/friends";

// const Settings=()=><div>Settings</div>

const PrivateRoute=(privateRouteProps)=>{
  const{isLoggedIn,path,component:Component}=privateRouteProps;
  return(
    <Route path={path} render={(props)=>{
      return isLoggedIn?
      <Component {...props} />:
      <Redirect to={{
        pathname:'/login',
        state:{ 
          from:props.location,   //{pathname:'/settings'}
        },
      }}/>
    }}
    />
  );

}



class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token=getAuthTokenFromLocalStorage();
    if(token){
      const user=jwtDecode(token);
      console.log(user);
      this.props.dispatch(authenticateUser({
        email:user.email,
        _id:user._id,
        name:user.name
      }));

      this.props.dispatch(fetchUserFriends());
    }
  }
  
  
  
  render() {
    const {posts,auth,friends}=this.props;
    // console.log("props",this.props);
    return (
      <Router>
      <div>
        <Navbar/>
        {/* <PostsList posts={posts}/> */}
        <Switch>
          <Route exact path="/" 
            render={(props)=>{
              return <Home {...props} posts={posts} friends={friends.list} isLoggedIn={auth.isLoggedIn}/>
            }}
          />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/settings" component={Settings} isLoggedIn={auth.isLoggedIn}/>
          <PrivateRoute path="/user/:userId" component={User} isLoggedIn={auth.isLoggedIn}/>
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
    auth:state.auth,
    friends:state.friends
  };
}


export default connect(mapstatetoprops)(App);
