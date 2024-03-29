import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
	constructor() {
		super();
		this.state = {
			messages: []
		};
	}

	componentDidMount() {
		this.scrollToBottom();
	}

	componentDidUpdate() {
		this.scrollToBottom();
	}

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
	};

	render() {
		return (
			<div className="messageList" ref={node => (this.node = node)}>
				{this.props.messages.map((message, i) => (
					<Message key={i} {...message} />
				))}
				<div
					style={{ float: 'left', clear: 'both' }}
					ref={el => {
						this.messagesEnd = el;
					}}
				/>
			</div>
		);
	}
}

export default MessageList;
