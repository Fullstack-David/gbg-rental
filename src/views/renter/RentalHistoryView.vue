<script setup>
import { useBookings } from "@/composables/useBooking";
const { bookedItems } = useBookings();
</script>

<template>
  <div class="booking-container" v-if="bookedItems.length > 0">
    <h3>Dina bokningar</h3>
    <ul>
      <li v-for="(booking, index) in bookedItems" :key="index">
        ✅
        {{ booking.item.title }} - Bokad datum: {{ booking.date }} klockan:
        {{ booking.time }}
      </li>
    </ul>
  </div>
  <RouterView />
</template>

<style scoped>
.booking-container {
  padding: 10px 12px;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  width: 80%;
}

.order-history:hover {
  background-color: #0056b3;
}

ul {
  padding: 1rem;
  gap: 10px;
}

li {
  list-style-type: none;
  margin: 1rem;
}
</style>
