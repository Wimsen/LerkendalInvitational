import React, {Component} from 'react'
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'mdbreact';
import {userFetch} from '../../auth/userAuth';
import ReactS3Uploader from 'react-s3-uploader';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            s3key: "",
            messageText: "",
            imageText: "",
            imagePreviewUrl: "",
            modal: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    sendTextMessage = (event) => {
        event.preventDefault();
        let message = {
            textcontent: this.state.messageText,
            type: "text"
        }
        this.props.sendMessage(message)
        this.setState({
            messageText: ""
        });
    }

    sendImageMessage = () => {
        let message = {
            s3key: this.state.s3key,
            textcontent: this.state.imageText,
            type: "photo"
        }
        this.props.sendMessage(message);
        this.setState({
            imageText: "",
            s3key: "",
            modal: false,
        });
    }

    onUploadStart = (file, next) => {
        console.log(file);
        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file);
        next(file);
    }

    onUploadFinish = (data) => {
        console.log(data);
        this.setState({s3key: data.fileKey});
    }

    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    render() {

        return (<div>
            <div className="messageForm">
                <div className=" md-form">
                    <form>
                        <div className="container">
                            <div className="row">
                                <div className="col col-9">
                                    <div className="input-container">
                                        <input value={this.state.messageText} onChange={this.handleInputChange} name="messageText" type="text"  id="messagetext" className="form-control"/>
                                        <label htmlFor="messagetext">Melding</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <button onClick={this.toggleModal} type="button" className="btn btn-primary px-3"><i className="fa fa-camera" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div className="col">
                                    <button onClick={this.sendTextMessage} type="submit" className="btn btn-primary no-margin-btm">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Send bilde</ModalHeader>
                <ModalBody>
                    Send et bilde
                    <input value={this.state.imageText} onChange={this.handleInputChange} name="imageText" type="text" placeholder="Enter your message..."/>
                    <ReactS3Uploader
                        signingUrl="/s3/sign"
                        signingUrlMethod="GET"
                        accept="image/*"
                        s3path="chat/"
                        preprocess={this.onUploadStart}
                        onProgress={this.onUploadProgress}
                        onError={this.onUploadError}
                        onFinish={this.onUploadFinish}
                        signingUrlWithCredentials={true}
                        uploadRequestHeaders={{
                            'x-amz-acl' : 'public-read'
                        }}
                        contentDisposition="auto"
                        scrubFilename={(filename) => filename.replace(/[^\w\d_\-.]+/ig, '')}
                        inputRef={cmp => this.uploadInput = cmp}
                        autoUpload={true}
                    />
                        {
                            this.state.imagePreviewUrl
                            ? <img src={this.state.imagePreviewUrl}/>
                            : ""
                        }
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggleModal}>Avbryt</Button>{' '}
                    <Button color="primary" onClick={this.sendImageMessage}>Send</Button>
                </ModalFooter>
            </Modal>
        </div>)
    }
}

export default MessageForm
