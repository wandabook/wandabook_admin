<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments, getDocumentsFreeze } from '../lib/appwrite';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { useI18n } from "vue-i18n";
import Pagination from '../components/Pagination.vue';
const { t } = useI18n({ useScope: "global" });

const patrons = ref<any>([]);
onMounted(async () => {
    const result = await getDocuments();
    if (result.documents != null && result.documents.length > 0) {
        patrons.value = result.documents.map((e) => {
            return { ...e, subcriptionPlanTitle: e.subscriptionPlan?.title }
        })
    }

})

const rowData = ref([
]);
// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "barcode" },
    { field: "first_name", headerName: t("first_name") },
    { field: "last_name", headerName: t('last_name') },
    {
        field: "subcriptionPlanTitle", headerName: t('subscription_plan'),
        cellRenderer: (params: any) => {
            return params.value ? `<div>
            <span class="px-2 py-1">${params.value ?? ''}</span>
            <span class=" bg-blue-500 px-2 py-1 text-white">${params.data.isAnnual ? t('annual') : t('month')}</span>
            </div>`: "";
        },
    },
    { field: "email", headerName: t('email') },
    { field: "phone", headerName: t('phone') },
    {
        field: "freeze", headerName: t('status'),
        cellRenderer: (params) => {
            return params.value === true
                ? '<span class="bg-red-100 text-red-600  px-2 py-1 rounded">En attente de payment</span>'
                : '<span class="bg-blue-100 text-green-600  px-2 py-1 rounded">Active</span>';
        },
    },
    { field: "address", headerName: t('address') },
    { field: "cni", headerName: t('cni') },
]);

const onCellClicked = (e: any) => {
    window.location.href = '/patrons/' + e.data.$id;
}
const redirectToNew = () => {
    window.location.href = '/patrons/new' // Assuming your login route is named "login"
};
</script>

<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-5xl font-extrabold mb-10">{{ $t('patrons') }}</h1>
            <button @click="redirectToNew"
                class="px-6  my-4  rounded-lg font-medium text-white focus:outline-none bg-blue-500 hover:bg-blue-600">{{
                    $t('new_patons') }}</button>
        </div>
        <div class="bg-white p-6 rounded">
            <ag-grid-vue :rowData="patrons" :columnDefs="colDefs" style="height: 500px" class="ag-theme-quartz"
                @row-clicked="onCellClicked" pagination="true">
            </ag-grid-vue>
        </div>
    </div>
</template>

<style></style>