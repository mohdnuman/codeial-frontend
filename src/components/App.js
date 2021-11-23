import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/posts';
import {PostsList} from './';


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  
  render() {
    const {posts}=this.props;
    // console.log("props",this.props);
    return (
      <div>
        <nav className="nav">
        <div className="left-div">
            <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="logo"
            />
        </div>
        <div className="search-container">
            <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            alt="search-icon"
            />
            <input placeholder="Search" />
        <div className="search-results">
            <ul>
                <li className="search-results-row">
                  <img
                  src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637675325~hmac=be32bd792493b7fa26ef5b033d11dc70"
                  alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
                <li className="search-results-row">
                  <img
                  src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637675325~hmac=be32bd792493b7fa26ef5b033d11dc70"
                  alt="user-dp"
                  />
                  <span>John Doe</span>
                </li>
            </ul>
            </div>
            </div>
            <div className="right-nav">
                <div className="user">
                    <img
                    src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637675325~hmac=be32bd792493b7fa26ef5b033d11dc70"
                    alt="user-dp"
                    id="user-dp"
                    />
                    <span>John Doe</span>
                </div>
                <div className="nav-links">
                    <ul>
                    <li>Log in</li>
                    <li>Log out</li>
                    <li>Register</li>
                    </ul>
                </div>
            </div>

            

        </nav>
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
