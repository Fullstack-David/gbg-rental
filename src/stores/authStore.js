import { defineStore } from "pinia"
import { ref } from "vue"

export const authStore = defineStore('authStore', () => {
    const isLoggedIn = ref(false)

    const logOutState = () => {
        isLoggedIn.value = false
    }
    const logInState = (value) => {
        isLoggedIn.value = value
    }
    return { isLoggedIn, logOutState, logInState }
})