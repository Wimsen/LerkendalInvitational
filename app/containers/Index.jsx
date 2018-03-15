import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Index extends Component {
	render() {
		return (
			<div>
				Hey ho
				<h2>Hallo</h2>
			</div>
		);
	}
}

export default withRouter(Index);
