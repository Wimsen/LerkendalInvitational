import React, {Component} from 'react'
import Message from './Message'

class MessageList extends Component {

    constructor() {
        super(); 
        this.state = {
            messages: []
        }
    }

    componentDidUpdate = () => {
        this.node.scrollTop = this.node.scrollHeight
    }

    render() {
        return (
            <div className="MessageList" ref={(node) => (this.node = node)}>
                {this.props.messages.map((message, i) => (<Message key={i} {...message}/>))}
            </div>
        );
    }
}

export default MessageList
