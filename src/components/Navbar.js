import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/auth'

class Navbar extends React.Component{
    logOut=()=>{
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    }
    render(){
        const {auth}=this.props;
            return (
                <div>
                    <nav className="nav">
                <div className="left-div">
                    <Link to="/">
                    <img
                    src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
                    alt="logo"
                    />
                    </Link>
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
                        src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
                        alt="user-dp"
                        />
                        <span>John Doe</span>
                        </li>
                        <li className="search-results-row">
                        <img
                        src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
                        alt="user-dp"
                        />
                        <span>John Doe</span>
                        </li>
                    </ul>
                    </div>
                    </div>
                    <div className="right-nav">
                        {auth.isLoggedIn&& <div className="user">
                            <Link to="/settings">
                            <img
                            src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
                            alt="user-dp"
                            id="user-dp"
                            />
                            </Link>
                            <span>{auth.user.name}</span>
                        </div>}
                       
                        <div className="nav-links">
                            <ul>
                            {!auth.isLoggedIn&&<li><Link to="/login">Log in</Link></li>}
                            {auth.isLoggedIn&&<li onClick={this.logOut}>Log out</li>}
                            {!auth.isLoggedIn&&<li><Link to="/signup">Register</Link></li>}
                            </ul>
                        </div>
                    </div>

                    

                </nav>
                </div>
            );
    }
}
function mapStateToProps(state){
    return{
    auth:state.auth
    }
}
export default connect(mapStateToProps)(Navbar);