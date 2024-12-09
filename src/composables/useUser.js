import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { userApi } from '@/services/userAPI'
import bcrypt from 'bcryptjs'
import { ref } from 'vue'

export const useUsers = defineStore('counter', () => {
  const router = useRouter();
  const users = userApi.fetchUsers();
  const isLoggedIn = ref(false)

  function logIn(email, password){
    localStorage.setItem("user", JSON.stringify({
      id: 1
    }))
    isLoggedIn.value = true

    // FICK INTE HÄMTA FRÅN DATTABASEN, DETTA ÄR KODEN FÖR DET
    // const user = users.find((user) => user.email === email);
    // bcrypt.compare(password, user.password, (error, result) => {
      //   if(result){
        //     localStorage.setItem('user', {
    //       id: user.id
    //     })
    //   } else console.log('Incorrect password')
    // })
    router.push('/');
  }

  function logOut(){
    localStorage.removeItem('user')
    isLoggedIn.value = false
    router.push('/');
  }

  return {logIn, logOut, isLoggedIn}
})
