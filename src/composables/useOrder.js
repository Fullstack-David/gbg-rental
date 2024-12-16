import { ref } from 'vue'
import { binApi } from '@/services/binApi';
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"

const url = CONFIG.ORDERS_API_URL;

export function useOrder(){
  const orders = ref([])
  const isLoading = ref(false)

  async function fetchOrders() {
    isLoading.value = true
    try {
      const response = await binApi.getApi(url)
      orders.value = response.orders
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function addOrder(order) {
    const newOrder = {
      id: uuid(),
      ...order,
    }
    try {
      const response = await binApi.postApi(url, newOrder)
      orders.value = response.orders

      return true
    } catch (error) {
      console.error('Error adding order:', error)
      return false
    }
  }

  async function updateOrder(id, order) {
    try {
      const response = await binApi.updateApi(url, id, order)
      orders.value = response.orders
      return true
    } catch (error) {
      console.error('Error updating order:', error)
      return false
    }
  }

  async function deleteOrder(id) {
    try {
      const response = await binApi.deleteApi(url, id)
      orders.value = response.orders
      return true
    } catch (error) {
      console.error('Error deleting order:', error)
      return false
    }
  }

  return {
    orders,
    isLoading,
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
  }
}