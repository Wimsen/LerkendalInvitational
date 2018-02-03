import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

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
                        <div className="col-md-6">
                            <i className="fas fa-search"></i>
                    		<h2>Lagoversikt</h2>
                            <div id="custom-search-input">
                                <div className="input-group">
                                    <input onChange={this.filterTeams} type="text" className="form-control input-lg" placeholder="Søk etter lag" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-info btn-lg" type="button">
                                            <FaSearch />
                                        </button>

                                    </span>
                                </div>
                            </div>
                        </div>
                	</div>
                    <TeamList teams={this.state.filteredTeams} />
                </div>
            }
        </div>);
    }
}

export default withRouter(Teams);
