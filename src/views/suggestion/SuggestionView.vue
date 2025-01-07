<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments, getDocumentsGlobal } from '@/lib/appwrite';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { suggestionCollection } from '../../components/Utilities/constants';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const suggestions = ref();
onMounted(async () => {
    const result = await getDocumentsGlobal(suggestionCollection);
    if (result.documents != null && result.documents.length > 0) {
        console.log(result.documents);
        suggestions.value = result.documents.map((e) => {
            return { ...e, subcriptionPlanTitle: e.subscriptionPlan?.title }
        })
    }
    console.log(result);
})
const autoSizeStrategy = {
    type: "fitGridWidth", defaultMinWidth: 100,
}
// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "name", headerName: t('name') },
    { field: "subject", headerName: t('subject') },
    { field: "description", headerName: t('description') },
    { field: "$createdAt", headerName: t('createdAt') },
]);
</script>

<template>
    <div>
        <div>
            <h1 class="text-5xl font-extrabold mb-10">{{ $t('suggestions') }}</h1>
        </div>
        <ag-grid-vue :rowData="suggestions" :columnDefs="colDefs" style="height: 400px" class="ag-theme-quartz"
            :autoSizeStrategy="autoSizeStrategy">
        </ag-grid-vue>
    </div>
</template>

<style></style>