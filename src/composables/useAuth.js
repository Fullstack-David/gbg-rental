import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { userApi } from "@/services/userAPI";
import bcryptjs from "bcryptjs";
import { ref, onMounted } from "vue";

export const useAuth = defineStore("logInOut", () => {
  const isLoggedIn = ref(false);
  const router = useRouter();
  const errorMessage = ref("");

  async function logIn(email, password) {
    errorMessage.value = "";
    const users = await userApi.fetchUsers();
    const user = users.find((user) => user.email === email);
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

  onMounted(() => {
    checkLogin();
  });

  return { logIn, logOut, isLoggedIn, errorMessage };
});
