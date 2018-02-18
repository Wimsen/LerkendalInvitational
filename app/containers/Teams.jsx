import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

import Search from '../components/Search';
import TeamList from '../components/Teams/TeamList';
import LoadingSpinner from '../components/LoadingSpinner';
import {NotificationManager} from 'react-notifications';

import {getTeams} from '../service/team';


class Teams extends Component {

    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            filteredTeams: [],
            loading: false
        }
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });
        let teams = await getTeams();
        teams.sort((team1, team2) => {
            return team1.teamname.localeCompare(team2.teamname);
        });
        this.setState({
            teams: teams,
            filteredTeams: teams,
            loading: false
        });
    }

    filterTeams = (filter) => {
        let filteredTeams = this.state.teams.filter(team => {
            return team.teamname.toLowerCase().includes(filter.target.value.toLowerCase());
        });

        this.setState({
            filteredTeams: filteredTeams
        });
    }

    render() {
        return (<div>

                	<div className="row">
                        <div className="col">
                    		<h2>Lagoversikt</h2>
                        </div>
                	</div>
                    {
                        this.state.loading ?
                        <LoadingSpinner/>
                        :
                        <div>
                            <Search filterMethod={this.filterTeams} />
                            <TeamList teams={this.state.filteredTeams} />
                        </div>
                    }
        </div>);
    }
}

export default withRouter(Teams);
