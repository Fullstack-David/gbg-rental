import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { binApi } from "@/services/binApi";
import bcryptjs from "bcryptjs";
import { ref, onMounted } from "vue";
import { CONFIG } from "@/constants/config"
import { v4 as uuid } from 'uuid'

const url = CONFIG.USER_API_URL;
const bin = 'users'


export const useAuth = defineStore("logInOut", () => {
  const isLoggedIn = ref(false);
  const users = ref([])
  const router = useRouter();
  const errorMessage = ref("");
  
  function logIn(email, password) {
    errorMessage.value = "";
    try{
      const user = users.value.find((user) => user.email === email);
      if (!user) {
        errorMessage.value = "Ingen användare hittades med detta e-post.";
        return;
      }
      bcryptjs.compare(password, user.password, (error, result) => {
        if (result) {
          localStorage.setItem("user", user.id);
          router.push("/");
          isLoggedIn.value = true;
        } else {
          errorMessage.value = "Fel lösenord";
        }
      });
    } catch(error){
      errorMessage.value = 'NÅGOT GICK FEL, försök igen imorgon'
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    isLoggedIn.value = false;
    router.push("/");
  }

  // Körs onMount() för att se om man tidigare vart inloggad, fungerar som att man spara sin session så att man slipper logga in helatiden
  // Går denna att ha i en computed så att den uppdateras så snart localstorage uppdateras?
  function checkLogin() {
    localStorage.getItem("user")
      ? (isLoggedIn.value = true)
      : (isLoggedIn.value = false);
  }


  // function getLoggedInUser(){
  //   return localStorage.getItem("user")
  // }

  async function getUsers() {
    try{
      users.value = await binApi.getApi(url, bin)
    }catch(error) {
      console.log(error)
    }
  }

  async function addUser(user) {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(user.password, salt)
    const cryptUser = {
      is: uuid(),
      ...user,
      password: hash
    }

    const newArray = [...users.value, cryptUser]
    try {
      users.value = await binApi.postApi(url, bin, newArray);
      logIn(user.email, user.password)
      console.log("Registration successful!");
    }
    catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed!");
    }
  }

  onMounted(() => {
    checkLogin();
    getUsers();
  });

  return { logIn, logOut, isLoggedIn, errorMessage, addUser, getUsers, users };
});
