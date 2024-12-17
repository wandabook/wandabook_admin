<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments, getDocumentsFreeze } from '../lib/appwrite';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { useI18n } from "vue-i18n";
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
    { field: "email", headerName: t('email') },
    { field: "phone", headerName: t('phone') },
    { field: "freeze", headerName: t('freeze') },
    { field: "address", headerName: t('address') },
    { field: "cni", headerName: t('cni') },
    { field: "isAnnual", headerName: t('annuel') },
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