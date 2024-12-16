<script setup>
import { reactive } from "vue";
import { userApi } from '@/services/userAPI'
import { useAuth } from "@/composables/useAuth";
import { v4 as uuid } from 'uuid'

const { logIn } = useAuth();

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const onRegister = async () => {
  // Simpla valideringar
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    await userApi.createUser({
      id: uuid(),
      name: form.fullName,
      email: form.email,
      password: form.password
    })
    await logIn(form.email, form.password)
    alert("Registration successful!");
  }

  catch (error) {
    console.error("Registration error:", error);
    alert("Registration failed!");
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Registrera</h2>
    <form @submit.prevent="onRegister">
      <!-- Full Name -->
      <div class="form-group">
        <label for="fullName">Namn</label>
        <input type="text" id="fullName" v-model="form.fullName" placeholder="Ange ditt fullständiga namn" required />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">E-postadress</label>
        <input type="email" id="email" v-model="form.email" placeholder="Ange din e-postadress" required />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Lösenord</label>
        <input type="password" id="password" v-model="form.password" placeholder="Ange ett lösenord" required />
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Bekräfta lösenord</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" placeholder="Bekräfta lösenord" required />
      </div>

      <!-- Submit Button -->
      <button type="submit">Registrera</button>
    </form>
  </div>
</template>


<style scoped>
.register-container {
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

.register-container h1 {
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
