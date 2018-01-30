import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Index extends Component {
    render( ) {
        return (
            <div>
                <h1>Lerkendal Invitational</h1>
                Hey ho
            </div>
        );
    }
}

export default withRouter(Index);
