import {combineReducers} from 'redux';
import {reducers as ledgerReducer} from './resources/ledger';
import {reducer as loginReducer} from './resources/login';
import {routerReducer} from 'react-router-redux';

export let combinedReducers = combineReducers({
  ledgers: ledgerReducer,
  login: loginReducer,
  routing: routerReducer
});
