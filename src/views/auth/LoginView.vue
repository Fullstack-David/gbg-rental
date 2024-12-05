<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="onLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="Email-adress..."
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Enter password..."
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  email: "",
  password: "",
});

const onLogin = () => {
  console.log("User logged in:", form);
  // Lägg till logik för att hantera inloggning (ex. API-anrop)
};
</script>

<style scoped>
.login-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 58vh;
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3.3rem;
}
h1 {
  margin-bottom: 3rem;
}
form {
  display: flex;
  flex-direction: column;
  gap: 34px;
}
.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 8rem;
}

button:hover {
  background-color: #0056b3;
}
</style>
