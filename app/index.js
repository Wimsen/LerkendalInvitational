import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Dashboard from './containers/Dashboard';

ReactDOM.render((

    <Router history={createBrowserHistory()}>
        <div>

            {/* <Layout> */}
                <Route path="/" component= {Dashboard } />
            {/* </Layout> */}

        </div>
    </Router>

), document.getElementById( 'root' ));
