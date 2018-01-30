import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './containers/Layout'
import Index from './containers/Index';



ReactDOM.render((<Router history={createBrowserHistory()}>
  <div>

    <Layout>
      <Route exact={true} path="/" component={Index}/>
    </Layout>

  </div>
</Router>), document.getElementById('root'));
