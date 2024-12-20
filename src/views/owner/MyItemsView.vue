<script setup>
import { ref, computed } from 'vue'
import { useItems } from '@/composables/useItems'

const showModal = ref(false);
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const { updateItem, deleteItem } = useItems();
const store = useItems();

const productInfoDefault = {
  title: "",
  description: "",
  price: "",
  owner: "",
  available: true,
  image: {
    url: '/gbg-rentals-logo.png',
    alt: 'default-image'
  }
}

const productInfo = ref(productInfoDefault)

const noItems = computed(() => store.items.length === 0)
const userItems = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  return store.items.filter((item) => item.owner.id === user.id )
})

// Edit the selected item
const editItem = (id) => {
  const itemToEdit = store.items.find(item => item.id === id)
  if (!itemToEdit) {
    console.warn(`No item found with id: ${id}`)
    return
  }

  productInfo.value = { ...itemToEdit }
  showModal.value = true
}

const saveUpdatedItem = async () => {
  try {
    console.log(productInfo.value)
    const success = await updateItem(productInfo.value.id, productInfo.value)
    if (success) {
      closeModal()
    }
  } catch (error) {
    console.error("Error updating item:", error)
  }
}

const closeModal = () => {
  showModal.value = false
  productInfo.value = productInfoDefault
}

const confirmDeleteItem = (id) => {
  itemToDelete.value = id
  showDeleteModal.value = true
}

const removeItem = async () => {
  try {
    const success = await deleteItem(itemToDelete.value)
    if (success) {
      showDeleteModal.value = false
    }
  } catch (error) {
    console.error("Error deleting item:", error)
  }
}
</script>

<template>
  <RouterView />
  <!-- If no items are found for the user, show a message -->
  <div v-if="noItems">
    <p>Inga produkter hittades för denna användare.</p>
    <p>Kontrollera att du är inloggad och att du har skapat produkter.</p>
  </div>

  <div v-else class="message">
    <div v-for="item in userItems" :key="item.id" class="item">
      <h3>{{ item.title }}</h3>
      <img :src="item.image.url" :alt="item.image.alt" />
      <p>{{ item.description }}</p>
      <p><strong>Pris:</strong> {{ item.price }} kr</p>
      <p><strong>Postad av:</strong> {{ item.owner.name }}</p>
      <div class="btn-container">
        <button class="editButton" @click="editItem(item.id)">Redigera</button>
        <button class="deleteButton" @click="confirmDeleteItem(item.id)">Ta bort</button>
      </div>
    </div>
  </div>

  <!-- Modal för redigering -->
  <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <div class="info-field">
        <button class="close-btn" @click="closeModal">x</button>
        <input v-model="productInfo.title" type="text" placeholder="Produktens namn" />
        <input v-model="productInfo.description" type="text" placeholder="Produktens beskrivning" />
        <input v-model="productInfo.price" type="number" placeholder="Pris" />
        <input v-model="productInfo.image.url" type="text" placeholder="Bild-URL" />
        <input v-model="productInfo.image.alt" type="text" placeholder="Alt-text för bild" />
        <div>
          <label for="available">Tillgänglig </label>
          <input type="radio" id="available" value="true" name="available" v-model="productInfo.available">
        </div>
        <div>
          <label for="available">Otillgänglig </label>
          <input type="radio" id="unavailable" value="false" name="available" v-model="productInfo.available">
        </div>
        <button @click="saveUpdatedItem">Spara ändringar</button>
      </div>
    </div>
  </div>

  <!-- Modal för borttagning -->
  <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
    <div class="modal-content">
      <p>Är du säker på att du vill ta bort denna produkt?</p>
      <div class="confirmation-buttons">
        <button class="confirmation-yes" @click="removeItem">Ja, ta bort</button>
        <button class="confirmation-no" @click="showDeleteModal = false">Nej, ångra</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.item {
  border: 2px solid #ccc;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  position: relative;
}

.btn-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: auto;
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
