import { ref } from 'vue'
import { orderApi } from '@/services/orderApi'
import { v4 as uuid } from 'uuid'

export function useOrder(){
  const orders = ref([])
  const isLoading = ref(false)

  async function fetchOrders() {
    isLoading.value = true
    try {
      orders.value = await orderApi.fetchOrders()
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
      orders.value = await orderApi.createOrder(newOrder)
      return true
    } catch (error) {
      console.error('Error adding order:', error)
      return false
    }
  }

  async function updateOrder(id, order) {
    try {
      orders.value = await orderApi.updateOrder(id, order)
      return true
    } catch (error) {
      console.error('Error updating order:', error)
      return false
    }
  }

  async function deleteOrder(id) {
    try {
      orders.value = await orderApi.deleteOrder(id)
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