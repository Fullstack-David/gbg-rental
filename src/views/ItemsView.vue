<script setup>
import { useItems } from "@/composables/useItems";
import { computed, ref } from "vue";
import BookingFormView from "./renter/BookingFormView.vue";
import moment from "moment";
import { useAuth } from "@/composables/useAuth";

const store = useItems()
const authStore = useAuth();
const showBookingForm = ref(false);
const selectedItem = ref(null);

const user = computed(() =>  JSON.parse(localStorage.getItem('user')))

const openBookingForm = (item) => {
  selectedItem.value = item;
  showBookingForm.value = true;
};
</script>

<template>
  <h2 class="welcome-message">
    Välkommen
    {{ authStore.isLoggedIn ? user?.name : "" }}
    till din hyresprotal
  </h2>
  <RouterView />
  <h3 v-if="authStore.isLoading">Laddar...</h3>
  <div v-else>
    <h2 class="header-title">Alla annonser</h2>
    <div class="item-container">
      <div v-for="item in store.items" :key="item.id" class="item">
        <h4>{{ item.title }}</h4>
        <div class="img-container">
          <img :src="item.image.url" :alt="item.image.alt" />
        </div>
        <p>{{ item.description }}...</p>
        <p>
          <strong>Skapad:</strong>
          {{ moment(item.createdAt).format("YYYY-MM-DD") }}
        </p>
        <p><strong>Pris:</strong> {{ item.price }} kr</p>
        <p><strong>Postad av:</strong> {{ item.owner.name }}</p>
        <div v-if="authStore.isLoggedIn" class="add-btn-container">
          <button class="add-btn" @click="openBookingForm(item)">Boka</button>
        </div>
      </div>
    </div>
  </div>
  <BookingFormView v-if="showBookingForm" :selectedItem="selectedItem" :showBookingForm="showBookingForm" @showBookingForm="showBookingForm = $event" @selectedItem="selectedItem = $event" />
</template>

<style scoped>
.welcome-message {
  text-align: center;
  margin: 1rem;
}

.item-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.header-title {
  padding: 1.5rem;
}

.booking-container {
  padding-left: 1rem;
}

li {
  list-style-type: none;
  margin-top: 1rem;
}

.item {
  border: 2px solid;
  border-radius: 1rem;
  width: 1fr;
  margin: 10px;
  padding: 10px;
  gap: 10px;
}

p {
  padding: 8px 0;
}

.img-container {
  width: 100%; 
  height: 10rem;
  overflow: hidden; 
  position: relative;
  border-radius: 1rem;
}

img {
  width: 100%; 
  height: 100%; 
  /* object-fit:fill; */
  /* object-fit: cover;  */
  position: absolute;
  border-radius: 1rem;
  margin: 10px 0;
}

.add-btn-container {
  display: flex;
  justify-content: end;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 10px 0;
}

.add-btn:hover {
  background-color: #45a049;
}

.dlt-btn {
  background-color: #a82828;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 10px 0;
}

.dlt-btn:hover {
  background-color: #7a0e0e;
}

/*---------------------Styling för bokningsformuläret--------------------- */
.booking-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.booking-form-container {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.form-actions button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.form-actions button:first-child {
  background-color: #4caf50;
  color: white;
}

.form-actions button:last-child {
  background-color: #f44336;
  color: white;
}

.form-actions button:hover {
  opacity: 0.8;
}

.dlt-btn {
  background-color: #a82828;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 10px 0;
}

.dlt-btn:hover {
  background-color: #7a0e0e;
}
</style>
