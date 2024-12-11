import { defineStore } from "pinia"
import { ref } from "vue"

export const authStore = defineStore('authStore', () => {
    const isLoggedIn = ref(false)
    return { isLoggedIn }
})