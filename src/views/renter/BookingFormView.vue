<script setup>
import { useOrder } from '@/composables/useOrder';
import { ref } from 'vue';

const emit = defineEmits(['showBookingForm', 'selectedItem']);

const props = defineProps({
  selectedItem: Object,
  showBookingForm: Boolean
});

const store = useOrder();
const todaysDate = new Date().toLocaleDateString();
const bookingDate = ref(todaysDate);
const bookingTime = ref("");

const bookItem = () => {
  const newOrder = {
    item: props.selectedItem,
    userId: JSON.parse(localStorage.getItem('user')).id,
    date: bookingDate.value,
    time: bookingTime.value,
    rentalPeriod: {
      startDate: "",
      endDate: "",
    },
  };
  store.addOrder(newOrder)
  alert(
    `Du har bokat: ${props.selectedItem.title} den ${bookingDate.value} kl. ${bookingTime.value}`,
  );
  closeBookingForm();
};

const closeBookingForm = () => {
  emit('showBookingForm', false);
  emit('selectedItem', null);
  bookingDate.value = "";
  bookingTime.value = "";
};
</script>

<template>
  <div class="booking-form-modal">
    <div class="booking-form-container">
      <h3>Boka {{ selectedItem?.title }}</h3>
      <form @submit.prevent="bookItem">
        <div class="form-group">
          <label for="date">Välj datum:</label>
          <input type="date" id="date" v-model="bookingDate" :min="todaysDate" required />
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
</template>

<style scoped>
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
