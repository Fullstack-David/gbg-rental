<script setup>
import { RouterView } from "vue-router";
import MainFooter from "./components/layout/MainFooter.vue";
import MainHeader from "./components/layout/MainHeader.vue";
</script>

<template>
  <div class="app-container">
    <MainHeader />
    <div class="main-container">
      <RouterView />
    </div>
    <MainFooter />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
