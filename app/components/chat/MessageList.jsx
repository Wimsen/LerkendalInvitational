import React, {Component} from 'react'
import Message from './Message'

class MessageList extends Component {

    constructor() {
        super();
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    scrollToBottom = () => {
        console.log("scrolling bot");
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div className="messageList" ref={(node) => (this.node = node)}>
                {this.props.messages.map((message, i) => (<Message key={i} {...message}/>))}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>

        );
    }
}

export default MessageList
