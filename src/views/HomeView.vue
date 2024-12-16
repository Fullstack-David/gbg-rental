<script setup>
import { ref } from "vue";
import { authStore } from "@/stores/authStore";
import { userApi } from "@/services/userAPI";
import ItemsView from "./ItemsView.vue";

const store = authStore();
const user = ref([]);

if (store.isLoggedIn) {
  const userId = localStorage.getItem("user");

  async function getUserById(userId) {
    user.value = await userApi.fetchUserById(userId);
  }

  getUserById(userId);
}
</script>

<template>
  <main>
    <h2>
      Välkommen
      {{ store.isLoggedIn ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "" }}
      till din hyresprotal
    </h2>
    <ItemsView />
  </main>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 1rem;
}
</style>
