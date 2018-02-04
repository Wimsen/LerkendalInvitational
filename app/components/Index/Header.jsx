import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {isAuthenticated, logOut} from '../../auth';

class Header extends Component {

    handleLogout = () => {
        logOut();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-blue">
                    <div className="navbar-brand"><strong>Lerkendal Invitational</strong></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/teams">Lag</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/matches">Kamper</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/groups">Grupper</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/chat">Chat</Link>
                            </li>

                            {
                                isAuthenticated() ?
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.handleLogout}>Logg ut</div>
                                </li>
                                :
                                <div>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Logg inn</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);
