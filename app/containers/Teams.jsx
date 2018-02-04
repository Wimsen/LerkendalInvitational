import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

import Search from '../components/Search'; 
import TeamList from '../components/Teams/TeamList';
import LoadingSpinner from '../components/LoadingSpinner';

import {getTeams} from '../db-mock';

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
        this.setState({
            teams: teams,
            filteredTeams: teams,
            loading: false
        });
    }

    filterTeams = (filter) => {
        let filteredTeams = this.state.teams.filter(team => {
            return team.name.toLowerCase().includes(filter.target.value.toLowerCase());
        });

        this.setState({
            filteredTeams: filteredTeams
        });
    }

    render() {
        return (<div>
            {
                this.state.loading ?
                <LoadingSpinner/>
                : <div>
                	<div className="row">
                        <div className="col">
                    		<h2>Lagoversikt</h2>
                        </div>
                	</div>
                    <Search filterMethod={this.filterTeams} />
                    <TeamList teams={this.state.filteredTeams} />
                </div>
            }
        </div>);
    }
}

export default withRouter(Teams);
