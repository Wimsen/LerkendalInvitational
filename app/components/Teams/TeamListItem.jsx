import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class TeamListItem extends Component {
	render() {
		let linkPath = `/teams/${this.props.team.id}`;
		return (
			<Link to={linkPath}>
				<div className="row teamListItem">
					<div className="col">{this.props.team.teamname}</div>
					<div className="col">{this.props.team.points}</div>
				</div>
				<hr />
			</Link>
		);
	}
}

export default withRouter(TeamListItem);
