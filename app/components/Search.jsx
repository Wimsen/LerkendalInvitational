import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Search extends Component {
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="form-inline md-form form-sm">
                        <input onChange={this.props.filterMethod} className="form-control" type="text" placeholder="Søk" aria-label="Søk"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Search);
