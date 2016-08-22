import {combineReducers} from 'redux';
import {reducers as ledgerReducer} from './resources/ledger'

export default combineReducers({
    ledgers: ledgerReducer
});
