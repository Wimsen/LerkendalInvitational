import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from './containers/Login';
import Layout from './containers/Layout';
import Transfer from './containers/Transfer';
import Payment from './containers/Payment';
import Register from './containers/Register';
import RegisterStand from './containers/RegisterStand';
import RegisterInterview from './containers/RegisterInterview';
import AccountOverview from './containers/AccountOverview';
import AccountDetails from './containers/AccountDetails';
import LoginTest from './containers/LoginTest';
import DefaultSite from '../common/components/DefaultSite';
import SuccessfulTransfer from './containers/SuccessfulTransfer';
import '../common/components/Validators';

ReactDOM.render((

    <Router history={createBrowserHistory()}>
        <div>

            <Layout>
                <Route exact path="/" component={ AccountOverview } />
                <Route path="/konto_detaljer/:id" component={ AccountDetails } />
                <Route path="/registrer" component={ Register } />
                <Route path="/registrerinterview" component={ RegisterInterview } />
                <Route path="/registrerstand" component={ RegisterStand } />
                <Route path="/logg_inn" component={ Login } />
                <Route path="/logintest" component={ LoginTest } />
                <Route path="/overfore" component={ Transfer } />
                <Route path="/betale" component={ Payment } />
                <Route path="/default" component={ DefaultSite } />
                <Route path="/overforing_vellykket" component= {SuccessfulTransfer } />
            </Layout>

        </div>
    </Router>

), document.getElementById( 'root' ));
