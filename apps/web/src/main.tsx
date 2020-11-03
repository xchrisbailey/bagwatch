import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { CssBaseline } from '@material-ui/core';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';

const queryCache = new QueryCache();

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ReactQueryCacheProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
