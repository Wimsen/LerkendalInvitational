import fs from 'fs';
import stringify from 'csv-stringify';
import { getTeams, getMatches } from './db/team';

export async function writeTeams() {
	let data = await getTeams();
	data.sort((a, b) => {
		return a.group_number - b.group_number;
	});

	stringify(data, { header: true }, (err, output) => {
		fs.writeFile('./teams.csv', output, err => {
			if (err) {
				return console.log(err);
			} else {
				console.log('teams.csv written');
			}
		});
	});
}

export async function writeMatches() {
	let teamsDict = {};
	let teams = await getTeams();
	let matches = await getMatches();

	teams.map(team => {
		teamsDict[team.id] = team.teamname;
	});

	matches.map(match => {
		match.homeTeamName = teamsDict[match.team1_id];
		match.awayTeamName = teamsDict[match.team2_id];
	});

	matches.sort((match1, match2) => {
		let dateDiff =
			new Date(match1.start_time) - new Date(match2.start_time);
		if (dateDiff == 0) {
			return match1.table_number > match2.table_number;
		}
		return dateDiff;
	});

	stringify(matches, { header: true }, (err, output) => {
		fs.writeFile('./matches.csv', output, err => {
			if (err) {
				return console.log(err);
			} else {
				console.log('matches.csv written');
			}
		});
	});
}
