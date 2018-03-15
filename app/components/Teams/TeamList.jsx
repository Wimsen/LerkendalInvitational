import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import TeamListItem from './TeamListItem';

class TeamList extends Component {
	render() {
		return (
			<div className="listContainer">
				<div className="row">
					<div className="col bold-text">Lag</div>

					<div className="col bold-text">Poeng</div>
				</div>

				{this.props.teams.map(team => (
					<TeamListItem key={team.id} team={team} />
				))}
			</div>
		);
	}
}

export default withRouter(TeamList);
