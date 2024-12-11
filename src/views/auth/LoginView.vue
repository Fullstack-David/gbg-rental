<template>
  <div class="login-container">
    <h1>Logga in</h1>
    <form @submit.prevent="onLogin">
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
      wo  placeholder="Ange lösenord..."
          required
        />
      </div>
      <button type="submit">Logga in</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useUsers } from "@/composables/useUser";

const {logIn} = useUsers();

const form = reactive({
  email: "",
  password: "",
});

const onLogin = () => {
  console.log("User logged in:", form);
  // Lägg till logik för att hantera inloggning (ex. API-anrop)
  logIn(form.email, form.email.password)
};
</script>

<style scoped>
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

h1 {
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
</style>
