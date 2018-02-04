import React, { Component } from 'react'
import {getUserInfo, getFetch} from '../../auth';
import {MessageBox} from 'react-chat-elements';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: ""
        }
    }

    async componentWillMount() {
        try{
            if (this.props.type == "photo") {
                let response = await getFetch(`/s3/img/${this.props.s3key}`);
                this.setState({
                    imageUrl: response.url
                });
            }
        } catch(e) {
            console.log(e);
        }
    }

  render() {
    let userInfo = getUserInfo()
    let userName = userInfo.username;

    let ownMessage = userName == this.props.author;
    let position = ownMessage ? "right": "left";
    // let author = ownMessage ? "Meg" : this.props.author;
    let author = this.props.author

    let src = "";


    console.log(this.props);
    return (
        <div>
            <MessageBox
                title={author}
                position={position}
                type={this.props.type}
                text={this.props.textcontent}
                date={new Date(this.props.created)}
                data={{
                   uri: this.state.imageUrl
               }}
            />
        </div>
        );
    }
}

export default Message
