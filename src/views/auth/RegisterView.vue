<script setup>
import { ref } from "vue";
import { useAuth } from "@/composables/useAuth";

const { addUser } = useAuth();

const form = ref({
  name: "",
  email: "",
  password: "",
});
const confirmPassword = ref("")

const onRegister = async () => {
  if (form.value.password !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  addUser(form.value)
};

</script>

<template>
  <div class="register-container">
    <h2>Registrera</h2>
    <form @submit.prevent="onRegister">
      <div class="form-group">
        <label for="fullName">Namn</label>
        <input type="text" id="fullName" v-model="form.name" placeholder="Ange ditt fullständiga namn" required />
      </div>

      <div class="form-group">
        <label for="email">E-postadress</label>
        <input type="email" id="email" v-model="form.email" placeholder="Ange din e-postadress" required />
      </div>

      <div class="form-group">
        <label for="password">Lösenord</label>
        <input type="password" id="password" v-model="form.password" placeholder="Ange ett lösenord" required />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Bekräfta lösenord</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Bekräfta lösenord" required />
      </div>

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
