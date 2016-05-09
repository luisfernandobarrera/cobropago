import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'


import App from './app';
import About from './components/about';
import Login from './components/login';

let routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('react-app'));