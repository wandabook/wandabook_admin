<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDocuments, users } from '../lib/appwrite';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridVue } from "ag-grid-vue3"; // Vue Data Grid Component
import { useI18n } from "vue-i18n";
import UserFrom from '@/users/UserFrom.vue';
const { t } = useI18n({ useScope: "global" });
const patrons = ref();
const isCreation = ref(false);
const fetchuser = async () => {
    const result = await users();
    if (result.status === "completed") {
        const res = JSON.parse(result.responseBody);
        patrons.value = res.users;
    }
    console.log(patrons.value);
}
onMounted(async () => {
    await fetchuser();
})
const autoSizeStrategy = { type: "fitGridWidth", defaultMinWidth: 100, }
// Column Definitions: Defines the columns to be displayed.
const colDefs = ref([
    { field: "name", headerName: t('name') },
    { field: "email", headerName: t('email') },
    { field: "phone", headerName: t('phone') },
    { field: "$createdAt", headerName: t('createdAt') },
    { field: "accessedAt", headerName: t('accessedAt') },
    { field: "labels", headerName: t('label') },

]);
const onClose = () => {
    isCreation.value = false;
}
const onSave = async () => {
    isCreation.value = false;
    await fetchuser();
}
const onCellClicked = (e: any) => {
    window.location.href = '/members/' + e.data.$id + '/info';
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div>
                <h1 class="text-5xl font-extrabold mb-10">{{ $t('users') }}</h1>
            </div>
            <div class="justify-center self-center align-middle"><button @click="isCreation = true"
                    class="  px-4 py-2  bg-blue-500  text-sm rounded-md text-white  hover:bg-blue-600">
                    + {{ $t('create_user') }}
                </button></div>
        </div>
        <div class="p-6 bg-white rounded">
            <ag-grid-vue :rowData="patrons" :autoSizeStrategy="autoSizeStrategy" :columnDefs="colDefs"
                style="height: 400px" class="ag-theme-quartz" @row-clicked="onCellClicked">
            </ag-grid-vue>
        </div>
        <template v-if="isCreation">
            <UserFrom @close="onClose" @save="onSave"></UserFrom>
        </template>
    </div>
</template>

<style></style>