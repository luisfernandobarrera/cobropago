// src/auth/index.js

import {router} from '../index'

// URL and endpoint constants
const API_URL = '/api/v1/';
const LOGIN_URL = API_URL + 'api-token-auth/';
const SIGNUP_URL = API_URL + 'users/';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('token', data.token)

      this.user.authenticated = true;

      // Redirect to a specified route
      if(redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('token', data.token);

      this.user.authenticated = true;

      if(redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false
  },

  checkAuth() {
    let token = localStorage.getItem('token');
    if (!!token) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    let token = localStorage.getItem('token');
    if (!!token)
      return {
        'Authorization': `Token ${token}`
      };
    else
      return {};
  }
}
