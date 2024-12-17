import { CONFIG } from "@/constants/config"

const headers = {
  'Content-Type': 'application/json',
  'X-Master-Key': CONFIG.JSONBIN_API_KEY,
  'X-Access-Key': CONFIG.JSONBIN_API_KEY,
}

export const binApi = {
  // GET
  async getApi(url, bin) {
    const response = await fetch(url, { headers })
    const data = await response.json()
    return data.record[bin]
  },

  // POST
  async postApi(url, bin, newItem) {
    const currentItems = await this.getApi(url, bin)
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: [...currentItems, newItem],
      }),
    })
    const data = await response.json()
    return data.record[bin]
  },

  // PUT
  async updateApi(url, bin, id, updatedItem) {
    const currentItems = await this.getApi(url, bin)
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
    return data.record[bin]
  },

  // DELETE
  async deleteApi(url, bin, id) {
    const currentItems = await this.getApi(url, bin)
    const filteredItems = currentItems.filter((item) => item.id !== id)

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: filteredItems,
      }),
    })
    const data = await response.json()
    return data.record[bin]
  },
}
