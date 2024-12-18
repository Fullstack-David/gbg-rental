<script setup>
import { RouterLink } from "vue-router";
import DashboardView from "@/views/owner/DashboardView.vue";
import { useAuth } from "@/composables/useAuth";
const store = useAuth();
</script>

<template>
  <header class="header-content">
    <!-- Logo -->
    <div class="logo-container">
      <RouterLink to="/">
        <img
          src="../../assets/icons/gbg-rentals-logo.png"
          alt="Logo"
          class="h-10 w-10 rounded-full"
        />
      </RouterLink>
    </div>

    <!-- Titel -->
    <RouterLink class="no-link-style" to="/">
      <h1 class="no-link-style">GBG Rentals</h1>
    </RouterLink>
    <nav v-if="!store.isLoggedIn" class="header-nav">
      <RouterLink to="/login">Logga in</RouterLink>
    </nav>
    <nav v-else class="header-nav">
      <RouterLink @click="store.logOut" to="/login">Logga ut</RouterLink>
    </nav>
  </header>

  <!-- Dashboard visas endast när användaren är inloggad -->
  <DashboardView v-if="store.isLoggedIn" />
</template>

<style scoped>
.logo-container {
  display: flex;
}

header {
  background: #2f2f2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
}

header .logo-container img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

header .logo-container img:hover {
  transform: scale(1.1);
}

/* Titel */
header h1 {
  color: #f0f0f0;
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1px;
}

/* Navigation */
.header-nav {
  display: flex;
  align-items: center;
  gap: 15px;
}

.no-link-style {
  text-decoration: none;
}

.header-nav a {
  background-color: #ff7b00;
  color: white;
  padding: 8px 15px;
  border-radius: 6px;
  text-decoration: none;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
}

.header-nav a:hover {
  background-color: #e59400;
  transform: translateY(-3px);
}

/* Särskilda knappar */
.button-primary {
  background-color: #4caf50;
  color: white;
}

.button-primary:hover {
  background-color: #3d8b40;
}

/* Anpassning för små skärmar */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    padding: 20px;
  }

  .header-nav {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  header h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  header .logo-container img {
    height: 60px;
    width: 60px;
  }
}
</style>
