<template>
    <div class="bg-gray-900  min-h-screen p-6" v-if="patron">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div class="text-3xl font-bold">
                {{ $t('member') }}: {{ patron.name }} {{ patron.last_name }}
            </div>
            <button @click="goBack" class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                {{ $t('back_to_dashboard') }}
            </button>
        </div>

        <!-- Patron Details Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-2xl font-semibold mb-4">{{ $t('member_details') }}</h2>
            <div class="grid grid-cols-2 gap-6">
                <div><strong>{{ $t('name') }}:</strong> {{ patron.name }}</div>
                <div><strong>{{ $t('email') }}:</strong> {{ patron.email }}</div>
                <div><strong>{{ $t('phone') }}:</strong> {{ patron.phone }}</div>
                <div>
                    <strong>{{ $t('status') }}:</strong>
                    <span :class="patron.freeze ? 'text-red-500' : 'text-green-500'">
                        {{ patron.freeze ? 'Frozen' : 'Active' }}
                    </span>
                </div>
                <div>
                    <strong>{{ $t('created_by') }}: </strong>
                    <span>
                        {{
                            new Intl.DateTimeFormat('fr-CM',
                                {
                                    dateStyle: 'full',
                                    timeStyle: 'long',
                                }
                            ).format(new Date(patron.$createdAt))

                        }}
                    </span>
                </div>
                <div><strong>{{ $t('label') }}:</strong> {{ patron.labels }}</div>
            </div>
        </div>


        <!-- Actions Section -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6" v-if="store.isAdmin">
            <h2 class="text-2xl font-semibold mb-4">Actions</h2>
            <div class="flex space-x-4">

                <button @click="editUser" class="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white">
                    {{ $t('update_user') }}
                </button>
                <button @click="changePassword" class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-md text-white">{{ $t('change_password') }}</button>
                <button @click="deletePatron" class="px-4 py-2 bg-red hover:bg-red-800 rounded-md text-white flex">
                    <Spinner v-if="isDeleting" />
                    {{ $t('delete_user') }}
                </button>
            </div>
        </div>
    </div>
    <confirmation-popup v-if="showPopup" :title="popupTitle" :message="popupMessage" :onConfirm="confirmAction"
        :onCancel="cancelAction" />
    <ChangePasswordModal v-if="showChangePasswordModal" @close="cancelPasswordChange" :patron="patron" />

</template>

<script lang="ts" setup>
import { ref } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ConfirmationPopup from "@/components/Alerts/ConfirmPopup.vue"
import router from "../router";
import { ChangeUserPassword, deleteUser, getActivities, getSingleDocuments, getUserId, updateUser } from "../lib/appwrite";
import Spinner from "../components/Utilities/Spinner.vue";
import { useUserStore } from '@/stores/user';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const { documentId } = router.currentRoute.value.params;
import ChangePasswordModal from "@/components/Modals/ChangePasswordModal.vue";
import Swal from 'sweetalert2';

const patron = ref();
const showPopup = ref(false);
const isDeleting = ref(false);
const store = useUserStore();
const popupTitle = ref("");
const popupMessage = ref("");
const actionToConfirm = ref<null | (() => void)>(null);
// Sample activity logs
const activityLogs = ref();
const showChangePasswordModal = ref(false);


// Methods
const goBack = () => {
    window.location.href = '/users'
};

const editUser = () => { }
const deletePatron = () => {
    popupTitle.value = t('delete_user');
    popupMessage.value = t('delete_user_message');
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



const confirmAction = () => {
    if (actionToConfirm.value) actionToConfirm.value();
    showPopup.value = false;
};

const cancelAction = () => {
    showPopup.value = false;
};
const changePassword = () => {
    showChangePasswordModal.value = true;
}

const cancelPasswordChange = () => {
    showChangePasswordModal.value = false;
};



const getDocument = async () => {
    const us = { id: documentId }
    console.log('document', us);
    const document = await getUserId(JSON.stringify(us));
    console.log('document', document);
    patron.value = JSON.parse(document.responseBody);
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
