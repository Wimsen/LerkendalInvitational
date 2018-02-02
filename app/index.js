import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './containers/Layout'
import Index from './containers/Index';
import Teams from './containers/Teams';
import TeamDetails from './containers/Teamdetails'
import Login from './containers/Login';
import Chat from './containers/Chat';
import Register from './containers/Register';

ReactDOM.render((<Router history={createBrowserHistory()}>
    <div>

        <Layout>
            <Route exact path="/" component={Index}/>
            <Route exact path="/teams" component={Teams}/>
            <Route path="/teams/:id" component={TeamDetails}/>
            <Route path="/login" component={Login} />
            <Route path="/chat" component={Chat} />
            <Route path="/register" component={Register} />
        </Layout>

    </div>
</Router>), document.getElementById('root'));
