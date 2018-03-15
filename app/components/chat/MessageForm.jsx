import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import { authFetch } from '../../auth/userAuth';
import ImageUploader from '../ImageUploader';

class MessageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			s3key: '',
			messageText: '',
			imageText: '',
			imagePreviewUrl: '',
			modal: false
		};
	}

	handleInputChange = event => {
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({ [name]: value });
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	sendTextMessage = event => {
		event.preventDefault();
		let message = {
			textcontent: this.state.messageText,
			type: 'text'
		};
		this.props.sendMessage(message);
		this.setState({
			messageText: ''
		});
	};

	sendImageMessage = async data => {
		let message = {
			s3key: data.s3key,
			textcontent: data.imageText,
			type: 'photo'
		};
		await this.props.sendMessage(message);
		this.setState({
			imageText: '',
			s3key: '',
			modal: false
		});
	};

	onUploadStart = (file, next) => {
		let reader = new FileReader();
		reader.onloadend = () => {
			this.setState({
				imagePreviewUrl: reader.result
			});
		};
		reader.readAsDataURL(file);
		next(file);
	};

	onUploadFinish = data => {
		this.setState({ s3key: data.fileKey });
	};

	handleImageChange = e => {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				imagePreviewUrl: reader.result
			});
		};
		reader.readAsDataURL(file);
	};

	render() {
		return (
			<div>
				<div className="messageForm">
					<div className=" md-form">
						<form>
							<div className="container">
								<div className="row">
									<div className="col col-9">
										<div className="input-container">
											<input
												autoComplete="off"
												value={this.state.messageText}
												onChange={
													this.handleInputChange
												}
												name="messageText"
												type="text"
												id="messagetext"
												className="form-control"
											/>
											<label htmlFor="messagetext">
												Melding
											</label>
										</div>
									</div>
									<div className="col">
										<button
											onClick={this.toggleModal}
											type="button"
											className="btn btn-primary px-3"
										>
											<i
												className="fa fa-camera"
												aria-hidden="true"
											/>
										</button>
									</div>
								</div>
								<div className="row text-center">
									<div className="col">
										<button
											onClick={this.sendTextMessage}
											type="submit"
											className="btn btn-primary no-margin-btm"
										>
											Send
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

				<ImageUploader
					modalIsOpen={this.state.modal}
					toggleModal={this.toggleModal}
					onSendPress={this.sendImageMessage}
					headerText="Last opp bilde"
					bodyText="Melding"
					s3path="chat/"
				/>
			</div>
		);
	}
}

export default MessageForm;
