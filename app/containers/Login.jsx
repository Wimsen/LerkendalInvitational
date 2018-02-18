import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import {authenticate} from '../auth/userAuth';

import {NotificationManager} from 'react-notifications';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this._isMounted = false;
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({loading: true});

        console.log(this.state);

        try {
            let response = await authenticate(this.state.username, this.state.password);
            NotificationManager.success('Vellykket');
            this.props.history.push('/teams');
        } catch (e) {
            // TODO error handling
            // if (e.message) {
            //     this.form.showError('password', (value) => <Error bugView={true} error={e.message}/>);
            // }
        }
        this.setState({loading: false});
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    render() {
        return (
            <form className="form-signin">
                <h2 className="form-signin-heading">Logg inn</h2>
                <input onChange={this.handleInputChange} type="text" className="form-control" name="username" placeholder="Email Address" />
                <input onChange={this.handleInputChange} type="password" className="form-control" name="password" placeholder="Password" />

                {
                    this.state.loading ? <LoadingSpinner /> :
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>Logg inn</button>
                }
            </form>
        );
    }
}

export default withRouter( Login );
