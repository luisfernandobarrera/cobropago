<!-- src/components/App.vue -->

<template>
  <Topbar></Topbar>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
  import Topbar from './Topbar.vue'
  export default {
      components: {
          Topbar
      },
  }
</script>

