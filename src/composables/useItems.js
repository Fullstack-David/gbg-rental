import { ref } from 'vue'
import { itemsApi } from '@/services/itemsApi'

export function useItems() {
  const items = ref([])
  const isLoading = ref(false)

  async function fetchItems() {
    isLoading.value = true
    try {
      items.value = await itemsApi.fetchItems()
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addItem(title) {
    const newItem = {
      id: `item${Date.now()}`,
      title,
    }

    try {
      items.value = await itemsApi.createItem(newItem)
      return true
    } catch (error) {
      console.error('Error adding item:', error)
      return false
    }
  }

  async function updateItem(id, title) {
    try {
      items.value = await itemsApi.updateItem(id, { title })
      return true
    } catch (error) {
      console.error('Error updating item:', error)
      return false
    }
  }

  async function deleteItem(id) {
    try {
      items.value = await itemsApi.deleteItem(id)
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
