<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MainFooter from './components/layout/MainFooter.vue';
import MainHeader from './components/layout/MainHeader.vue';
import RentalItem from './components/RentalItem.vue';
import PublishRental from './components/PublishRental.vue';
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
  <PublishRental/>
  <RentalItem/> <!-- denna ska inte ligga här men bara för att se vad man jobbar med -->
  <MainFooter/>
</template>

<style scoped>

</style>
