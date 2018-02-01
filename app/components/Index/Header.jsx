import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Header extends Component {
    render() {
        return (<div>
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">

                Lerkendal Invitational {/* <img className="header-img" src={require('../../img/bp_right.png')}/> */}
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {/* <a className="nav-link" href="#">Link</a> */}
                            <Link className="nav-link" to="/">Hjem</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/teams">Lag</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/chat">Chat</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Logg inn</Link>
                        </li>
                        <li className="nav-item"></li>
                    </ul>

                </div>
            </nav>
        </div>);
    }
}

export default withRouter(Header);
