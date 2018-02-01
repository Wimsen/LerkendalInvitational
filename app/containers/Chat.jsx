import React, {Component} from 'react'
import {userFetch} from '../auth';
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
            this.setState({loading: true});

            let messages = await userFetch('/messages');
            console.log(messages);
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

    handleNewMessage = (text) => {
        // let userInfo = getUserInfo()
        // let userName = userInfo.username;
        let userName = "username";

        let message = {
            author: userName,
            message: text
        };
        this.socket.emit('message', message);
        this.setState({
            messages: [
                ...this.state.messages,
                message
            ]
        })
    }

    render() {
        return (<div className="App">
            <h2>Chat</h2>
            {
                this.state.loading
                    ? <LoadingSpinner/>
                    : <MessageList messages={this.state.messages}/>
            }
            <MessageForm onMessageSend={this.handleNewMessage}/>
        </div>)
    }
}

export default Chat
