<script setup>
import { ref, computed } from "vue";
import { useItems } from "@/composables/useItems";
import { useModalStore } from "@/composables/useModal";
import { useAuth } from "@/composables/useAuth";

const store = useAuth();
const modalStore = useModalStore();
const { closeModal } = useModalStore();
const { addItem } = useItems();

const owner = computed(() => {
  const id = localStorage.getItem('user');
  const user = store.users.find(user =>
    user.id === id)
  return user.name
}
);

const todayDate = new Date().toISOString().split("T")[0];
const defaultProduct = {
  title: "",
  description: "",
  price: "",
  owner,
  available: true,
  image: {
    url: '/gbg-rentals-logo.png',
    alt: 'default-image'
  }
}
const productInfo = ref(defaultProduct);


const submitItem = async () => {
  addItem(productInfo.value)
  // Reset REFS
  productInfo.value = defaultProduct;
  modalStore.showModal = false;
};
</script>

<template>
  <div
    class="modal-backdrop"
    v-if="modalStore.showModal"
    @click.self="modalStore.closeModal"
  >
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">x</button>
      <div class="info-field">

        <!-- titel -->
        <input class="prod-title" type="text" placeholder="Produktens namn" v-model="productInfo.title" />

        <!-- pris per dag -->
        <input class="prod-price" type="text" placeholder="Pris per dag" v-model="productInfo.price" />

        <!--- description -->
        <input class="prod-desc" type="text" placeholder="Produktens beskrivning" v-model="productInfo.description" minlength="21" />

        <h3>Ladda upp bild</h3>
        <input type="text" placeholder="Klistra in url för din bild" v-model="productInfo.image.url" />

        <div v-if="productInfo.image.url">
          <h4>Vald bild:</h4>
          <img :src="productInfo.image.url" alt="Förhandsvisning" style="max-width: 300px; max-height: 300px" />
          <input type="text" placeholder="Beskrivning av bild" v-model="productInfo.image.alt" />
        </div>

        <!-- KANSKE VI ANVÄNDER OSS AV SEDAN NÄR OCH OM VIU UPPDATERAR DATABASEN -->
        <!-- start datum för uthyrning -->
        <!-- <div class="date-div"> -->
        <!-- <h4>Uthyrningsdatum</h4> -->
        <!-- <p>Från:</p>
          <input
            class="start-date"
            type="date"
            v-model="productInfo.rentalPeriod.startDate"
            :min="todayDate"
            @change="calculateRentalDays"
          /> -->

        <!-- Slutdatum för uthyrning -->
        <!-- <p>Till</p>
          <input
            class="end-date"
            type="date"
            v-model="productInfo.rentalPeriod.endDate"
            :min="todayDate"
            @change="calculateRentalDays"
          /> -->
        <!-- </div> -->
        <button @click="submitItem">Publicera vara</button>
        <!-- <p>Antal dagar för uthyrning: {{ rentalDays }}</p> -->
        <!-- <p>Totalt pris: {{ totalSum }} KR</p> -->
      </div>
    </div>
  </div>
</template>


<style scoped>
.pub-container {
  border: 2px solid #4caf50;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  /* Centrerar innehållet */
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
  max-height: 80vh;
  overflow: auto;
  /* Lägger till en mjuk öppningsanimation */
}

.close-btn {
  position: absolute;
  top: 4px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease-in-out;
}

.close-btn:hover {
  background-color: darkred;
}

.close-btn:active {
  transform: scale(0.9);
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

input[type="text"],
input[type="date"],
input[type="number"],
textarea {
  color: grey;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.75rem;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.1s ease-in-out;
  margin: 0 auto;
  /* Centrerar knappen */
  display: block;
  max-width: 200px;
}

button:hover {
  background-color: #45a049;
}

button:active {
  transform: scale(0.98);
}

.date-div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}

textarea {
  resize: none;
}

/* Öppningsanimation för modalen */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
