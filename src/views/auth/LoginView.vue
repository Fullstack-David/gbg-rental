<script setup>
import { reactive } from "vue";
import { useAuth } from "@/composables/useAuth";
const { logIn, errorMessage } = useAuth();

const form = reactive({
  email: "",
  password: "",
});
</script>

<template>
  <div class="login-container">
    <h2>Logga in</h2>
    <form @submit.prevent="logIn(form.email, form.password)">
      <div class="form-group">
        <label for="email"> E-postadress</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="E-postadress"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Lösenord</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Ange lösenord..."
          required
        />
      </div>
      <button type="submit">Logga in</button>
      <p v-if="errorMessage" class="error">
        {{ errorMessage }}
      </p>
      <p>
        Inget konto,
        <RouterLink class="create-account-button" to="/register"
          ><span>Registrera här!</span></RouterLink
        >
      </p>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

.login-container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  text-align: center;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h2 {
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}

input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  width: 100%;
  outline: none;
}

input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

.create-account-button {
  color: blue;
  text-decoration: none;
}

.create-account-button:hover {
  cursor: pointer;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
</style>
