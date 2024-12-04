<script setup>
import { ref } from 'vue';

// Hämta sparat 'item' från JSONBIN.io med rätt användare om de fungerar så?
const item = ref({
    title: 'Title',
    description: 'item-description',
    createdAt: 'createdAt',
    owner: 'owners name',
    image: {
        url: '123',
        alt: 'alt-text'
    },
})

</script>
<template>
    <div class="item">
        <h3>{{ item.title }}</h3>
        <!-- <img :src="item.value.image.url" :alt="item.value.image.alt"> -->
        <p>{{item.description}}</p>
        <p>Created: {{ item.createdAt }}</p>
        <p>Published by: {{ item.owner }}</p>
    </div>
</template>

<style scoped>
    .item {
        border: 2px solid black;
        width: fit-content;
        margin: 1rem;
        padding: 0 1rem;
        border-radius: 1rem;
    }
</style>
