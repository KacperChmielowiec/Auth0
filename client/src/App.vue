<template>
  <div id="app" class="d-flex flex-column h-100">
    <nav-bar />
    <div class="container flex-grow-1">
      <div class="mt-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "./components/NavBar.vue";


export default {
  components: {
    NavBar
  }
};
</script>
