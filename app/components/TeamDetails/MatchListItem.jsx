import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {formatDateToTime} from '../../utils';

class MatchListItem extends Component {

    render() {
        let homeTeamClassName = "col";
        let awayTeamClassName = "col";
        if (this.props.winner) {
            homeTeamClassName = "col";
            awayTeamClassName = "col bold-text";
            if (this.props.winner == this.props.homeTeam) {
                homeTeamClassName = "col bold-text";
                awayTeamClassName = "col ";
            }
        }
        
        return (
            <div>
                <div className="row ">
                    <div className={homeTeamClassName}>
                        {this.props.homeTeamName}
                    </div>
                    -
                    <div className={awayTeamClassName}>
                        {this.props.awayTeamName}
                    </div>
                    <div className="col">
                        {formatDateToTime(this.props.timestamp)}
                    </div>

                    <div className="col">
                        Bord {this.props.table}
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default withRouter(MatchListItem);
