<script setup>
import { useItems } from '@/composables/useItems';
import { onMounted } from 'vue';

const { items, isLoading, fetchItems, addItem, updateItem, deleteItem } = useItems()

onMounted(() => {
    fetchItems()
})
</script>

<template>
    <p v-if="isLoading">Laddar..</p>
    <div v-if="!isLoading">
        <h2>Alla annonser</h2>
        <div class="item-container">
            <div v-for="item in items" :key="item.id" class="item">
                <h3>{{ item.title }}</h3>
                <img :src="item.image.url" :alt="item.image.alt">
                <p>{{ item.description }}</p>
                <p>skapad: {{ item.createdAt }}</p>
                <p>Pris: {{ item.price }}:-</p>
                <p>postad av: {{ item.owner }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.item-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
}

.item {
    border: 2px solid black;
    width: 1fr;
    margin: 1rem;
    padding: 0 1rem;
    border-radius: 1rem;
}
</style>
