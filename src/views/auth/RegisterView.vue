<template>
  <div class="register-container">
    <h1>Registrera</h1>
    <form @submit.prevent="onRegister">
      <!-- Full Name -->
      <div class="form-group">
        <label for="fullName">Fullnamn</label>
        <input
          type="text"
          id="fullName"
          v-model="form.fullName"
          placeholder="Ange ditt fullständiga namn"
          required
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">E-postadress</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Ange din e-postadress"
          required
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Lösenord</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Ange ett lösenord"
          required
        />
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Bekräfta lösenord</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirmPassword"
          placeholder="Bekräfta lösenord"
          required
        />
      </div>

      <!-- Submit Button -->
      <button type="submit">Registrera</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const onRegister = () => {
  // Simpla valideringar
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Simulera registreringsprocess (ersätt med API-anrop)
  console.log("User registered:", {
    fullName: form.fullName,
    email: form.email,
  });
  alert("Registration successful!");
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-top: 3rem;
  margin-bottom: 6rem;
}

.register-container h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.form-group {
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
