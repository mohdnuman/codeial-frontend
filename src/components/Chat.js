import React, { Component } from "react";
import "../chat.css";
import io from "socket.io-client";
import { connect } from "react-redux";

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [], // {content: 'some message', self: true}
			typedMessage: "",
		};

		this.socket = io.connect("http://54.237.158.65:5000");
		this.userEmail = props.user.email;

		 if (this.userEmail) {
			this.setupConnection();
		} 
	}


	setupConnection = () => {
		const socketConnection = this.socket;
		const self = this;
		this.socket.on("connection", function () {
			console.log("Connection Established!");
			socketConnection.emit("join_room", {
				//for establishing a connextion between the user and the chat server
				user_email: this.userEmail,
				chatroom: "codeial"
			});

			socketConnection.on("user_joined", function (
				data //server sends a message that user has joined
			) {
				console.log("New user Joined!", data);
			});
		});

		this.socket.on("receive_message", function (data) {
			//add message to state
			const { messages } = self.state;
			const messageObject = {};
			messageObject.content = data.message;

			if (data.user_email === self.userEmail) {
				messageObject.self = true;
			} else {
				messageObject.self = false;
			}
			self.setState({
				messages: [...messages, messageObject],
				typedMessage: ""
			});
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { typedMessage } = this.state;
		if (typedMessage && this.userEmail) {
			this.socket.emit("send_message", {
				message: typedMessage,
				user_email: this.userEmail,
				chatroom: "codeial"
			});
		}
	};


	render() {
		const { typedMessage, messages } = this.state;

		return (
			<div className="chat-container">
				<div className="chat-header">
					Chat
					<img
						src="https://cdn-icons.flaticon.com/png/512/3364/premium/3364185.png?token=exp=1638192256~hmac=1e46fa8185865186be4ba33b2eeba684"
						alt=""
						height={17}
						onClick={this.handleMinimize}
					/>
				</div>
				<div className="chat-messages">
					{messages.map((message, index) => (
						<div
							className={
								message.self
									? "chat-bubble self-chat"
									: "chat-bubble other-chat"
							}
							key={index}
						>
							{message.content}
						</div>
					))}
				</div>
				<div className="chat-footer">
					<input
						type="text"
						value={typedMessage}
						onChange={(event) =>
							this.setState({ typedMessage: event.target.value })
						}
					/>
					<button onClick={this.handleSubmit}>
						Send
					</button>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.auth.user };
}

export default connect(mapStateToProps)(Chat);