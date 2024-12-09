<script setup>
</script>
<template>
  <div>
    <div class="dashboard-header">
      <h2>Dashboard</h2>
      <div class="local-nav">
        <ul class="local-nav-ul">
          <li>
            <!-- visar alla tillgängliga produkter "items" -->
            <RouterLink to="/dashboard/items">
              <button>hyra</button>
            </RouterLink>
          </li>
          <li>
            <!-- visar modalen för att lägga till en ny produkt "item" -->
            <RouterLink to="/dashboard/create-item">
              <button>lägg upp ny produkt</button>
            </RouterLink>
          </li>
          <li>
            <!-- listar dem produkterna som är kopplat till den användare som är inloggad -->
            <RouterLink to="/dashboard/rentals">
              <button>mina produkter</button>
            </RouterLink>
          </li>
          <li>
            <!-- listar dem produkterna som är kopplat till den användare som är inloggad -->
            <RouterLink to="/dashboard/history">
              <button>order historik</button>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-content-dashboard">
      <!-- huvud inne håll visas här beroende på vad man tryckt på ovan i den locala navigationen -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dashboard-header {
  background-color: #0D2136;
  color: aliceblue;
}

.local-nav {
  background-color: #162C46;
  padding: .5rem;
}

.local-nav-ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
}

button {
  background-color: orange;
  border-radius: 1rem;
  padding: 0 1rem;
}
</style>
