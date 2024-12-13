<script setup>
import { ref } from "vue";
import ItemsView from "./ItemsView.vue";
import { authStore } from "@/stores/authStore";
const store = authStore();
import { userApi } from "@/services/userAPI";

const user = ref([]);

if (store.isLoggedIn) {
  const userId = localStorage.getItem("user");

  async function getUserById(userId) {
    user.value = await userApi.fetchUserById(userId);
  }

  getUserById(userId);
}

// skapa en funktion där första bokstaven blir stor i userName
// .charAt(0).toUpperCase()
</script>

<template>
  <main>
    <h2>
      Välkommen
      {{ store.isLoggedIn ? user?.name : "" }}
      till din hyres protal
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
