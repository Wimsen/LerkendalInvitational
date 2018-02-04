import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

import TeamListItem from '../components/Teams/TeamListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchListItem from '../components/TeamDetails/MatchListItem';

import Search from '../components/Search';

import {getTeams, getMatches} from '../db-mock';

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

        this.setState({
            teams: teams,
            matches: matches,
            filteredMatches: matches,
            loading: false
        });
    }

    filterMatches = (filter) => {
        let filteredMatches = this.state.matches.filter(match => {
            let homeTeamName = this.state.teams[match.homeTeam].name;
            let awayTeamName = this.state.teams[match.awayTeam].name;
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
                                    homeTeamName={this.state.teams[match.homeTeam].name}
                                    awayTeamName={this.state.teams[match.awayTeam].name}
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
                                    homeTeamName={this.state.teams[match.homeTeam].name}
                                    awayTeamName={this.state.teams[match.awayTeam].name}
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
