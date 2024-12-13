<script setup>
import { ref, computed } from "vue";
import { itemsApi } from "@/services/itemsApi";
import { v4 as uuidv4 } from "uuid";

const showModal = ref(false);

const productInfo = ref({
  id: "",
  title: "",
  description: "",
  price: "",
  rentalPeriod: {
    startDate: "",
    endDate: "",
  },
  owner: "",
  image: {
    url: "",
    alt: "",
  },
});

const publishedProducts = ref([]);
const todayDate = new Date().toISOString().split("T")[0];

function differenceInTime(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start && end && end >= start) {
    const differenceInTime = end.getTime() - start.getTime();
    return differenceInTime / (1000 * 3600 * 24);
  }
  return 0;
}

const rentalDays = ref(0);
const calculateRentalDays = () => {
  rentalDays.value = differenceInTime(
    productInfo.value.rentalPeriod.startDate,
    productInfo.value.rentalPeriod.endDate,
  );
};

// pris gånger dag
const totalSum = computed(() => {
  return rentalDays.value * productInfo.value.price;
});

const getInputValue = async () => {
  productInfo.value.id = uuidv4();

  //skapa objektet och publicera till apit
  const updatedItem = await itemsApi.createItem({ ...productInfo.value });

  //lägg till publicerad produkt i listan
  publishedProducts.value.push(updatedItem);

  //loggar alla varor
  console.log(
    "Alla varor:",
    JSON.parse(JSON.stringify(publishedProducts.value)),
  );
  // bara kontroll console, raderas sen
  console.log(
    "Publicerade varor:",
    JSON.parse(JSON.stringify(publishedProducts.value)),
    `Annonsid: ${productInfo.value.id} ${productInfo.value.owner} har hyrt ut ${productInfo.value.title} med beskrivningen: ${productInfo.value.description} för priset ${productInfo.value.price} under perioden: ${productInfo.value.rentalPeriod.startDate} - ${productInfo.value.rentalPeriod.endDate}bildurl: ${productInfo.value.image.url} alt-text: ${productInfo.value.image.url}`,
  );

  productInfo.value = {
    id: "",
    title: "",
    description: "",
    price: "",
    rentalPeriod: {
      startDate: "",
      endDate: "",
    },
    owner: "",
    image: {
      url: "",
      alt: "",
    },
  };

  //återställer uthyrningsdagarna
  rentalDays.value = 0;
  // ska den stänga eller ej? hmmm...
  showModal.value = false;
};
</script>

<template>
  <div class="pub-container">
    <button @click="showModal = true">Hyr ut något</button>
    <div
      v-if="showModal"
      class="modal-backdrop"
      @click.self="showModal = false"
    >
      <div class="modal-content">
        <button class="close-btn" @click="showModal = false">x</button>
        <div class="info-field">
          <!-- owner -->
          <input
            class="prod-owner"
            type="text"
            placeholder="Uthyrarens namn"
            v-model="productInfo.owner"
          />

          <!-- titel -->
          <input
            class="prod-title"
            type="text"
            placeholder="Produktens namn"
            v-model="productInfo.title"
          />

          <!-- pris per dag -->
          <input
            class="prod-price"
            type="text"
            placeholder="Pris per dag"
            v-model="productInfo.price"
          />

          <!--- description -->
          <input
            class="prod-desc"
            type="text"
            placeholder="Produktens beskrivning"
            v-model="productInfo.description"
            minlength="21"
          />

          <!-- Bild uppladdning -->
          <h3>Ladda upp bild</h3>
          <input
            type="text"
            placeholder="Klistra in url för din bild"
            v-model="productInfo.image.url"
          />

          <!-- Förhandsgranskninga av bild -->
          <div v-if="productInfo.image.url">
            <h4>Vald bild:</h4>
            <img
              :src="productInfo.image.url"
              alt="Förhandsvisning"
              style="max-width: 300px; max-height: 300px"
            />
            <input
              type="text"
              placeholder="Beskrivning av bild"
              v-model="productInfo.image.alt"
            />
          </div>

          <div class="date-div">
            <h4>Uthyrningsdatum</h4>
            <!-- start datum för uthyrning -->
            <p>Från:</p>
            <input
              class="start-date"
              type="date"
              v-model="productInfo.rentalPeriod.startDate"
              :min="todayDate"
              @change="calculateRentalDays"
            />

            <!-- Slutdatum för uthyrning -->
            <p>Till</p>
            <input
              class="end-date"
              type="date"
              v-model="productInfo.rentalPeriod.endDate"
              :min="todayDate"
              @change="calculateRentalDays"
            />
          </div>
          <button @click="getInputValue">Publicera vara</button>
          <p>Antal dagar för uthyrning: {{ rentalDays }}</p>
          <p>Totalt pris: {{ totalSum }} KR</p>
        </div>
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
textarea {
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
