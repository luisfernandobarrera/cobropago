import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'


import App from './app';
import About from './components/about';
import Login from './components/login';
import Index from './components/index';

let routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('react-app'));