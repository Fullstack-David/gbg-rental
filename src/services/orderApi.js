import { CONFIG } from "@/constants/config"

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': CONFIG.JSONBIN_API_KEY,
  'X-Access-Key': CONFIG.JSONBIN_API_KEY,
}

export const orderApi = {
  // GET
  async fetchOrders() {
    const response = await fetch(CONFIG.ORDERS_API_URL, { headers })
    const data = await response.json()
    return data.record.orders
  },

  // POST
  async createOrder(newOrder) {
    const currentOrders = await this.fetchOrders()
    const response = await fetch(CONFIG.ORDERS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        orders: [...currentOrders, newOrder],
      }),
    })
    const data = await response.json()
    return data.record.orders
  },

  // PUT
  async updateOrder(id, updatedOrder) {
    const currentOrders = await this.fetchOrders()
    const updatedOrders = currentOrders.map((order) =>
      order.id === id ? { ...order, ...updatedOrder } : order,
    )

    const response = await fetch(CONFIG.ORDERS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        orders: updatedOrders,
      }),
    })
    const data = await response.json()
    return data.record.orders
  },

  // DELETE
  async deleteOrder(id) {
    const currentOrders = await this.fetchOrders()
    const filteredOrders = currentOrders.filter((order) => order.id !== id)

    const response = await fetch(CONFIG.ORDERS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        orders: filteredOrders,
      }),
    })
    const data = await response.json()
    return data.record.orders
  },
}
