<script setup>
// import { store } from '@/store/cart';
// import { sendOrder } from '../shared/useSendOrder';
// import Order from './Order.vue';
// const { orderConfirmation, orderConfirmed, postOrder } = sendOrder();
</script>

<template>
  <div class="cart-container">
    <h2 class="cart-title">Kundvagn</h2>
    <div class="cart-items">
      <!-- v-for="item in store.cart" :key="item.id" -->
      <div class="cart-item">
        <p class="item-name">Produktnamn</p>
        <!-- {{ item.name }} -->
        <p class="item-price">SEK</p>
        <!-- {{ item.price }} -->
        <!-- <button class="remove-btn" @click="store.removeFromCart(item.id)">Ta bort</button> -->
        <button class="remove-btn">Ta bort</button>
      </div>
    </div>

    <div class="total">
      <p class="total-price">Totalpris: SEK</p>
      <!-- {{ store.sumOfCart }} -->
      <button class="order-btn">Skicka in min beställning</button>
      <!-- @click="postOrder(store.cart)" -->
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 30px;
  font-family: "Helvetica Neue", Arial, sans-serif;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.cart-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  transition: background-color 0.3s ease;
  gap: 10px;
}

.cart-item:hover {
  background-color: #f1f1f1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  flex: 2;
}

.item-price {
  font-size: 1.1rem;
  color: #555;
  flex: 1;
  text-align: right;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.remove-btn:hover {
  background-color: #e53935;
}

.total {
  text-align: center;
  margin-top: 20px;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.order-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.1rem;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}

.order-btn:hover {
  background-color: #45a049;
}

.order-btn:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.loading,
.error-message {
  text-align: center;
}

.loading {
  color: #00796b;
}

.error-message {
  color: red;
}
</style>
