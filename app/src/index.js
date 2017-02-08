// src/index.js
import 'styles/foundation.scss'
import 'styles/index.scss'
import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import Ledgers from './components/Ledgers.vue';
// import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.use(VueRouter);

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
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

Vue.http.headers.common['X-CSRFToken'] = getCookie('csrftoken');


// Start the app on the #app div
router.start(App, '#app');
