<template>
    <div class="bg-gray-900 min-h-screen p-6">
        <!-- Header -->
        <div class="text-3xl font-bold mb-6">Settings</div>

        <!-- Navigation Tabs -->
        <div class="flex space-x-6 mb-6 border-b border-gray-700 pb-3">
            <span class="text-gray-400 cursor-pointer">Pricing</span>
            <span class="text-gray-600 cursor-pointer hover:text-gray-400">Teams</span>
        </div>

        <!-- Users Section -->
        <div class=" p-6 rounded-lg ">
            <!-- Top Bar -->
            <div class="flex justify-end items-center mb-4">
                <button class="px-4 py-2 bg-pink-500 text-sm rounded-md text-white hover:bg-pink-600">
                    + Create user
                </button>
            </div>

            <!-- AG Grid -->
            <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="columnDefs" :rowData="rowData"
                :pagination="true" :paginationPageSize="12"></ag-grid-vue>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import { AgGridVue } from 'ag-grid-vue3';
const nameRenderer = (params: any) => {
    return `<div class="flex items-center space-x-2">
                <div class="bg-pink-500 text-white rounded-full h-8 w-8 flex items-center justify-center">
                  test
                </div>
                <span>${params.value}</span>
              </div>`;
}
const columnDefs = [
    { field: 'name', headerName: 'Name', flex: 1, cellRenderer: nameRenderer('x') },
    { field: 'identifiers', headerName: 'Identifiers', flex: 2 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'labels', headerName: 'Labels', flex: 1 },
    { field: 'joined', headerName: 'Joined', flex: 1 },
    { field: 'lastActivity', headerName: 'Last Activity', flex: 1 },
];
const rowData = [
    {
        name: 'Styves Daudet',
        identifiers: 'styvesdaudet@gmail.com',
        status: 'unverified',
        id: 'User ID',
        labels: '',
        joined: 'Nov 18, 2024, 17:03',
        lastActivity: 'Nov 18, 2024',
    },
];

</script>

<style scoped></style>
