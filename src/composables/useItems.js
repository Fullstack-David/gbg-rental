import { onMounted, ref, toRaw } from 'vue'
import { binApi } from '@/services/binApi'
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"
import { watch } from 'vue'
import { defineStore } from 'pinia'

const url = CONFIG.ITEMS_API_URL;
const bin = 'items'

export const useItems = defineStore("items", () => {
  const items = ref([])
  const isLoading = ref(false)
  
  async function fetchItems() {
    isLoading.value = true;
    try {
      items.value = await binApi.getApi(url, bin)
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      isLoading.value = false;
    }
  }
  
  async function addItem(item) {
    const newItem = {
      id: uuid(),
      ...item,
    }
    const newArray = [...items.value, newItem]
    try {
      items.value = await binApi.postApi(url, bin, newArray)
      return true
    } catch (error) {
      console.error('Error adding item:', error);
      return false;
    }
  }
  
  async function updateItem(id, newItem) {
    const updatedItems = items.value.map((item) => item.id === id ? { ...item, ...newItem } : item)
    try {
      items.value = await binApi.postApi(url, bin, updatedItems)
      return true
    } catch (error) {
      console.error('Error updating item:', error);
      return false;
    }
  }
  
  async function deleteItem(id) {
    const filteredItems = items.value.filter((item) => item.id !== id)
    try {
      items.value = await binApi.postApi(url, bin, filteredItems)
      return true
    } catch (error) {
      console.error('Error deleting item:', error);
      return false;
    }
  }
  
  onMounted(fetchItems)
  return {
    items,
    userItems,
    isLoading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  }
});
