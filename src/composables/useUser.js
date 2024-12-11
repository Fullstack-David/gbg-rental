import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { userApi } from '@/services/userAPI'
import bcrypt from 'bcryptjs'
import { authStore } from '@/stores/authStore'

export const useUsers = defineStore('counter', () => {
  const router = useRouter();
  const users = userApi.fetchUsers();
  const { logInState, logOutState } = authStore

  function logIn(email, password){
    console.log('tjoho')
    localStorage.setItem("user", JSON.stringify({
      id: 1
    }))

    const user = users.find((user) => user.email === email);
    bcrypt.compare(password, user.password, (error, result) => {
      if(result){
        localStorage.setItem('user', {
          id: user.id
        })
        logInState; // VET INTE OM DETTA FUNGERAR /Jens
      } else console.log('Incorrect password')
    })
    router.push('/');
  }

  function logOut(){
    localStorage.removeItem('user');
    logOutState; // VET INTE OM DETTA FUNGERAR /Jens
    router.push('/');
  }

  function isLoggedIn(){
    if(localStorage.getItem('user')) return true
    return false
  }
  return {logIn, logOut, isLoggedIn}
})
