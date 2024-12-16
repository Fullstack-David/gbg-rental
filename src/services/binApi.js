import { CONFIG } from "@/constants/config"

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': CONFIG.JSONBIN_API_KEY,
  'X-Access-Key': CONFIG.JSONBIN_API_KEY,
}

export const binApi = {
  // GET
  async getApi(url) {
    const response = await fetch(url, { headers })
    const data = await response.json()
    return data.record
  },

  // POST
  async postApi(url, newItem) {
    const currentItems = await this.fetchItems()
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: [...currentItems, newItem],
      }),
    })
    const data = await response.json()
    return data.record
  },

  // PUT
  async updateApi(url, id, updatedItem) {
    const currentItems = await this.fetchItems()
    const updatedItems = currentItems.map((item) =>
      item.id === id ? { ...item, ...updatedItem } : item,
    )

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: updatedItems,
      }),
    })
    const data = await response.json()
    return data.record
  },

  // DELETE
  async deleteApi(url, id) {
    const currentItems = await this.fetchItems()
    const filteredItems = currentItems.filter((item) => item.id !== id)

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: filteredItems,
      }),
    })
    const data = await response.json()
    return data.record
  },
}
