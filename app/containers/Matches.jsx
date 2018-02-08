import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

import TeamListItem from '../components/Teams/TeamListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchListItem from '../components/TeamDetails/MatchListItem';

import Search from '../components/Search';

import {getTeams, getMatches} from '../db';

class Matches extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            filteredMatches: [],
            loading: false
        }
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });

        let [teams, matches] = await Promise.all([getTeams(), getMatches()]);

        matches.sort((match1, match2) => {
            let dateDiff = new Date(match1.start_time) - new Date(match2.start_time);
            if(dateDiff == 0){
                return match1.table_number > match2.table_number;
            }
            return dateDiff;
        })

        this.setState({
            teams: teams,
            matches: matches,
            filteredMatches: matches,
            loading: false
        });
    }

    getTeam = (teamId) => {
        return this.state.teams.filter(team => team.id == teamId)[0];
    }

    filterMatches = (filter) => {
        let filteredMatches = this.state.matches.filter(match => {
            let homeTeamName = this.getTeam(match.team1_id).teamname;
            let awayTeamName = this.getTeam(match.team2_id).teamname;
            return (
                homeTeamName.toLowerCase().includes(filter.target.value.toLowerCase())
                || awayTeamName.toLowerCase().includes(filter.target.value.toLowerCase())
            );
        });

        this.setState({
            filteredMatches: filteredMatches
        });
    }

    render() {
        let upcomingMatches = this.state.filteredMatches.filter(match => {
            return match.winner == null;
        });

        let finishedMatches = this.state.filteredMatches.filter(match => {
            return match.winner != null;
        });

        return (<div>
            {
                this.state.loading ?
                <LoadingSpinner/>
                : <div>
                	<div className="row">
                        <div className="col">
                    		<h2>Kampoversikt</h2>
                        </div>
                	</div>

                    <Search filterMethod={this.filterMatches} />

                    <div className="listContainer">
                        <h4>Kommende kamper</h4>
                        {
                            upcomingMatches.map((match, index) =>
                                <MatchListItem
                                    key={index}
                                    {...match}
                                    homeTeamName={this.getTeam(match.team1_id).teamname}
                                    awayTeamName={this.getTeam(match.team2_id).teamname}
                                />
                            )
                        }
                    </div>

                    <div className="listContainer">
                        <h4>Spilte kamper</h4>
                        {
                            finishedMatches.map((match, index) =>
                                <MatchListItem
                                    key={index}
                                    {...match}
                                    homeTeamName={this.getTeam(match.team1_id).teamname}
                                    awayTeamName={this.getTeam(match.team2_id).teamname}
                                />
                            )
                        }
                    </div>
                </div>
            }
        </div>);
    }
}

export default withRouter(Matches);
