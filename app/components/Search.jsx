import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Search extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="form-inline md-form form-sm">
                        <input name="filterText" onChange={this.props.handleFilterChange} className="form-control" type="text" placeholder="Søk" aria-label="Søk"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
