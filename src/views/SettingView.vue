<template>
    <div class="bg-gray-900 min-h-screen p-6">
        <!-- Header -->
        <div class="text-3xl font-bold mb-6">Settings</div>

        <!-- Navigation Tabs -->
        <div class="flex space-x-6 mb-6 border-b border-gray-700 pb-3">
            <span class="text-gray-400 cursor-pointer" @click="changeTab('Pricing')">Pricing</span>
            <span class="text-gray-600 cursor-pointer hover:text-gray-400" @click="changeTab('Books')">Books
                new</span>
        </div>

        <!-- Users Section -->
        <div class=" p-6 rounded-lg ">
            <PricingView v-if="selectTab === 'Pricing'" />
            <BooksNews v-if="selectTab === 'Books'"></BooksNews>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import PricingView from './PricingView.vue';
import BooksNews from './BooksNews.vue';
import { ref } from 'vue';
const selectTab = ref('Pricing');
const changeTab = (tab: string) => {
    selectTab.value = tab;
}
</script>

<style scoped></style>
