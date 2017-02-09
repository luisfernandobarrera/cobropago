// src/auth/index.js

import {router, Axios} from '../index'

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
  login(creds, redirect) {
    Axios.post(LOGIN_URL, creds).then((data) => {
      localStorage.setItem('token', data.token);

      this.checkAuth();

      // Redirect to a specified route
      if (redirect) {
        router.go(redirect)
      }
    }).catch((err) => {
      Axios.error = err
    })
  },

  // signup(creds, redirect) {
  //   context.$http.post(SIGNUP_URL, creds, (data) => {
  //     localStorage.setItem('token', data.token);
  //     this.user.authenticated = true;
  //     if(redirect) {
  //       router.go(redirect)
  //     }
  //   }).error((err) => {
  //     context.error = err
  //   })
  // },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token');
    this.user.authenticated = false
  },

  checkAuth() {
    let token = localStorage.getItem('token');

    if (!!token) {
      Axios.get(ME_URL).then((data) => {
        this.user.name = data.username;
        this.user.id = data.id;
        this.user.authenticated = true;
      }).catch((err) => {
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
