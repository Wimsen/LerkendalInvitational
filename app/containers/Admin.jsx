import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {adminAuthenticate, isAdminAuthenticated} from '../auth/adminAuth';
import {logOut} from '../auth/userAuth';
import {resetTournament} from '../service/admin';

import LoadingSpinner from '../components/LoadingSpinner';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            resetLoading: false
        };
    }

    resetTournament = async () => {
        let confirm = window.confirm("Du er nå i ferd med å slette all eksisterende turneringsinformasjon. ALT vil bli borte. Er du HELT sikker på at du vil dette? ");
        if(confirm) {
            let confirm2 = window.confirm("Er du HELT sikker? Det er INGEN vei tilbake!");
            if(confirm2) {
                this.setState({
                    resetLoading: true
                });
                let result = await resetTournament();
                logOut();
                this.props.history.push('/login');
                this.setState({
                    resetLoading: false
                });
            }
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({loading: true});

        console.log(this.state);

        try {
            let response = await adminAuthenticate(this.state.username, this.state.password);
            // this.props.history.push('/teams');
        } catch (e) {
            console.log(e);
            // TODO error handling
            // if (e.message) {
            //     this.form.showError('password', (value) => <Error bugView={true} error={e.message}/>);
            // }
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <div>
                {
                    isAdminAuthenticated() ?
                    <div>
                        <h3>Turneringsadministrasjon</h3>
                        <div className="row">
                            <div className="col">
                                Sletter all eksisterende turneringsinformasjon - lag, chat, kamper osv.
                                Henter så nyeste informasjon fra Drive og setter opp ny turnering med kamper mm.
                                {
                                    this.state.resetLoading ? <LoadingSpinner />
                                    :
                                    <button onClick={this.resetTournament} type="button" className="btn btn-danger">Tilbakestill turnering</button>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Logg inn som admin</h2>
                        <input onChange={this.handleInputChange} type="text" className="form-control" name="username" placeholder="Email Address" />
                        <input onChange={this.handleInputChange} type="password" className="form-control" name="password" placeholder="Password" />

                        {
                            this.state.loading ? <LoadingSpinner /> :
                            <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>Logg inn</button>
                        }
                    </form>
                }
            </div>
        );
    }
}

export default withRouter(Header);
