import { onMounted, ref } from 'vue'
import { binApi } from '@/services/binApi'
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"

const url = CONFIG.ITEMS_API_URL;
const bin = 'items'

export function useItems() {
  const items = ref([])
  const isLoading = ref(false)

  async function fetchItems() {
    isLoading.value = true
    try {
      items.value = await binApi.getApi(url, bin)
      return items.value
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
      image: {
        url: '/gbg-rentals-logo.png',
        alt: 'default-image'
      }
    }

    try {
      items.value = await binApi.postApi(url, bin, newItem)
      return true
    } catch (error) {
      console.error('Error adding item:', error)
      return false
    }
  }

  async function updateItem(id, newItem) {
    try {
      items.value = await binApi.updateApi(url, bin, id, newItem)
      return true
    } catch (error) {
      console.error('Error updating item:', error)
      return false
    }
  }

  async function deleteItem(url, id) {
    try {
      items.value = await binApi.deleteApi(url, bin, id)
      return true
    } catch (error) {
      console.error('Error deleting item:', error)
      return false
    }
  }

  onMounted(() => {
    fetchItems();
  })

  return {
    items,
    isLoading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
  }
}
