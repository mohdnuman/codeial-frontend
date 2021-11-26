import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import {fetchPosts} from '../actions/posts';
import {Navbar,Home} from './index';
import {Page404,Login,Signup,Settings} from './index';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

// const Settings=()=><div>Settings</div>

const PrivateRoute=(privateRouteProps)=>{
  const{isLoggedIn,path,component:Component}=privateRouteProps;
  return(
    <Route path={path} render={(props)=>{
      return isLoggedIn?<Component {...props} />:<Redirect to="/login" />
    }}
    />
  );

}



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
    const {posts,auth}=this.props;
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
          <PrivateRoute path="/settings" component={Settings} isLoggedIn={auth.isLoggedIn}/>
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
    auth:state.auth
  };
}


export default connect(mapstatetoprops)(App);
