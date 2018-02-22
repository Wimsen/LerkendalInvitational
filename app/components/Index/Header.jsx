import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {isAuthenticated, logOut, isAdminAuthenticated} from '../../auth/userAuth';

class Header extends Component {

    constructor(props){
        super(props);

        this.props.history.listen((location) => {
            if (!this.navbtn.className.includes("collapsed")) this.navbtn.click();
        });
    }

    handleLogout = () => {
        logOut();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-blue scrolling-navbar">
                    <div className="navbar-brand"><strong>Lerkendal Invitational</strong></div> 
                    <button ref={(navbtn) => this.navbtn = navbtn} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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

                            <li className="nav-item">
                                <Link className="nav-link" to="/vote">Kostyme</Link>
                            </li>

                            {
                                isAuthenticated() ?
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.handleLogout}>Logg ut</div>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Logg inn</Link>
                                </li>
                            }

                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default withRouter(Header);
