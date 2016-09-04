import {defaultHeaders} from 'redux-rest-resource';


export const token = localStorage.getItem('token');
export const apiHome = 'http://localhost:8000/api/v1';
export const apiMe = apiHome + 'users/me';
Object.assign(defaultHeaders, {Authorization: `Token ${token}`});
