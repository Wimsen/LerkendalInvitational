import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/lib/fa/';

import {getTeam, getTeams} from '../service/team';
import {getMatchesByTeamId} from '../service/match';

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
        await this.getData();
    }

    getData = async () => {
        this.setState({
            loading: true
        });

        let teamId = this.props.match.params.id;
        let [team, teams, matches] = await Promise.all([getTeam(teamId), getTeams(), getMatchesByTeamId(teamId)]);

        matches.sort((match1, match2) => {
            return new Date(match1.start_time) - new Date(match2.start_time);
        })

        let upcomingMatches = matches.filter(match => {
            return match.winner_id == null;
        });

        let finishedMatches = matches.filter(match => {
            return match.winner_id != null;
        });

        this.setState({
            team: team,
            teams: teams,
            finishedMatches: finishedMatches,
            upcomingMatches: upcomingMatches,
            loading: false
        });
    };

    getTeam = (teamId) => {
        return this.state.teams.filter(team => team.id == teamId)[0];
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
                            <h3>{this.state.team.teamname}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col center-text">
                            <h5>{this.state.team.points} poeng</h5>
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
                    <div className="listContainer">
                        <h4>Kommende kamper</h4>
                        {
                            this.state.upcomingMatches.map((match, index) =>
                                <MatchListItem
                                    onRegisterComplete={this.getData}
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
                            this.state.finishedMatches.map((match, index) =>
                                <MatchListItem
                                    onRegisterComplete={this.getData}
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

export default withRouter(TeamDetails);
