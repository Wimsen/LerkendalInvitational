import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/lib/fa/';

import {getTeam, getMatchesByTeamId, getTeams} from '../db-mock';
import MatchListItem from '../components/TeamDetails/MatchListItem';
import LoadingSpinner from '../components/LoadingSpinner';

class TeamDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });

        let teamId = this.props.match.params.id;
        let [team, teams, matches] = await Promise.all([getTeam(teamId), getTeams(), getMatchesByTeamId(1)]);

        let upcomingMatches = matches.filter(match => {
            return match.winner == null;
        });

        let finishedMatches = matches.filter(match => {
            return match.winner != null;
        });

        this.setState({
            team: team,
            teams: teams,
            finishedMatches: finishedMatches,
            upcomingMatches: upcomingMatches,
            loading: false
        });
    }

    render() {
        return (<div>
            {
                this.state.loading ?
                <LoadingSpinner/>
                :
                <div>
                    <div onClick={this.props.history.goBack}>
                        <FaArrowLeft />
                    </div>
                    <div className="row">
                        <div className="col center-text">
                            <h3>{this.state.team.name}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col center-text">
                            {this.state.team.member1}
                        </div>
                        <div className="col center-text">
                            {this.state.team.member2}
                        </div>
                    </div>

                    <h4>Kommende kamper</h4>
                    {
                        this.state.upcomingMatches.map((match, index) =>
                            <MatchListItem
                                key={index}
                                {...match}
                                homeTeamName={this.state.teams[match.homeTeam].name}
                                awayTeamName={this.state.teams[match.awayTeam].name}
                            />
                        )
                    }

                    <h4>Spilte kamper</h4>
                    {
                        this.state.finishedMatches.map((match, index) =>
                            <MatchListItem
                                key={index}
                                {...match}
                                homeTeamName={this.state.teams[match.homeTeam].name}
                                awayTeamName={this.state.teams[match.awayTeam].name}
                            />
                        )
                    }
                </div>
            }
        </div>);
    }
}

export default withRouter(TeamDetails);
