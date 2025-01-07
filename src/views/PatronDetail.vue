<template>
    <div class="bg-gray-900  min-h-screen p-6" v-if="patron">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div class="text-3xl font-bold">
                {{ $t('patron') }}: {{ patron.first_name }} {{ patron.last_name }}
            </div>
            <button @click="goBack" class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                {{ $t('back_to_dashboard') }}
            </button>
        </div>

        <!-- Patron Details Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-2xl font-semibold mb-4">Patron Details</h2>
            <div class="grid grid-cols-2 gap-6">
                <div><strong>{{ $t('barcode') }}:</strong> {{ patron.barcode }}</div>
                <div><strong>{{ $t('first_name') }}:</strong> {{ patron.first_name }}</div>
                <div><strong>{{ $t('last_name') }}:</strong> {{ patron.last_name }}</div>
                <div><strong>{{ $t('email') }}:</strong> {{ patron.email }}</div>
                <div><strong>{{ $t('phone') }}:</strong> {{ patron.phone }}</div>
                <div><strong>{{ $t('subcription_Plan') }}:</strong> {{ patron.subscriptionPlan?.title }}</div>
                <div><strong>{{ $t('duration_plan') }}:</strong> {{ patron.isAnnual ? "Year" : "Month" }}</div>
                <div><strong>{{ $t('last_subscription') }}</strong> {{
                    new Intl.DateTimeFormat('fr-CM',
                        {
                            dateStyle: 'full',
                            timeStyle: 'long',
                        }
                    ).format(new Date(patron.lastSubcriptionDate))

                }}</div>
                <div><strong>{{ $t('expired_date') }}:</strong>{{
                    new Intl.DateTimeFormat('fr-CM',
                        {
                            dateStyle: 'full',
                            timeStyle: 'long',
                        }
                    ).format(new Date(patron.endSubscriptionDate))

                }} </div>
                <div><strong>{{ $t('address') }}:</strong> {{ patron.address }}</div>
                <div><strong>{{ $t('NIC') }}:</strong> {{ patron.cni }}</div>
                <div>
                    <strong>{{ $t('status') }}:</strong>
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
                    :class="patron.freeze ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red hover:bg-red-600 text-white'"
                    class="px-4 py-2 rounded-md flex gap-3">
                    <Spinner v-if="isFreezing" />
                    {{ patron.freeze ? 'Unfreeze' : 'Freeze' }}
                </button>
                <button @click="editPatron" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white">
                    {{ $t('edit_patron') }}
                </button>
                <button @click="renewSubscription"
                    class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white">
                    {{ $t('renew_subscription') }}
                </button>
                <button @click="deletePatron" class="px-4 py-2 bg-red hover:bg-red-800 rounded-md text-white flex">
                    <Spinner v-if="isDeleting" />
                    {{ $t('delete_patron') }}
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
import { deleteUser, getActivities, getSingleDocuments, updateUser } from "../lib/appwrite";
import Spinner from "../components/Utilities/Spinner.vue";
import showAlert from "../helpers/alert";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const { documentId } = router.currentRoute.value.params;

const patron = ref();
const showPopup = ref(false);
const isDeleting = ref(false);
const isFreezing = ref(false);
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
    actionToConfirm.value = async () => {
        isFreezing.value = true;
        await updateUser({
            patron_id: patron.value.patron_id,
            tags: patron.value.tags,
            barcode: patron.value.barcode,
            freeze: !patron.value.freeze
        }, patron.value.$id);
        patron.value.freeze = !patron.value.freeze;
        isFreezing.value = false;
        showAlert('success', `Patron is now ${patron.value.freeze ? "frozen" : "active"}.`);
    };
    showPopup.value = true;
};

const deletePatron = () => {
    popupTitle.value = t('delete_patron');
    popupMessage.value = t('delete_patron_message');
    actionToConfirm.value = async () => {
        isDeleting.value = true;
        const result = await deleteUser({
            documentId: patron.value.$id,
            barcode: patron.value.barcode
        });
        isDeleting.value = false;
        history.back();
    };
    showPopup.value = true;
};

const renewSubscription = () => {
    popupTitle.value = t('renew_subscription');
    popupMessage.value = t('renew_subscription_messsage');
    actionToConfirm.value = () => {
        showAlert('success', t('renew_succes'));
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
