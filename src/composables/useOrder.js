import { onMounted, ref } from 'vue'
import { binApi } from '@/services/binApi'; 
import { v4 as uuid } from 'uuid'
import { CONFIG } from "@/constants/config"
import { defineStore } from 'pinia';

const url = CONFIG.ORDERS_API_URL;
const bin = 'orders';


export const useOrder = defineStore("orders", () => {
  const orders = ref([])
  const isLoading = ref(false)
  onMounted(fetchOrders)

  async function fetchOrders() {
    isLoading.value = true
    try {
      orders.value = await binApi.getApi(url, bin);
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  async function addOrder(order) {
    console.log(bin)
    const newOrder = {
      id: uuid(),
      ...order,
    }
    const newArray = [...orders.value, newOrder]
    try {
      orders.value = await binApi.postApi(url, bin, newArray)
      return true
    } catch (error) {
      console.error('Error adding order:', error)
      return false
    }
  }

  async function updateOrder(id, newOrder) {
    const updatedOrders = orders.value.map((order) => order.id === id ? { ...order, ...newOrder } : order)
    try {
      orders.value = await binApi.updateApi(url, bin, updatedOrders)
      return true
    } catch (error) {
      console.error('Error updating order:', error)
      return false
    }
  }

  async function deleteOrder(id) {
    const filteredOrders = orders.value.filter((order) => order.id !== id);
    try {
      orders.value = await binApi.deleteApi(url, bin, filteredOrders)
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
}) 