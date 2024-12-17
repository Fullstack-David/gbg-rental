import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { v4 as uuid } from 'uuid'
import { binApi } from "@/services/binApi";
import { CONFIG } from "@/constants/config";

const url = CONFIG.USER_API_URL;
const bin = 'users'


export const useUser = defineStore("Users", () => {
  const users = ref([])

  function getLoggedInUser(){
    return localStorage.getItem("user")
  }

  async function getUsers() {
    try{
      users.value = await binApi.getApi(url, bin)
    }catch(error) {
      console.log(error)
    }
  }

  async function addUser(user) {
    const newUser = {
      id: uuid(),
      ...user
    }
    const newArray = [...users.value, newUser]
    try {
      await binApi.postApi(url, bin, newArray)
      alert("Registration successful!");
    }
    catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed!");
    }
  }

  onMounted(getUsers);
  return { addUser, getUsers, users };
});
