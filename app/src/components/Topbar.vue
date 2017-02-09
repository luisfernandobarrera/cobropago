<template>
  <div class="top-bar">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li class="menu-text">Cobropago</li>
        <li><a v-link="'home'">Home</a></li>
        <li><a v-link="'login'" v-if="!user.authenticated">Login</a></li>
        <li><a v-link="'signup'" v-if="!user.authenticated">Sign Up</a></li>
        <li><a v-link="'ledgers'" v-if="user.authenticated">Ledgers</a></li>
        <li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Logout</a></li>
      </ul>

    </div>
  </div>
</template>

<script>
  import auth from '../auth'
  export default {
    data() {
      return {
        user: auth.user
      }
    },
    methods: {
      logout() {
        auth.logout()
      }
    }
  }
</script>
