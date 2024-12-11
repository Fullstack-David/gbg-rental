import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { userApi } from '@/services/userAPI'
import bcryptjs from 'bcryptjs'
import { ref } from 'vue'

export const useUsers = defineStore("counter", () => {
  const router = useRouter();
  const isLoggedInState = ref(false)

  async function logIn(email, password) {
    const users = await userApi.fetchUsers();
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
      }),
    );

    const user = users.find((user) => user.email === email);
    bcryptjs.compare(password, user.password, (error, result) => {
      if (result) {
        localStorage.setItem("user", {
          id: user.id,
        });
      } else console.log("Incorrect password");
    });
    router.push("/");
  }

  function logOut() {
    localStorage.removeItem('user')
    isLoggedInState.value = false
    router.push('/');
  }

  function isLoggedIn() {
    if (localStorage.getItem("user")) return true;
    return false;
  }
  return { logIn, logOut, isLoggedIn };
});
