import {Map} from 'immutable';
import {apiHome} from './index';
import 'whatwg-fetch';


const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const RESET_PASSWORD = 'RESET_PASSWORD';
const SET_TOKEN = 'SET_TOKEN';
const SET_CREDENTIALS = 'SET_CREDENTIALS';

let token = localStorage.getItem('token') || null;

let initialState = Map({
  username: '',
  password: '',
  loggedIn: !!token,
  token: token
});

export function resetPassword() {
  return {
    type: RESET_PASSWORD
  }
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token: token
  }
}


export function setCredentials(username, password) {
  return {
    type: SET_CREDENTIALS,
    username: username,
    password: password
  }
}

export function serverLogin(username, password) {
  return function (dispatch, getState) {
    let state = getState();
    let url = apiHome + 'api-token-auth/';
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);

    dispatch(setCredentials(username, password));

    return fetch(url, {
      method: "POST",
      body: data
    }).then(function (result) {
      dispatch(resetPassword());
      if (result.status === 200) {
        return result.json();
      } else {
        throw "Error logging in";
      }
    }).then(function (jsonResult) {
      let token = jsonResult.token;
      dispatch(setToken(token));
    }).catch(function (err) {
      alert('Couldn\'t set token');
    })

  }
}


export function logout() {
  return {
    type: LOGOUT
  }
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CREDENTIALS:
      return state.set('username', action.username).set('password', action.password);
    case RESET_PASSWORD:
      return state.set('password', '');
    case SET_TOKEN:
      localStorage.setItem('token', action.token);
      return state.set('token', action.token).set('loggedIn', true);
    case LOGOUT:
      localStorage.setItem('token', null);
      return state.set('token', null).set('loggedIn', false);
    default:
      return state;
  }
}


