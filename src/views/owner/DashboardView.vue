<script setup>
import { useModalStore } from "@/composables/useModal";
const { openModal } = useModalStore();
</script>
<template>
  <div class="local-nav">
    <ul class="local-nav-ul">
      <li>
        <!-- visar alla tillgängliga produkter "items" -->
        <RouterLink to="/">
          <button>Hyra</button>
        </RouterLink>
      </li>
      <li>
        <!-- visar modalen för att lägga till en ny produkt "item" -->
        <RouterLink to="/create-item">
          <button @click="openModal">Lägg upp ny produkt</button>
        </RouterLink>
      </li>
      <li>
        <!-- listar dem produkterna som är kopplat till den användare som är inloggad -->
        <RouterLink to="/my-items">
          <button>Mina produkter</button>
        </RouterLink>
      </li>
      <li>
        <!-- listar dem produkterna som är kopplat till den användare som är inloggad -->
        <RouterLink to="/history">
          <button>Order historik</button>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.local-nav {
  background-color: #162c46;
  padding: 0.5rem;
}

.local-nav-ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}

button {
  background-color: orange;
  border-radius: 5px;
  padding: 1rem;
  border: none;
  font-size: 1rem;
  color: white;
}

button:hover {
  background-color: rgb(179, 118, 6);
}
</style>
