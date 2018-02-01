import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


class TeamListItem extends Component {

    render() {

        let linkPath = `/teams/${this.props.team.id}`;
        return (<Link to={linkPath}>
            <div className="row">
                <div className="col">
                    {this.props.team.name}
                </div>
            </div>
        </Link>);
    }
}

export default withRouter(TeamListItem);
