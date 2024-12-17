import { ref } from 'vue'
import { binApi } from '@/services/binApi';
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"

const url = CONFIG.ORDERS_API_URL;
const bin = 'orders';


export function useOrder() {
  const orders = ref([])
  const isLoading = ref(false)

  async function fetchOrders() {
    isLoading.value = true
    try {
      orders.value = await binApi.getApi(url, bin)
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
      orders.value = await binApi.postApi(url, bin, newOrder)
      return true
    } catch (error) {
      console.error('Error adding order:', error)
      return false
    }
  }

  async function updateOrder(id, order) {
    try {
      orders.value = await binApi.updateApi(url, bin, id, order)
      return true
    } catch (error) {
      console.error('Error updating order:', error)
      return false
    }
  }

  async function deleteOrder(id) {
    try {
      orders.value = await binApi.deleteApi(url, bin, id)
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