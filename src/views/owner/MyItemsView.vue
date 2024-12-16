<script setup>
import { ref, onMounted } from 'vue';
import { itemsApi } from '@/services/itemsApi';  // Importera itemsApi för att hämta data

const items = ref([]);  // För att lagra de hämtade produkterna
const showModal = ref(false);  // För att visa/hide modalen för redigering
const showDeleteModal = ref(false);  // För att visa/hide bekräftelsemodal för borttagning
const itemToDelete = ref(null);  // För att hålla reda på vilket item som ska tas bort

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

const editItem = (id) => {
  const itemToEdit = items.value.find(item => item.id === id);
  if (itemToEdit) {
    productInfo.value = {
      id: itemToEdit.id,
      title: itemToEdit.title,
      description: itemToEdit.description,
      price: itemToEdit.price,
      rentalPeriod: itemToEdit.rentalPeriod || { startDate: "", endDate: "" },
      owner: itemToEdit.owner,
      image: itemToEdit.image || { url: "", alt: "" },
    };
    showModal.value = true;  // visa modal när user vill redigera
  }
};

const updateItem = async () => {
  try {
    const updatedItems = await itemsApi.updateItem(productInfo.value.id, productInfo.value);
    items.value = updatedItems;  // updatera items
    closeModal();  // stäng modal efter updatering
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const closeModal = () => {
  showModal.value = false;
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
};

const confirmDeleteItem = (id) => {
  itemToDelete.value = id;  // spara id på item som ska tas bort
  showDeleteModal.value = true;  // visa bekräftelsemodal
};

const deleteItem = async () => {
  try {
    await itemsApi.deleteItem(itemToDelete.value);  // ta bort item från backend
    items.value = items.value.filter(item => item.id !== itemToDelete.value);  // ta bort item från listan
    showDeleteModal.value = false;  // stäng bekräftelsemodal
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

onMounted(async () => {
  try {
    const fetchedItems = await itemsApi.fetchItems();
    items.value = fetchedItems;  // Fetcha items
  } catch (error) {
    console.error("Error fetching items:", error);
  }
});
</script>

<template>
  <div class="message">
    <div v-for="item in items" :key="item.id" class="item">
      <h3>{{ item.title }}</h3>
      <img :src="item.image.url" :alt="item.image.alt" />
      <p>{{ item.description }}</p>
      <p><strong>Pris:</strong> {{ item.price }} kr</p>
      <p><strong>Postad av:</strong> {{ item.owner }}</p>
      <!-- Redigeringsknapp -->
      <button class="editButton" @click="editItem(item.id)">Redigera</button>
      <!-- Ta bort-knapp -->
      <button class="deleteButton" @click="confirmDeleteItem(item.id)">Ta bort</button>
    </div>
  </div>

  <!-- Modal för att redigera item -->
  <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <div class="info-field">
        <button class="close-btn" @click="closeModal">x</button>
        <input v-model="productInfo.title" type="text" placeholder="Produktens namn" />
        <input v-model="productInfo.description" type="text" placeholder="Produktens beskrivning" />
        <input v-model="productInfo.price" type="number" placeholder="Pris" />
        <input v-model="productInfo.rentalPeriod.startDate" type="date" />
        <input v-model="productInfo.rentalPeriod.endDate" type="date" />
        <input v-model="productInfo.owner" type="text" placeholder="Ägarens namn" />
        <input v-model="productInfo.image.url" type="text" placeholder="Bild-URL" />
        <input v-model="productInfo.image.alt" type="text" placeholder="Alt-text för bild" />
        <button @click="updateItem">Spara ändringar</button>
      </div>
    </div>
  </div>

  <!-- Modal för att bekräfta borttagning -->
  <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
    <div class="modal-content">
      <p>Är du säker på att du vill ta bort denna produkt?</p>
      <div class="confirmation-buttons">
        <button class="confirmation-yes" @click="deleteItem">Ja, ta bort</button>
        <button class="confirmation-no" @click="showDeleteModal = false">Nej, ångra</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  border: 2px solid #ccc;
  border-radius: 1rem;
  padding: 1rem;
  margin: 10px;
  width: 300px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

h3 {
  font-size: 1.2rem;
  font-weight: bold;
}

img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: darkgreen;
}

.message {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
}

.close-btn {
  position: absolute;
  top: -30px;
  right: -25px;
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 50%;
  font-size: 0.8rem;
  cursor: pointer;
  z-index: 2;
}

.close-btn:hover {
  background-color: darkred;
}

.info-field {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.75rem;
  width: 100%;
}

/* Ta bort-knappen */
.deleteButton {
  background-color: #a82828;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.deleteButton:hover {
  background-color: darkred;
}

/* Edit-knappen */
.editButton {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.editButton:hover {
  background-color: darkgreen;
}

/* Bekräftelseknappar */
.confirmation-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.confirmation-buttons button {
  padding: 0.70rem 1.5rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.confirmation-yes {
  background-color: #c9302c;
  color: white;
  border: none;
}

.confirmation-yes:hover {
  background-color: darkred;
}

.confirmation-no {
  background-color: #4caf50;
  color: white;
  border: none;
}

.confirmation-no:hover {
  background-color: darkgreen;
}
</style>
