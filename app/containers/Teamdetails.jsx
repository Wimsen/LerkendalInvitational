import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';

import {getTeam} from '../db-mock';

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
        let team = await getTeam(teamId);

        this.setState({
            team: team,
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
                </div>
            }
        </div>);
    }
}

export default withRouter(TeamDetails);
