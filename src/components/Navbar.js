import React from 'react';

function Navbar(props) {
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
                <div className="user">
                    <img
                    src="https://cdn-icons.flaticon.com/png/512/1785/premium/1785888.png?token=exp=1637748100~hmac=e9de15ba99477ea0ae3911729f6bb5af"
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
        </div>
    );
}

export default Navbar;