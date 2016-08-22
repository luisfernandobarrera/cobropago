import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './app';
import {Dashboard} from './components/dashboard';
import {HelloWorld} from './components/helloworld';


const store = createStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HelloWorld} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('react-app')
);
