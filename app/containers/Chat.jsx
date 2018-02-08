import React, {Component} from 'react'
import {userFetch, getFetch, getUserInfo, isAuthenticated} from '../auth';
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

        this.socket = openSocket('http://localhost:8082');

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

            let messages = await userFetch('/api/messages');
            this.setState({
                loading: false,
                messages: [
                    ...this.state.messages,
                    ...messages
                ]
            });
        } catch (e) {
            console.log(e);
        }
    }

    sendMessage = async (message) => {
        let userInfo = getUserInfo();
        let userName = userInfo.username;

        message.author = userName;

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
                        <MessageList messages={this.state.messages}/>
                        <MessageForm sendMessage={this.sendMessage}/>
                    </div>
                : <div>Du må logge inn</div>
            }
        </div>)
    }
}

export default Chat
