import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { getTeams } from '../service/team';
import { getMatches } from '../service/match';

import TeamListItem from '../components/Teams/TeamListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import MatchListItem from '../components/TeamDetails/MatchListItem';
import Search from '../components/Search';

class Matches extends Component {
	constructor(props) {
		super(props);

		this.state = {
			matches: [],
			filteredMatches: [],
			loading: false,
			upcomingCollapsed: false,
			finishedCollapsed: false,
			filterText: ''
		};
	}

	async componentWillMount() {
		await this.getData();
	}

	toggleUpcomingCollapsed = () => {
		this.setState({
			upcomingCollapsed: !this.state.upcomingCollapsed
		});
	};

	toggleFinishedCollapsed = () => {
		this.setState({
			finishedCollapsed: !this.state.finishedCollapsed
		});
	};

	getData = async () => {
		this.setState({
			loading: true
		});

		let [teams, matches] = await Promise.all([getTeams(), getMatches()]);

		this.setState(
			{
				teams: teams,
				matches: matches,
				loading: false
			},
			() => {
				this.filterMatches(this.state.filterText);
			}
		);
	};

	getTeam = teamId => {
		return this.state.teams.filter(team => team.id == teamId)[0];
	};

	handleFilterChange = event => {
		const target = event.target;
		const value = target.value;
		this.setState({ filterText: value }, () => {
			this.filterMatches(this.state.filterText);
		});
	};

	filterMatches = filterText => {
		let filteredMatches = this.state.matches.filter(match => {
			let homeTeamName = this.getTeam(match.team1_id).teamname;
			let awayTeamName = this.getTeam(match.team2_id).teamname;
			return (
				homeTeamName.toLowerCase().includes(filterText.toLowerCase()) ||
				awayTeamName.toLowerCase().includes(filterText.toLowerCase())
			);
		});

		this.setState({
			filteredMatches: filteredMatches
		});
	};

	render() {
		let upcomingMatches = this.state.filteredMatches.filter(match => {
			return match.winner_id == null;
		});

		let finishedMatches = this.state.filteredMatches.filter(match => {
			return match.winner_id != null;
		});

		return (
			<div>
				<div className="row">
					<div className="col">
						<h2>Kampoversikt</h2>
					</div>
				</div>

				<Search handleFilterChange={this.handleFilterChange} />

				{this.state.loading ? (
					<LoadingSpinner />
				) : (
					<div>
						<div className="listContainer">
							<h4
								onClick={this.toggleUpcomingCollapsed}
								data-toggle="collapse"
								href="#upcomingMatches"
								aria-expanded="false"
								aria-controls="upcomingMatches"
							>
								Kommende kamper
								{this.state.upcomingCollapsed ? (
									<i className="float-right fa fa-angle-down rotate-icon" />
								) : (
									<i className="float-right fa fa-angle-up rotate-icon" />
								)}
							</h4>
							<div id="upcomingMatches">
								{upcomingMatches.map((match, index) => (
									<MatchListItem
										onRegisterComplete={this.getData}
										key={index}
										{...match}
										homeTeamName={
											this.getTeam(match.team1_id)
												.teamname
										}
										awayTeamName={
											this.getTeam(match.team2_id)
												.teamname
										}
									/>
								))}
							</div>
						</div>

						<div className="listContainer">
							<h4
								onClick={this.toggleFinishedCollapsed}
								data-toggle="collapse"
								href="#finishedMatches"
								aria-expanded="false"
								aria-controls="finishedMatches"
							>
								Spilte kamper
								{this.state.finishedCollapsed ? (
									<i className="float-right fa fa-angle-down rotate-icon" />
								) : (
									<i className="float-right fa fa-angle-up rotate-icon" />
								)}
							</h4>
							<div id="finishedMatches">
								{finishedMatches.map((match, index) => (
									<MatchListItem
										onRegisterComplete={this.getData}
										key={index}
										{...match}
										homeTeamName={
											this.getTeam(match.team1_id)
												.teamname
										}
										awayTeamName={
											this.getTeam(match.team2_id)
												.teamname
										}
									/>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default withRouter(Matches);
