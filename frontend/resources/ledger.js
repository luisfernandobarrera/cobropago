import {createResource, defaultHeaders} from 'redux-rest-resource';
import {apiHome} from './index'

let token = localStorage.getItem('token');

if (!!token) {
  Object.assign(defaultHeaders, {Authorization: `Token ${token}`});
}


export const {types, actions, reducers} = createResource({
  name: 'ledger',
  url: `${apiHome}/ledgers/:id`,
});
