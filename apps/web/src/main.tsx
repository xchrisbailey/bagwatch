import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { CssBaseline } from '@material-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Landing} exact={true} />
          <Route path="/dashboard" component={Dashboard} exact={true} />
        </Switch>
        <CssBaseline />
      </BrowserRouter>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
