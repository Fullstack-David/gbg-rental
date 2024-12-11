<script setup>
import { RouterLink } from "vue-router";
import { useUsers } from "@/composables/useUser";
const { isLoggedIn } = useUsers();
// import { store } from "@/store/cart";

// const emit = defineEmits(['updateCartData']);

// const sendCartData = () => {
//   emit('updateCartData', store.cart.length);
// }
</script>

<template>
  <header class="header-content">
    <div class="logo-container">
      <RouterLink to="/">
        <img
          src="../../assets/icons/gbg-rentals-logo.png"
          alt="Logo"
          class="h-10 w-10 rounded-full"
        />
      </RouterLink>
    </div>
    <RouterLink class="no-link-style" to="/dashboard">
        <h1>GBG Rentals</h1>
    </RouterLink>
    <nav class="header-nav">
      <RouterLink v-if="isLoggedIn" to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/login">Logga in</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/dashboard/kundvagn">Kundvagn</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.logo-container {
  display: flex;
}

header {
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header img {
  height: 100px;
  width: 100px;
  border-radius: 10%;
}

.no-link-style{
  text-decoration: none;
  color: #fff;
}

header .header-nav {
  display: flex;
  flex-direction: start;
  flex-wrap: wrap;
  padding: 20px;
}

header nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

.logo-container {
  padding: 20px;
}

header nav a:hover {
  color: #f0a500;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: center;
  }

  .header-content h1 {
    font-size: 20px;
    /* Minska textstorlek */
    margin: 10px 0;
  }

  .header-nav {
    flex-direction: row;
    /* Placera länkar i en vertikal lista */
    gap: 10px;
  }

  .header-nav a {
    font-size: 16px;
    /* Anpassa länkstorleken */
  }
}
</style>
