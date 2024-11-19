<template>
    <div class="bg-gray-900  min-h-screen p-6" v-if="patron">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div class="text-3xl font-bold">
                Patron: {{ patron.first_name }} {{ patron.last_name }}
            </div>
            <button @click="goBack" class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                Back to Dashboard
            </button>
        </div>

        <!-- Patron Details Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-2xl font-semibold mb-4">Patron Details</h2>
            <div class="grid grid-cols-2 gap-6">
                <div><strong>Barcode:</strong> {{ patron.barcode }}</div>
                <div><strong>First Name:</strong> {{ patron.first_name }}</div>
                <div><strong>Last Name:</strong> {{ patron.last_name }}</div>
                <div><strong>Email:</strong> {{ patron.email }}</div>
                <div><strong>Phone:</strong> {{ patron.phone }}</div>
                <div><strong>Subscription Plan:</strong> {{ patron.subscriptionPlan }}</div>
                <div><strong>Address:</strong> {{ patron.address }}</div>
                <div><strong>CNI:</strong> {{ patron.cni }}</div>
                <div>
                    <strong>Status:</strong>
                    <span :class="patron.freeze ? 'text-red-500' : 'text-green-500'">
                        {{ patron.freeze ? 'Frozen' : 'Active' }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Actions Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-2xl font-semibold mb-4">Actions</h2>
            <div class="flex space-x-4">
                <button @click="toggleFreeze"
                    :class="patron.freeze ? 'bg-green-500 hover:bg-green-600' : 'bg-red hover:bg-red-600 text-white'"
                    class="px-4 py-2 rounded-md">
                    {{ patron.freeze ? 'Unfreeze' : 'Freeze' }}
                </button>
                <button @click="editPatron" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white">
                    Edit Patron
                </button>
                <button @click="renewSubscription"
                    class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white">
                    Renew Subscription
                </button>
                <button @click="deletePatron" class="px-4 py-2 bg-red hover:bg-red-800 rounded-md text-white">
                    Delete Patron
                </button>
            </div>
        </div>

        <!-- Patron Activity Logs -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4">Activity Logs</h2>
            <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="logColumnDefs" :rowData="activityLogs"
                :pagination="true" :paginationPageSize="10"></ag-grid-vue>
        </div>
    </div>
    <confirmation-popup v-if="showPopup" :title="popupTitle" :message="popupMessage" :onConfirm="confirmAction"
        :onCancel="cancelAction" />
</template>

<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ConfirmationPopup from "@/components/Alerts/ConfirmPopup.vue"
import { AgGridVue } from "ag-grid-vue3";
import router from "../router";
import { getActivities, getSingleDocuments } from "../lib/appwrite";

const { documentId } = router.currentRoute.value.params;

const patron = ref();
const showPopup = ref(false);
const popupTitle = ref("");
const popupMessage = ref("");
const actionToConfirm = ref<null | (() => void)>(null);
// Sample activity logs
const activityLogs = ref();

const logColumnDefs = [
    {
        field: "$createdAt", headerName: "Date", flex: 1
    },
    { field: "log", headerName: "Activity", flex: 2 },
];

// Methods
const goBack = () => {
    alert("Going back to dashboard...");
    // Implement navigation logic
};

const toggleFreeze = () => {
    popupTitle.value = patron.value.freeze ? "Unfreeze Patron" : "Freeze Patron";
    popupMessage.value = `Are you sure you want to ${patron.value.freeze ? "unfreeze" : "freeze"
        } this patron?`;
    actionToConfirm.value = () => {
        patron.value.freeze = !patron.value.freeze;
        alert(`Patron is now ${patron.value.freeze ? "frozen" : "active"}.`);
    };
    showPopup.value = true;
};

const deletePatron = () => {
    popupTitle.value = "Delete Patron";
    popupMessage.value = "Are you sure you want to delete this patron? This action cannot be undone.";
    actionToConfirm.value = () => {
        alert("Patron deleted successfully.");
        // Add deletion logic here
    };
    showPopup.value = true;
};

const renewSubscription = () => {
    popupTitle.value = "Renew Subscription";
    popupMessage.value = "Are you sure you want to renew this patron's subscription?";
    actionToConfirm.value = () => {
        alert("Subscription renewed successfully.");
        // Add renewal logic here
    };
    showPopup.value = true;
};

const confirmAction = () => {
    if (actionToConfirm.value) actionToConfirm.value();
    showPopup.value = false;
};
const editPatron = () => { }

const cancelAction = () => {
    showPopup.value = false;
};

const getDocument = async () => {
    const document = await getSingleDocuments(documentId as string);
    patron.value = document;
}
const getActivitiesLog = async () => {
    const result = await getActivities(documentId as string);
    if (result.documents != null && result.documents.length > 0) {
        activityLogs.value = result.documents;
    }
    console.log(activityLogs);
}
getDocument();
getActivitiesLog()
</script>

<style scoped>
/* Custom AG Grid Styling */
.ag-theme-alpine-dark {
    --ag-header-background-color: #1f2937;
    --ag-row-hover-color: #374151;
}
</style>
