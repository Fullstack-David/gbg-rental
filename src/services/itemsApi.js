import { CONFIG } from "@/constants/config"

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': CONFIG.JSONBIN_API_KEY,
  'X-Access-Key': CONFIG.JSONBIN_API_KEY,
}

export const itemsApi = {
  // GET
  async fetchItems() {
    const response = await fetch(CONFIG.ITEMS_API_URL, { headers })
    const data = await response.json()
    return data.record.items
  },

  // POST
  async createItem(newItem) {
    const currentItems = await this.fetchItems()
    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: [...currentItems, newItem],
      }),
    })
    const data = await response.json()
    return data.record.items
  },

  // PUT
  async updateItem(id, updatedItem) {
    const currentItems = await this.fetchItems()
    const updatedItems = currentItems.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item,
    )

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: updatedItems,
      }),
    })
    const data = await response.json()
    return data.record.items
  },

  // DELETE
  async deleteItem(id) {
    const currentItems = await this.fetchItems()
    const filteredItems = currentItems.filter((item) => item.id !== id)

    const response = await fetch(CONFIG.ITEMS_API_URL, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: filteredItems,
      }),
    })
    const data = await response.json()
    return data.record.items
  },
}
