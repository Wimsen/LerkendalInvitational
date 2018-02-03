import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import TeamList from '../Teams/TeamList';

class GroupListItem extends Component {
    render() {
        let teams = this.props.teams.sort((teamA, teamB) => {
            return teamA.points < teamB.points;
        });

        return (<div>
            <h3>{`Gruppe ${this.props.groupId} `}</h3>            
            <TeamList teams={teams} />
        </div>);
    }
}

export default withRouter(GroupListItem);
