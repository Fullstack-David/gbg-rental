import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { binApi } from "@/services/binApi";
import bcryptjs from "bcryptjs";
import { ref, onMounted } from "vue";
import { CONFIG } from "@/constants/config"

const url = CONFIG.USER_API_URL;
const bin = 'users'


export const useAuth = defineStore("logInOut", () => {
  const isLoggedIn = ref(false);
  const router = useRouter();
  const errorMessage = ref("");

  async function logIn(email, password) {
    errorMessage.value = "";
    try{
      const response = await binApi.getApi(url, bin);
      const user = response.find((user) => user.email === email);
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
      console.log(error)
      errorMessage.value = 'NÅGOT GICK FEL, försök igen imorgon'
    }
  }

  function logOut() {
    localStorage.removeItem("user");
    isLoggedIn.value = false;
    router.push("/");
  }

  // Körs onMount() för att se om man tidigare vart inloggad, fungerar som att man spara sin session så att man slipper logga in helatiden
  function checkLogin() {
    localStorage.getItem("user")
      ? (isLoggedIn.value = true)
      : (isLoggedIn.value = false);
  }

  function getLoggedInUser(){
    return localStorage.getItem("user")
  }

  onMounted(() => {
    checkLogin();
  });

  return { logIn, logOut, isLoggedIn, errorMessage };
});
