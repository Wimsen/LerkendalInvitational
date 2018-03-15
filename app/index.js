import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './containers/Layout';
import Index from './containers/Index';
import Teams from './containers/Teams';
import TeamDetails from './containers/Teamdetails';
import Login from './containers/Login';
import Chat from './containers/Chat';
import Register from './containers/Register';
import Matches from './containers/Matches';
import Groups from './containers/Groups';
import Vote from './containers/Vote';
import Admin from './containers/Admin';
import { Navbar } from 'mdbreact';
import Rules from './containers/Rules';

import { NotificationContainer } from 'react-notifications';
import 'jquery';
import 'popper.js';
import 'node-waves';

ReactDOM.render(
	<Router history={createBrowserHistory()}>
		<div>
			<Layout>
				<Route exact path="/" component={Teams} />
				<Route exact path="/teams" component={Teams} />
				<Route path="/teams/:id" component={TeamDetails} />
				<Route path="/login" component={Login} />
				<Route path="/chat" component={Chat} />
				<Route path="/register" component={Register} />
				<Route path="/matches" component={Matches} />
				<Route path="/groups" component={Groups} />
				<Route path="/vote" component={Vote} />
				<Route path="/admin" component={Admin} />
				<Route path="/rules" component={Rules} />

				<NotificationContainer />
			</Layout>
		</div>
	</Router>,
	document.getElementById('root')
);
