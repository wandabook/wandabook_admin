<script setup lang="ts">
import 'ag-grid-community/styles/ag-grid.css';
import { AgGridVue } from 'ag-grid-vue3';
import { computed, onMounted, ref } from 'vue';
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { getDocuments, getDocumentsFreeze } from '../lib/appwrite';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const patrons = ref<any>([]);
const freezesPatrons = ref<any>([]);

onMounted(async () => {
    const result = await getDocuments();
    if (result.documents != null && result.documents.length > 0) {
        patrons.value = result.documents.map((e) => {
            return { ...e, subcriptionPlanTitle: e.subscriptionPlan?.title }
        })
    }
    console.log(result); const freezes = await getDocumentsFreeze();
    if (freezes.documents != null && freezes.documents.length > 0) {
        freezesPatrons.value = freezes.documents;
    }

})

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

// Colonnes et données des nouveaux utilisateurs
const userColumnDefs = [
    { field: 'name', headerName: 'Nom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'subscriptionType', headerName: 'Type d\'abonnement', flex: 1 },
    { field: 'joinedDate', headerName: 'Date d\'inscription', flex: 1 },
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
            <div class="text-3xl font-bold mb-6">{{ $t('lb_dashboard') }}</div>

            <!-- Section des statistiques principales -->
            <div class="grid grid-cols-4 gap-4 mb-6 ">
                <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ $t('total_patrons') }}</div>
                        <div class="text-gray-400 text-sm">{{ patrons.length }}</div>
                    </div>
                    <div class="bg-green-800  p-3 rounded-full">
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ $t('block_user') }}</div>
                        <div class="text-gray-400 text-sm">{{ freezesPatrons.length }}</div>
                    </div>
                    <div class="bg-red p-3 rounded-full">
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ $t('subscription_expired_this_week') }}</div>
                        <div class="text-gray-400 text-sm">{{ freezesPatrons.length }}</div>
                    </div>
                    <div class="bg-yellow-400  p-3 rounded-full">
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                    <div>
                        <div class="text-xl font-semibold">{{ $t('not_renewed') }}</div>
                        <div class="text-gray-400 text-sm">{{ freezesPatrons.length }}</div>
                    </div>
                    <div class="bg-green-50 p-3 rounded-full">
                    </div>
                </div>
            </div>


            <!-- Tableau des nouveaux utilisateurs de la semaine -->
            <div class="bg-white p-6 rounded-lg shadow-md mb-6">
                <div class="text-lg font-semibold mb-4">{{ $t('new_user_this_week') }}</div>
                <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="colDefs" :rowData="patrons"
                    :pagination="true" :paginationPageSize="10" @row-clicked="onCellClicked"></ag-grid-vue>
            </div>
        </div>

    </div>
</template>

<style></style>