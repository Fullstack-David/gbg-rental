<script setup>
import { useItems } from "@/composables/useItems";
import { ref, onMounted } from "vue";
import { useUsers } from "@/composables/useUser";
import { useBookings } from "@/composables/useBooking";

const { bookedItems } = useBookings();
const { items, isLoading, fetchItems } = useItems();
const {isLoggedIn} = useUsers();

const showBookingForm = ref(false);
const selectedItem = ref(null);
const bookingDate = ref("");
const bookingTime = ref("");
const bookedItems = ref([]);

// Funktion för att öppna bokningsformuläret
const openBookingForm = (item) => {
  selectedItem.value = item;
  showBookingForm.value = true;
};

// Funktion för att stänga bokningsformuläret
const closeBookingForm = () => {
  showBookingForm.value = false;
  selectedItem.value = null;
  bookingDate.value = "";
  bookingTime.value = "";
};

// Funktion för att boka ett objekt med dag och tid
const bookItem = () => {
  const bookingDetails = {
    item: selectedItem.value,
    date: bookingDate.value,
    time: bookingTime.value,
  };
  bookedItems.value.push(bookingDetails);

  console.log(bookingDetails);
  alert(
    `Du har bokat: ${selectedItem.value.title} den ${bookingDate.value} kl. ${bookingTime.value}`,
  );
  closeBookingForm(); // Stänger formuläret efter bokningen
};

onMounted(() => {
  fetchItems();
});
</script>

<template>
  <RouterView />
  <h2 v-if="isLoading">Laddar..</h2>
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

        <button
          @click="openBookingForm(item)"
          v-if="isLoggedIn"
        >
          Boka
        </button>
        <!-- Booking Button -->
      </div>
    </div>

    <!----------------------Bokningsformulär ---------------------------->
    <div v-if="showBookingForm" class="booking-form-modal">
      <div class="booking-form-container">
        <h3>Boka {{ selectedItem?.title }}</h3>
        <form @submit.prevent="bookItem">
          <div class="form-group">
            <label for="date">Välj datum:</label>
            <input type="date" id="date" v-model="bookingDate" required />
          </div>
          <div class="form-group">
            <label for="time">Välj tid:</label>
            <input type="time" id="time" v-model="bookingTime" required />
          </div>
          <div class="form-actions">
            <button type="submit">Bekräfta bokning</button>
            <button type="button" @click="closeBookingForm">Avbryt</button>
          </div>
        </form>
      </div>
    </div>
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
  width: 100px; /* Adjust as needed */
  height: auto; /* Maintains aspect ratio */
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

/* h3 {
  margin-top: 2rem;
} */

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
</style>
