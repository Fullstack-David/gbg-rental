// ######################
// FOR PINIA LAAAAATER!!!
// ######################






// import { CONFIG } from '../constants/config'

// const headers = {
//   'Content-Type': 'application/json',
//   'X-Master-Key': CONFIG.JSONBIN_API_KEY,
//   'X-Access-Key': CONFIG.JSONBIN_API_KEY,
// }

// export const itemsApiPinia = {
//   async fetchItems() {
//     const response = await fetch(CONFIG.ITEMS_API_URL, { headers })
//     const data = await response.json()
//     return data.record.items
//   },

//   async createItem(items, newItem) {
//     return this.updateBin([...items, newItem])
//   },

//   async updateItem(items, id, updatedItem) {
//     const updatedItems = items.map((item) =>
//       item.id === id ? { ...item, ...updatedItem } : item
//     )
//     return this.updateBin(updatedItems)
//   },

//   async deleteItem(items, id) {
//     const filteredItems = items.filter((item) => item.id !== id)
//     return this.updateBin(filteredItems)
//   },

//   async updateBin(items) {
//     const response = await fetch(CONFIG.ITEMS_API_URL, {
//       method: 'PUT',
//       headers,
//       body: JSON.stringify({ items }),
//     })
//     const data = await response.json()
//     return data.record.items
//   },
// }