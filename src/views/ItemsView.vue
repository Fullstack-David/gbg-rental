<script setup>
import { useItems } from "@/composables/useItems";
import { ref, onMounted } from "vue";
import { itemsApi } from '@/services/itemsApi';
import BookingFormView from "./renter/BookingFormView.vue";

const { items, isLoading, fetchItems } = useItems();

const showBookingForm = ref(false);
const selectedItem = ref(null);

// Funktion för att öppna bokningsformuläret
const openBookingForm = async (item) => {
  selectedItem.value = await item;
  showBookingForm.value = true;
};

// Ta bort en annons
const deleteItem = async (id) => {
  try {
    const confirmed = confirm('Är du säker på att du vill ta bort denna annons?');
    if (!confirmed) return;

    const updatedItems = await itemsApi.deleteItem(id);

    items.value = updatedItems

    alert('Annonsen har tagits bort');
  } catch (error) {
    console.error('kunde inte ta bort annonsen:', error);
    alert('Ett fel inträffade, försök igen senare')
  }
}

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <RouterView />
  <h2 v-if="isLoading" class="message">Laddar..</h2>
  <div v-if="!isLoading">
    <h2 class="header-title">Alla annonser</h2>
    <div class="item-container">
      <div v-for="item in items" :key="item.id" class="item">
        <h3>{{ item.title }}</h3>
        <img :src="item.image.url" :alt="item.image.alt" />
        <p>{{ item.description }}</p>
        <p>Skapad: {{ item.createdAt }}</p>
        <p>Pris: {{ item.price }}:-</p>
        <p>Postad av: {{ item.owner }}</p>

        <!-- ######################################################### -->
        <!-- En v-if på denna knappen, som kollar om man är inloggad?  -->
        <!-- ######################################################### -->

        <button @click="openBookingForm(item)">Boka</button>

        <!-- Booking Button -->
        <button class="dlt-btn" @click="deleteItem(item.id)">Ta bort annons</button>
      </div>
    </div>
    <BookingFormView 
    v-if="showBookingForm" 
    :selectedItem="selectedItem" 
    :showBookingForm="showBookingForm" 
    @showBookingForm="showBookingForm = $event" 
    @selectedItem="selectedItem = $event" 
    />
  </div>
</template>

<style scoped>
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
  border: 2px solid black;
  width: 1fr;
  margin: 1rem;
  padding: 0 1rem;
  border-radius: 1rem;
}

img {
  width: 100px;
  /* Adjust as needed */
  height: auto;
  /* Maintains aspect ratio */
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
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
