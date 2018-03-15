import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import LoadingSpinner from './LoadingSpinner';
import ReactS3Uploader from 'react-s3-uploader';

class ImageUploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			imageText: '',
			imagePreviewUrl: '',
			s3key: ''
		};
	}

	handleInputChange = event => {
		const target = event.target;
		const value =
			target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({ [name]: value });
	};

	onUploadStart = (file, next) => {
		this.setState({
			uploading: true
		});
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
		this.setState({
			s3key: data.fileKey,
			uploading: false
		});
	};

	resetState = () => {
		this.setState({
			imageText: '',
			imagePreviewUrl: '',
			s3key: '',
			loading: false
		});
	};

	uploadImage = async () => {
		this.setState({
			loading: true
		});
		await this.props.onSendPress({
			imageText: this.state.imageText,
			s3key: this.state.s3key
		});
		this.resetState();
		this.props.toggleModal();
	};

	render() {
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				toggle={this.props.toggleModal}
			>
				<ModalHeader toggle={this.props.toggleModal}>
					{this.props.headerText}
				</ModalHeader>
				<ModalBody>
					{this.props.bodyText}
					<input
						value={this.state.imageText}
						onChange={this.handleInputChange}
						name="imageText"
						type="text"
						placeholder="Enter your message..."
					/>
					<ReactS3Uploader
						signingUrl="/s3/sign"
						signingUrlMethod="GET"
						accept="image/*"
						s3path={this.props.s3path}
						preprocess={this.onUploadStart}
						onFinish={this.onUploadFinish}
						signingUrlWithCredentials={true}
						signingUrlHeaders={{
							auth: `Bearer: ${localStorage.getItem('id_token')}`
						}}
						uploadRequestHeaders={{
							'x-amz-acl': 'public-read'
						}}
						contentDisposition="auto"
						scrubFilename={filename =>
							filename.replace(/[^\w\d_\-.]+/gi, '')
						}
						autoUpload={true}
					/>
					{this.state.imagePreviewUrl != '' && (
						<img src={this.state.imagePreviewUrl} />
					)}
				</ModalBody>
				{this.state.loading || this.state.uploading ? (
					<LoadingSpinner />
				) : (
					<ModalFooter>
						<Button
							color="secondary"
							onClick={this.props.toggleModal}
						>
							Avbryt
						</Button>{' '}
						<Button color="primary" onClick={this.uploadImage}>
							Send
						</Button>
					</ModalFooter>
				)}
			</Modal>
		);
	}
}

export default ImageUploader;
