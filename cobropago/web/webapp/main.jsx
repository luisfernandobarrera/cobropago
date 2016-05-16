import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './components/app';
import About from './components/about';
import Login from './components/login';
import Index from './components/index';

export let router = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.getElementById('react-app'));