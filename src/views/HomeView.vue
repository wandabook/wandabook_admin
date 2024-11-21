<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import { AgGridVue } from 'ag-grid-vue3';
import { computed, onMounted, ref } from 'vue';
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { getDocuments } from '../lib/appwrite';
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
// Statistiques principales
const stats = [
    { title: 'Personnes en freeze', value: 12, icon: 'fas fa-user-slash' },
    { title: 'Abonnements expirant cette semaine', value: 8, icon: 'fas fa-calendar-alt' },
    { title: 'Abonnements non renouvelés', value: 5, icon: 'fas fa-sync-alt' },
];

// Colonnes et données des nouveaux utilisateurs
const userColumnDefs = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'subscriptionType', headerName: 'Type d\'abonnement', flex: 1 },
    { field: 'joinedDate', headerName: 'Date d\'inscription', flex: 1 },
];
const newUsers = [
    { name: 'Alice Dupont', email: 'alice@example.com', subscriptionType: '1 an', joinedDate: '2024-11-15' },
    { name: 'John Doe', email: 'john@example.com', subscriptionType: '1 mois', joinedDate: '2024-11-16' },
];

// Colonnes et données des abonnements
const subscriptionColumnDefs = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'subscriptionType', headerName: 'Type d\'abonnement', flex: 1 },
    { field: 'status', headerName: 'Statut', flex: 1 },
    { field: 'renewalDate', headerName: 'Date de renouvellement', flex: 1 },
];

const subscriptions = [
    { name: 'Alice Dupont', subscriptionType: '1 an', status: 'Actif', renewalDate: '2025-11-15' },
    { name: 'John Doe', subscriptionType: '1 mois', status: 'Expiré', renewalDate: '2024-12-16' },
    { name: 'Jane Smith', subscriptionType: '3 mois', status: 'Actif', renewalDate: '2025-02-01' },
];
const subscriptionFilter = '' // Filtre sélectionné
const filteredSubscriptions = computed(() => {
    if (subscriptionFilter === '') {
        return subscriptions;
    }
    return subscriptions.filter(
        (sub) => sub.subscriptionType === subscriptionFilter
    );
});
const onCellClicked = (e: any) => {
    window.location.href = '/patrons/' + e.data.$id;
}
</script>

<template>
    <div>
        <div class="bg-gray-900  min-h-screen p-6">
            <!-- Header -->
            <div class="text-3xl font-bold mb-6">Dashboard Bibliothèque</div>

            <!-- Section des statistiques principales -->
            <div class="grid grid-cols-3 gap-4 mb-6 ">
                <div v-for="stat in stats" :key="stat.title"
                    class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <div class="text-2xl font-semibold">{{ stat.value }}</div>
                        <div class="text-gray-400 text-sm">{{ stat.title }}</div>
                    </div>
                    <div class="bg-pink-500 p-3 rounded-full">
                        <i :class="stat.icon" class="text-white"></i>
                    </div>
                </div>
            </div>

            <!-- Tableau des nouveaux utilisateurs de la semaine -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                <div class="text-lg font-semibold mb-4">Nouveaux utilisateurs cette semaine</div>
                <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="colDefs" :rowData="patrons"
                    :pagination="true" :paginationPageSize="10" @row-clicked="onCellClicked"></ag-grid-vue>
            </div>
        </div>

    </div>
</template>

<style></style>