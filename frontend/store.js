import {combineReducers} from 'redux';
import {reducers as ledgerReducer} from './resources/ledger'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    ledgers: ledgerReducer,
    routing: routerReducer
});
