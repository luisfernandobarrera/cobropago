// src/index.js
import './styles/foundation.scss';
import './styles/index.scss';
import { foundation } from 'foundation-sites/js/foundation.core';
import 'foundation-sites/js/foundation.util.mediaQuery';
import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Ledgers from './components/Ledgers.vue';
import axios from 'axios';
// import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
//import VueResource from 'vue-resource';
//Vue.use(VueResource);
Vue.use(VueRouter);

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';

export let Axios = axios;
export let router = new VueRouter();

// Set up routing and match routes to components
router.map({
  '/home': {
    component: Home
  },
  '/ledgers': {
    component: Ledgers
  },
  '/login': {
    component: Login
  }
  // '/signup': {
  //  component: Signup
  //}
});

// Redirect to the home route if any routes are unmatched
router.redirect({
  '*': '/home'
});

import auth from './auth'

// Check the users auth status when the app starts
auth.checkAuth();


function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}



// Start the app on the #app div
router.start(App, '#app');

$.fn.foundation = foundation;

$(document).ready(function($){
  $(document).foundation();
});

