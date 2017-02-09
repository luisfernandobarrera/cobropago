// src/auth/index.js

import {router} from '../index'

// URL and endpoint constants
const API_URL = '/api/v1/';
const LOGIN_URL = API_URL + 'api-token-auth/';
const SIGNUP_URL = API_URL + 'users/';
const ME_URL = API_URL + '/users/me';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
    name: '',
    id: ''
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      localStorage.setItem('token', data.token)

      this.checkAuth(context);

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

  checkAuth(context) {
    let token = localStorage.getItem('token');

    if (!!token) {
      context.$http.get(ME_URL, (data) => {
        this.user.name = data.username;
        this.user.id = data.id;
        this.user.authenticated = true;
      }).error((err) => {
        this.user.authenticated = false;
        this.user.id = '';
        this.user.name = '';
      });
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
