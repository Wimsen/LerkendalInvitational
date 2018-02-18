import React, { Component } from 'react'
import {getUserInfo, getFetch} from '../../auth/userAuth';
import {MessageBox} from 'react-chat-elements';

import ImagePreview from '../ImagePreview';

import {getSignedUrl} from '../../service/s3';

class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl: "",
            modalIsOpen: false
        }
    }

    async componentWillMount() {
        if (this.props.type == "photo") {
            let url = await getSignedUrl(this.props.s3key);
            this.setState({
                imageUrl: url
            });
        }
    }

    toggleImagePreview = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

  render() {
    let userInfo = getUserInfo()
    let userName = userInfo.username;

    let ownMessage = userName == this.props.author;
    let position = ownMessage ? "right": "left";
    // let author = ownMessage ? "Meg" : this.props.author;
    let author = this.props.author

    let src = "";

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
                onClick={this.toggleImagePreview}
            />
            {
                this.props.type == "photo" &&
                <ImagePreview
                    toggleModal={this.toggleImagePreview}
                    modalIsOpen={this.state.modalIsOpen}
                    imageUrl={this.state.imageUrl}
                />
            }
        </div>
        );
    }
}

export default Message
