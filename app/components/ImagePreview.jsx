import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class ImagePreview extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				toggle={this.props.toggleModal}
			>
				<ModalBody>
					<img src={this.props.imageUrl} />
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={this.props.toggleModal}>
						Lukk
					</Button>{' '}
				</ModalFooter>
			</Modal>
		);
	}
}

export default ImagePreview;
