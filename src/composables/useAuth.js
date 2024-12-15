import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { userApi } from "@/services/userAPI";
import bcryptjs from "bcryptjs";
import { authStore } from "@/stores/authStore";
import { ref, onMounted } from "vue";

export const useUsers = defineStore("logInOut", () => {
  const router = useRouter();
  const store = authStore();
  const errorMessage = ref('');

  async function logIn(email, password) {
    errorMessage.value = ""
    const users = await userApi.fetchUsers();
    const user = users.find((user) => user.email === email);
    // if (!user) rendera felmeddelande till användaren
    // Funkar delvis!!!
    // if (!user) {
      //   errorMessage.value = `Ingen användare hittades med detta e-post. ${email}`;
    //   console.log("Denna email adress finns inte i databasen", email);
    // } else {
      //   errorMessage.value = "";
      //   console.log("Användaren hittat", email);
      
      // }

    bcryptjs.compare(password, user.password, (error, result) => {
      if (result) {
        localStorage.setItem("user", user.id);
        router.push("/");
        store.isLoggedIn = true;
      } else {
        // rendera för användaren att man skrivit fel lösen
        errorMessage.value = "Fel lösenord";
      }
    });
  }

  function logOut() {
    localStorage.removeItem("user");
    store.isLoggedIn = false;
    router.push("/");
  }

  // Körs onMount() för att se om man tidigare vart inloggad, fungerar som att man spara sin session så att man slipper logga in helatiden
  function isLoggedIn() {
    localStorage.getItem("user")
      ? (store.isLoggedIn = true)
      : (store.isLoggedIn = false);
  }

  onMounted(() => {
    isLoggedIn();
  });

  return { logIn, logOut, isLoggedIn, errorMessage };
});
