<script setup>
import { useModalStore } from "@/composables/useModal";
const { openModal } = useModalStore();
</script>

<!-- Local Nav -->
<template>
  <nav class="local-nav">
    <ul class="local-nav__list">
      <li class="local-nav__item">
        <RouterLink to="/">
          <button class="local-nav__button">Hyra</button>
        </RouterLink>
      </li>
      <li class="local-nav__item">
        <RouterLink to="/create-item">
          <button class="local-nav__button" @click="openModal">
            Lägg upp ny produkt
          </button>
        </RouterLink>
      </li>
      <li class="local-nav__item">
        <RouterLink to="/my-items">
          <button class="local-nav__button">Mina produkter</button>
        </RouterLink>
      </li>
      <li class="local-nav__item">
        <RouterLink to="/history">
          <button class="local-nav__button">Orderhistorik</button>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.local-nav {
  background-color: #1f1f1f;
  padding: 0.75rem 1rem;
}

.local-nav__list {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.local-nav__item {
  display: inline-block;
}

.local-nav__button {
  background-color: #ff7b00;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s ease;
}

.local-nav__button:hover {
  background-color: #e07000; 
}

.local-nav__button:focus {
  outline: 2px solid #ffb366; 
}
</style>
