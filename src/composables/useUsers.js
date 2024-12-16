import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { v4 as uuid } from 'uuid'
import { binApi } from "@/services/binApi";
import { CONFIG } from "@/constants/config";

const url = CONFIG.USER_API_URL;

export const useUser = defineStore("Users", () => {
  const users = ref([])

  function getLoggedInUser(){
    return localStorage.getItem("user")
  }

  async function getUsers() {
    try{
      const response = await binApi.getApi(url)
      users.value = response.users
    }catch(error) {
      console.log(error)
    }
  }




  async function addUser(user) {
    try {
      await binApi.postApi(url, {
        id: uuid(),
        ...user
      })
      alert("Registration successful!");
    }
    catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed!");
    }
  }

  onMounted(() => {
    getUsers();
  })
  return { addUser, getUsers };
});
