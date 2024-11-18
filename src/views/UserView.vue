<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments } from '../lib/appwrite';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
const patrons = ref();
onMounted(async () => {
    const result = await getDocuments();
    if (result.documents != null && result.documents.length > 0) {
        patrons.value = result.documents;
    }
    console.log(result);
})

const rowData = ref([
]);

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "barcode", },
    { field: "first_name", headerName: 'First Name' },
    { field: "last_name", headerName: 'Last Name' },
    { field: "email" },
    { field: "phone" },
    { field: "freeze" },
    { field: "address" },
    { field: "cni" },
    { field: "subcriptionPlan" }
]);
</script>

<template>
    <div>
        <div>
            <h1 class="text-5xl font-extrabold mb-10">Users</h1>
        </div>
        <div class="flex justify-end items-center mb-4">
            <button class="px-4 py-2 bg-pink-500 text-sm rounded-md text-white hover:bg-pink-600">
                + Create user
            </button>
        </div>

        <ag-grid-vue :rowData="patrons" :columnDefs="colDefs" style="height: 400px" class="ag-theme-quartz">
        </ag-grid-vue>
    </div>
</template>

<style></style>