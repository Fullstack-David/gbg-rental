import { ref } from 'vue'
import { binApi } from '@/services/binApi'
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"

const url = CONFIG.ITEMS_API_URL;

export function useItems() {
  const items = ref([])
  const isLoading = ref(false)

  async function fetchItems() {
    isLoading.value = true
    try {
      const response = await binApi.getApi(url)
      items.value = await response.items
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addItem(item) {
    const newItem = {
      id: uuid(),
      ...item,
    }

    try {
      const response = await binApi.postApi(url, newItem)
      items.value = await response.items
      return true
    } catch (error) {
      console.error('Error adding item:', error)
      return false
    }
  }

  async function updateItem(id, newItem) {
    try {
      const response = await binApi.updateApi(url, id, newItem)
      items.value = await response.items
      return true
    } catch (error) {
      console.error('Error updating item:', error)
      return false
    }
  }

  async function deleteItem(url, id) {
    try {
      const response = await binApi.deleteApi(url, id)
      items.value = await response.items
      return true
    } catch (error) {
      console.error('Error deleting item:', error)
      return false
    }
  }

  return {
    items,
    isLoading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  }
}
