<script setup>
import { ref, computed } from 'vue';

const showModal = ref(false);

const productInfo = ref({
    title: '',
    description: '',
    price: '',
    rentalPeriod: {
        startDate: '',
        endDate: '',
    },
    owner: '',
});

const publishedProducts = ref([]);
const todayDate = new Date().toISOString().split('T')[0];

function differenceInTime(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start && end && end >= start) {
        const differenceInTime = end.getTime() - start.getTime();
        return differenceInTime / (1000 * 3600 * 24);
    } return 0;
}

const rentalDays = ref(0);
const calculateRentalDays = () => {
    rentalDays.value = differenceInTime(productInfo.value.rentalPeriod.startDate, productInfo.value.rentalPeriod.endDate)
}

// pris gånger dag
const totalSum = computed(() => {
    return rentalDays.value * productInfo.value.price;
})

const getInputValue = () => {
    publishedProducts.value.push({ ...productInfo.value });

    // bara kontroll console, raderas sen
    console.log('Publicerade varor:', JSON.parse(JSON.stringify(publishedProducts.value)), `Du har hyrt ut ${productInfo.value.title} med beskrivningen: ${productInfo.value.description} för priset ${productInfo.value.price} under perioden: ${productInfo.value.rentalPeriod.startDate} - ${productInfo.value.rentalPeriod.endDate}`);

    productInfo.value = {
        title: '',
        description: '',
        price: '',
        rentalPeriod: {
            startDate: '',
            endDate: '',
        },
        owner: '',
    }

    // ska den stänga eller ej? hmmm...
    showModal.value = false;
}

// hur lång uthyrningperiod, osäker på om jag ska ha denna eller den andra...
// const rentalDays = computed(() => {
//     const start = new Date(productInfo.value.rentalPeriod.startDate);
//     const end = new Date(productInfo.value.rentalPeriod.endDate);

//     if (start && end && end >= start) {
//         const differenceInTime = end.getTime() - start.getTime();
//         return differenceInTime / (1000 * 3600 * 24);
//     } else {
//         return 0;
//     }
// });
</script>

<template>
    <div class='pub-container'>
        <button @click="showModal = true">Hyr ut något</button>
        <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
        <div class="modal-content">
            <button class="close-btn" @click="showModal = false">x</button>
            <div class="info-field">
                <!-- titel -->
                <input class="prod-title" type="text" placeholder="produktens namn" v-model='productInfo.title'>
            
                <!-- pris per dag -->
                <input class="prod-price" 
                type="text" 
                placeholder="Pris per dag" 
                v-model='productInfo.price'>

                <!--- description -->
                <input class="prod-desc" type="text" placeholder="produktens beskrivning" v-model='productInfo.description'
                minlength="20">


    <!-- 
            <textarea v-model='productInfo.description' placeholder="produktens beskrivning"
            name="" id="" 
            cols="30" rows="5"></textarea> -->

                <div class="date-div">
                    <p>Uthyrningsdatum</p>
                     <!-- start datum för uthyrning -->
                    <p>Från:</p>
                    <input class="start-date" type="date" v-model="productInfo.rentalPeriod.startDate" :min="todayDate" @change="calculateRentalDays">

                    <!-- Slutdatum för uthyrning -->
                    <p>Till</p>
                    <input class="end-date" type="date" v-model="productInfo.rentalPeriod.endDate" :min="todayDate" @change="calculateRentalDays">
                </div>
                <button @click="getInputValue">Publicera vara</button>
                <p> Antal dagar för uthyrning: {{ rentalDays }} </p>
                <p>Totalt pris:  {{ totalSum }} KR</p>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.pub-container {
    border: 2px solid #4CAF50;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 2rem auto;
    font-family: Arial, sans-serif;
    color: #333;
    text-align: center;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    position: relative;
    animation: fadeIn 0.3s ease-in-out;
    /* Lägger till en mjuk öppningsanimation */
}

.close-btn {
    position: absolute;
    top: 4px;
    right: 5px;
    background: red;
    color: white;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 50%;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease-in-out;
}

.close-btn:hover {
    background-color: darkred;
}

.close-btn:active {
    transform: scale(0.9);
}

.info-field {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

input[type="text"],
input[type="date"],
textarea {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease-in-out;
    margin: 0 auto;
    /* Centrerar knappen */
    display: block;
    max-width: 200px;
}

button:hover {
    background-color: #45a049;
}

button:active {
    transform: scale(0.98);
}

.date-div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

p {
    margin: 0;
    font-size: 0.9rem;
    color: #555;
}

textarea {
    resize: none;
}

/* Öppningsanimation för modalen */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
