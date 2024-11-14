<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments } from '../lib/appwrite';

const patrons = ref();
onMounted(async () => {
    const result = await getDocuments();
    if (result.documents != null && result.documents.length > 0) {
        patrons.value = result.documents;
    }
    console.log(result);
})
</script>

<template>
    <div>

    </div>
</template>

<style></style>