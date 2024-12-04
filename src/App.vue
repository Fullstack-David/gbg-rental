<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainFooter from './components/layout/MainFooter.vue';
import MainHeader from './components/layout/MainHeader.vue';
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->
  <MainHeader/>

  <RouterView />
  <MainFooter/>
</template>

<style scoped>

</style>
