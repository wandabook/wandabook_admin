<template>
    <div class="">
        <h1 class="text-xl font-semibold mb-4">Subscription Management</h1>

        <div class="flex justify-end mb-4">
            <button @click="openCreateModal" class="bg-blue-500 text-white p-2 rounded">
                Add Subscription
            </button>
        </div>

        <ag-grid-vue :columnDefs="columnDefs" :rowData="subscriptions" :pagination="true" :domLayout="'autoHeight'"
            class="ag-theme-quartz"></ag-grid-vue>

        <!-- Create/Edit Modal -->
        <div v-if="isModalOpen"
            class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-99 shadow-lg">
            <div class="bg-white p-6 rounded-lg w-1/3">
                <h2 class="text-xl mb-4">New Subscription Plan</h2>
                <form @submit.prevent="saveSubscription">
                    <input v-model="formData.title" type="text" placeholder="Title" class="border p-2 w-full mb-4"
                        required />
                    <textarea v-model="formData.description" placeholder="Description" class="border p-2 w-full mb-4"
                        required></textarea>
                    <input v-model="formData.monthly_amount" type="number" placeholder="Monthly Amount"
                        class="border p-2 w-full mb-4" required />
                    <input v-model="formData.yearly_amount" type="number" placeholder="Yearly Amount"
                        class="border p-2 w-full mb-4" required />
                    <select v-model="formData.status" class="border p-2 w-full mb-4" required>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <div class="flex justify-end space-x-5">
                        <button type="button" class="bg-red text-white p-2 rounded" @click="closeModal"
                            :disabled="isCreation">
                            Cancel
                        </button>
                        <button type="submit" class="bg-blue-500 text-white p-2 rounded" :disabled="isCreation">
                            <Spinner v-if="isCreation" /> Save Subscription
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { ref } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { createDocumentGlobal, getDocumentsGlobal } from "../lib/appwrite";
import { subscriptionCollection } from "../components/Utilities/constants";
import Spinner from "../components/Utilities/Spinner.vue";
import Actions from "./Actions.vue";
const isCreation = ref(false);
const subscriptions = ref();

const fetchSubscriptions = async () => {
    const result = await getDocumentsGlobal(subscriptionCollection);
    if (result.documents != null && result.documents.length > 0) {
        subscriptions.value = result.documents;
    } else {
        subscriptions.value = [];
    }
    console.log(result);
}
const openCreateModal = () => {
    formData.value = { title: '', description: '', monthly_amount: '', yearly_amount: '', status: 'active' };
    isModalOpen.value = true;
    currentSubscriptionId.value = null;
};
const openEditModal = (subscriptionId: string) => {
};
const saveSubscription = async () => {
    isCreation.value = true;
    await createDocumentGlobal(subscriptionCollection, formData.value);
    isCreation.value = false;
    isModalOpen.value = false;
    fetchSubscriptions();

};
const deleteSubscription = (subscriptionId: string) => {

}

const closeModal = () => {
    isModalOpen.value = false;
    formData.value = { title: '', description: '', monthly_amount: '', yearly_amount: '', status: 'active' };
}

const CustomButtonComponent = {
    template: `
        <div>        
            <button v-on:click="buttonClicked">Push Me!</button>
        </div>
    `,
    methods: {
        buttonClicked() {
            alert("clicked");
        },
    },
};
const columnDefs = [
    { headerName: "Title", field: "title", sortable: true },
    { headerName: "Description", field: "description" },
    { headerName: "Monthly Amount", field: "monthly_amount" },
    { headerName: "Yearly Amount", field: "yearly_amount" },
    { headerName: "Status", field: "status" },
    {
        field: "button",
        headerName: "Actions",
        cellRenderer: 'Actions',

    }
];
const formData = ref({
    title: '',
    description: '',
    monthly_amount: '',
    yearly_amount: '',
    status: 'active'
});
const isModalOpen = ref(false);
const currentSubscriptionId = ref(null);


fetchSubscriptions();
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
