import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import TeamListItem from '../components/Teams/TeamListItem';
import LoadingSpinner from '../components/LoadingSpinner';

import {getTeams} from '../db-mock';

class Teams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            loading: false
        }
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });
        let teams = await getTeams();
        this.setState({
            teams: teams,
            loading: false
        });
    }

    render() {
        let teamsrows = [];

        for (let team of this.state.teams) {
            teamsrows.push(<div key={team.name}>{team.name}</div>)
        }
        return (<div>
            {
                this.state.loading ?
                <LoadingSpinner/>
                : this.state.teams.map(team =>
                    <TeamListItem key={team.id} team={team} />
                )
            }
        </div>);
    }
}

export default withRouter(Teams);
