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

  // POST, PUT, DELETE
  async postApi(url, bin, newArray) {
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        items: newArray,
      }),
    })
    const data = await response.json();
    return data.record[bin]
  }
}
