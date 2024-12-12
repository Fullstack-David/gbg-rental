import { useRouter } from 'vue-router'
import { defineStore, storeToRefs } from 'pinia'
import { userApi } from '@/services/userAPI'
import bcryptjs from 'bcryptjs'
import { authStore } from '@/stores/authStore'

export const useUsers = defineStore("counter", () => {
  const router = useRouter();
  const store = authStore();
  // const { logInState, logOutState } = storeToRefs(store); // om man använder "storeToRef()"
  // const { logInState, logOutState } = authStore() // fel?

  async function logIn(email, password) {
    console.log('useUser logIn()')
    console.log('useUser logIn() store.isLoggedIn: ', store.isLoggedIn)
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
        localStorage.setItem("user",
          user.id,
        );
      } else {
        console.log("Incorrect password");
      }
    });

    router.push("/");
    // store.logInState();
    store.isLoggedIn = true // ???!!?!
  }
  
  function logOut() {
    console.log('useUser logOut()')
    console.log('useUser logOut() store.isLoggedIn: ', store.isLoggedIn)
    localStorage.removeItem('user');
    router.push('/');
    // store.logOutState();
    store.isLoggedIn = false // ???!!?!
  }
  
  // vet inte om vi behöver denna funktionen nu när det finns en global ref i "authStore"
  // function isLoggedIn() {
  //   if (localStorage.getItem("user")) {
  //     store.isLoggedIn = true // ???!!?!
  //     // return true;
      
  //   } else {
  //     store.isLoggedIn = false // ???!!?!
  //     // return false;
  //   }
  // }
  return { logIn, logOut/* , isLoggedIn */ };
});