import React, {Component} from 'react'
import {authFetch, getFetch, getUserInfo, isAuthenticated} from '../auth/userAuth';
import openSocket from 'socket.io-client';

import MessageForm from '../components/chat/MessageForm.jsx';
import MessageList from '../components/chat/MessageList.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            messages: []
        }

        this.socket = openSocket();

        this.socket.on('message', (message) => {
            this.setState({
                messages: [
                    ...this.state.messages,
                    message
                ]
            });
        });
    }

    async componentWillMount() {
        try {
            this.setState({
                loading: true
            });

            let messages = await authFetch('/api/chat/messages');

            messages.sort((message1, message2) => {
                return new Date(message1.created) - new Date(message2.created);
            });

            this.setState({
                loading: false,
                messages: [
                    ...this.state.messages,
                    ...messages
                ]
            });
            this.messageList.scrollToBottom();
        } catch (err) {
            console.log(err);
        }
    }

    sendMessage = async (message) => {
        let userInfo = getUserInfo();
        let teamName = userInfo.teamname;
        message.author = teamName;

        this.socket.emit('message', message);

        this.setState({
            messages: [
                ...this.state.messages,
                message
            ]
        })
    }

    render() {
        return (<div className="chat">
            <h2>Chat</h2>
            {
                isAuthenticated() ?
                this.state.loading
                    ? <LoadingSpinner/>
                    : <div>
                        <MessageList ref={e => this.messageList = e} messages={this.state.messages}/>
                        <MessageForm sendMessage={this.sendMessage}/>
                    </div>
                : <div>Du må logge inn</div>
            }
        </div>)
    }
}

export default Chat
