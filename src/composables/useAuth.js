import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { userApi } from '@/services/userAPI'
import bcryptjs from 'bcryptjs'
import { authStore } from '@/stores/authStore'
import { onMounted } from 'vue'

export const useUsers = defineStore("logInOut", () => {
  const router = useRouter();
  const store = authStore();

  async function logIn(email, password) {
    const users = await userApi.fetchUsers();

    const user = users.find((user) => user.email === email);
    // if (!user) rendera felmeddelande till användaren
    bcryptjs.compare(password, user.password, (error, result) => {
      if (result) {
        localStorage.setItem("user",
          user.id,
        );
      } else {
        console.log("Incorrect password");
        // rendera för användaren att man skrivit fel lösen
      }
    });

    router.push("/");
    store.isLoggedIn = true
  }

  function logOut() {
    localStorage.removeItem('user');
    store.isLoggedIn = false
    router.push('/');
  }

  // Körs onMount() för att se om man tidigare vart inloggad, fungerar som att man spara sin session så att man slipper logga in helatiden
  function isLoggedIn() {
    localStorage.getItem("user") ? store.isLoggedIn = true : store.isLoggedIn = false
  }

  onMounted(() => {
    isLoggedIn();
  });

  return { logIn, logOut, isLoggedIn };
});