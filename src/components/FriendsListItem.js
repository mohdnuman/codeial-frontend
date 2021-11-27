import React from 'react';
import { Link } from 'react-router-dom';

class FriendsListItem extends React.Component
{
    render()
    {
        return(
            <div>
                <Link className="friends-item" to={`user/${this.props.friend._id}`}>
                    <div className="friends-img">
                        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-pic" />

                    </div>
                    <div className="friends-name">
                        {this.props.friend.name}
                    </div>
                </Link>
            </div>
        );
    }
}

export default FriendsListItem;