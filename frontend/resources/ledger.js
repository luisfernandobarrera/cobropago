import {createResource} from 'redux-rest-resource';
import {apiHome} from './index'

export const {types, actions, reducers} = createResource({
  name: 'ledger',
  url: `${apiHome}/ledgers/:id`
});
