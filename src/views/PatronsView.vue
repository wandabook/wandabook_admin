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
        patrons.value = result.documents.map((e) => {
            return { ...e, subcriptionPlanTitle: e.subscriptionPlan?.title }
        })
    }
    console.log(result);
})

const rowData = ref([
]);

// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "barcode" },
    { field: "first_name", headerName: 'First Name' },
    { field: "last_name", headerName: 'Last Name' },
    { field: "email" },
    { field: "phone" },
    { field: "freeze" },
    { field: "address" },
    { field: "cni" },
    { field: "isAnnual", headerName: 'Annual' },
    { field: "subcriptionPlanTitle", headerName: 'Subscription Plan' }
]);
const onCellClicked = (e: any) => {
    window.location.href = '/patrons/' + e.data.$id;
}
</script>

<template>
    <div>
        <div>
            <h1 class="text-5xl font-extrabold mb-10">Patrons</h1>
        </div>
        <ag-grid-vue :rowData="patrons" :columnDefs="colDefs" style="height: 400px" class="ag-theme-quartz"
            @row-clicked="onCellClicked">
        </ag-grid-vue>
    </div>
</template>

<style></style>