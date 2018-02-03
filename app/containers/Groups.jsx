import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {FaSearch} from 'react-icons/lib/fa/';

import GroupListItem from '../components/Groups/GroupListItem';
import LoadingSpinner from '../components/LoadingSpinner';

import {getGroups} from '../db-mock';

class Groups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            loading: false
        }
    }

    async componentWillMount() {
        this.setState({
            loading: true
        });
        let groups = await getGroups();
        this.setState({
            groups: groups,
            loading: false
        });
    }

    render() {
        let groupIndices = Object.keys(this.state.groups);
        return (<div>
            {
                this.state.loading ?
                <LoadingSpinner/>
                : <div>
                	<div className="row">
                        <div className="col-md-6">
                            <i className="fas fa-search"></i>
                    		<h2>Gruppeoversikt</h2>
                        </div>
                	</div>
                    <div className="row">
                    </div>
                    {
                        groupIndices.map(groupIndex =>
                            <GroupListItem key={groupIndex} groupId={groupIndex} teams={this.state.groups[groupIndex]} />
                        )
                    }
                </div>
            }
        </div>);
    }
}

export default withRouter(Groups);
