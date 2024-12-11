<script setup></script>

<template>
  <div class="error-container">
    <div class="error-content">
      <h1 class="error-title">Oops! Sidan kunde inte hittas.</h1>
      <p class="error-message">Den sida du letar efter finns inte eller har flyttats. Prova att gå tillbaka till startsidan.</p>
      <router-link to="/" class="back-home-btn">Tillbaka till startsidan</router-link>
    </div>
  </div>
</template>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh; 
  background-color: #f4f4f9;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.error-content {
  text-align: center;
  max-width: 500px; 
  background-color: #fff;
  padding: 20px 30px; 
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.error-title {
  font-size: 2rem; 
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 15px; 
}

.error-message {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 25px; 
}

.back-home-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.back-home-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .error-title {
    font-size: 1.8rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .back-home-btn {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
}
</style>
