<script setup>
import { RouterLink, RouterView } from "vue-router";
import MainFooter from "./components/layout/MainFooter.vue";
import MainHeader from "./components/layout/MainHeader.vue";
import PublishRental from "./components/PublishRental.vue";
import Cartview from "./views/renter/Cartview.vue";
</script>

<template>
  <!-- <RouterLink>RouterLink</RouterLink> -->
  <MainHeader />
  <RouterView />

  <PublishRental />

  <!-- ligger under "kundvagn" i headern men länkningen fungerar inte så lägger "Cartview" här sålänge -->
  <Cartview />
  <!-- <RentalItem /> -->
  <!-- denna ska inte ligga här men bara för att se vad man jobbar med -->
  <MainFooter />
</template>

<style></style>
