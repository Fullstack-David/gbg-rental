import { ref, computed } from 'vue';
import { itemsApi } from '@/services/itemsApi';
import { v4 as uuid } from 'uuid';

export function useItems() {
  const items = ref([]);
  const isLoading = ref(false);

  
  // Hämta den inloggade användarens ID från localStorage
  const userId = localStorage.getItem('user');

  // Computed property: Filtrerar objekt som tillhör den inloggade användaren
  const userItems = computed(() => {
    if (!userId) {
      console.warn("Ingen userId hittad i localStorage. Är du inloggad?");
      return [];
    }
    return items.value.filter(item => item.owner === userId);
  });

  async function fetchItems() {
    isLoading.value = true;
    try {
      const allItems = await itemsApi.fetchItems();
      items.value = allItems;
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addItem({ title, description, price, imageUrl, altText, startDate, endDate }) {
    const newItem = {
      id: uuid(),
      title,
      description: description || '',
      price: price || 0,
      owner: userId, // Ägare kopplat till inloggad användare
      rentalPeriod: {
        startDate: startDate || '',
        endDate: endDate || '',
      },
      image: {
        url: imageUrl || '',
        alt: altText || '',
      },
    };

    try {
      const updatedItems = await itemsApi.createItem(newItem);
      items.value = updatedItems;
      return true;
    } catch (error) {
      console.error('Error adding item:', error);
      return false;
    }
  }

  async function updateItem(id, updatedData) {
    try {
      const updatedItems = await itemsApi.updateItem(id, updatedData);
      items.value = updatedItems;
      return true;
    } catch (error) {
      console.error('Error updating item:', error);
      return false;
    }
  }

  async function deleteItem(id) {
    try {
      const updatedItems = await itemsApi.deleteItem(id);
      items.value = updatedItems;
      return true;
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  }

  return {
    items,
    userItems,
    isLoading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  };
}
