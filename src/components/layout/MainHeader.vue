<script setup>
import { RouterLink } from "vue-router";
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
    <RouterLink to="/dashboard">
      <div class="dashboard-link">
        <h1 class="">GBG Rentals</h1>
        <p>(dashboard)</p>
      </div>
    </RouterLink>
    <nav class="header-nav">
      <RouterLink to="/login">Logga in</RouterLink>
      <RouterLink to="/register">Registrera</RouterLink>

      <!-- fungerar inte just nu vet egentligen inte varför, renderar Cartvire.vue i App.vue sålänge -->
      <RouterLink to="/dashboard/kundvagn">Kundvagn</RouterLink>
    </nav>
  </header>
</template>
<style scoped>
/* tillfällig (.dashbaord-link) */
.dashboard-link {
  color: #fff;
  text-decoration: none;
}

.logo-container {
  display: flex;
}

header {
  background-color: black;
  color: #fff;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header img {
  height: 100px;
  width: 100px;
  border-radius: 10%;
}

header h1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

header .header-nav {
  display: flex;
  flex-direction: start;
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
