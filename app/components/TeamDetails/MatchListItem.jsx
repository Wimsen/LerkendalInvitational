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
                </div>
                {
                    this.props.winner ? ""
                    :
                    <div className="row">
                        <div className="col">
                            {formatDateToTime(new Date(this.props.start_time))}
                        </div>

                        <div className="col">
                            Bord {this.props.table_number + 1}
                        </div>
                    </div>
                }
                <hr/>
            </div>
        );
    }
}

export default withRouter(MatchListItem);
