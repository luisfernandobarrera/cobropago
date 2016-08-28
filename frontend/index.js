import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {combinedReducers} from './store';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import App from './app';
import Login from './components/login';
import {Dashboard} from './components/dashboard';
import HelloWorld from './components/helloworld';


// const middleware = routerMiddleware(hashHistory);
const store = createStore(combinedReducers, applyMiddleware(thunk));
const history = syncHistoryWithStore(hashHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={HelloWorld}/>
        <Route path="dashboard" component={Dashboard}/>
      </Route>
      <Route path="/login" component={Login}/>
    </Router>
  </Provider>,
  document.getElementById('react-app')
);
