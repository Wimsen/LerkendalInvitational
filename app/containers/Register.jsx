import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import LoadingSpinner from '../components/LoadingSpinner';
import {authFetch} from '../auth/userAuth';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});

        console.log(this.state);

        let newUser = {
            username: this.state.username,
            password: this.state.password
        };

        try {
            let result = await authFetch('/api/register', {
                newUser: newUser
            });
            console.log(result);
            this.props.history.push('/login');
        } catch (e) {
            console.log(e);
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
                <h2 className="form-signin-heading">Registrer ny bruker</h2>
                <input onChange={this.handleInputChange} type="text" className="form-control" name="username" placeholder="Email Address" />
                <input onChange={this.handleInputChange} type="password" className="form-control" name="password" placeholder="Password" />

                {
                    this.state.loading ? <LoadingSpinner /> :
                    <button className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>Register</button>
                }
                </form>
        );
    }
}

export default withRouter( Register );
