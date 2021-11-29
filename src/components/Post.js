import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Comment} from './index';
import {addLike, createComment} from '../actions/posts';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
		super(props);
		this.state = {
			comment: ""
		};
	}
  handleOnCommentChange = (event) => {
		this.setState({
			comment: event.target.value
		});
	};
  handleAddComment = (event) => {
		const { comment } = this.state;
		const { post } = this.props;
		if (event.key === "Enter") {
			this.props.dispatch(createComment(comment, post._id));
			this.setState({
				comment: ""
			});
		}
	};
  handleAddLike=()=>{
    const {post,auth}=this.props;
    this.props.dispatch(addLike(post._id,'Post',auth.user._id));
  }
    render() {
        const {post,auth}=this.props;

        const isPostLikedByUser=post.likes.includes(auth.user._id);
        return (
            <div>
                
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/user/${post.user._id}`}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user-pic"
                />
                </Link>
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <div className="post-like">
                  <button className="post-like no-btn" onClick={this.handleAddLike}>
                  {isPostLikedByUser?
                      <img
                      src="https://cdn-icons.flaticon.com/png/512/739/premium/739231.png?token=exp=1638187393~hmac=a8ae90de4dd2ce437a5fbed317249d13"
                      alt="likes-icon"
                    />:
                    <img
                    src="https://cdn-icons-png.flaticon.com/512/126/126473.png"
                    alt="likes-icon"
                  />
                  }
                  </button>
                  <span>{post.likes.length}</span>
                </div>

                <div className="post-comments-icon">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1450/1450338.png"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" onKeyPress={this.handleAddComment} onChange={this.handleOnCommentChange}/>
              </div>

              <div className="post-comments-list">
                {post.comments.map((comment)=>(
                    <Comment comment={comment} key={comment._id} postId={post._id}/>
                ))}
                
              </div>
            </div>
          </div>
            </div>
        );
    }
}
function mapstatetoprops(state){
  return{
    auth:state.auth
  }
}

export default connect(mapstatetoprops)(Post);