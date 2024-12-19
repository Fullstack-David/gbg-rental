<script setup>
import { useOrder } from "@/composables/useOrder";
const store = useOrder();
</script>

<template>
  <div v-if="store.orders.length > 0" class="booking-container">
    <h3 class="header">Dina bokningar</h3>
    <ul class="booking-list">
      <li v-for="(order, index) in store.orders" :key="index" class="booking-item">
        <span class="check-icon">✅</span>
        <div class="booking-details">
          <p class="booking-title">{{ order.item.title }}</p>
          <p class="booking-date-time">
            Bokad datum: {{ order.date }} klockan: {{ order.time }}
          </p>
        </div>
      </li>
    </ul>
  </div>
  <div v-else>
    <p class="message">Du har inte lagt några ordrar</p>
  </div>
  <RouterView />
</template>

<style scoped>
.booking-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.booking-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.header {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.booking-list {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.booking-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease;
}

.booking-item:hover {
  background-color: #f0f8ff;
}

.check-icon {
  margin-right: 12px;
  font-size: 1.2rem;
  color: #4caf50;
}

.booking-details {
  flex: 1;
}

.booking-title {
  font-weight: bold;
  color: #555;
}

.booking-date-time {
  font-size: 0.9rem;
  color: #777;
}

@media (max-width: 600px) {
  .booking-container {
    width: 100%;
    margin: 1rem;
  }
}
</style>
