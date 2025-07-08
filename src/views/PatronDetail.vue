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
            <h2 class="text-2xl font-semibold mb-4">{{ $t('patron_details') }}</h2>
            <div class="grid grid-cols-2 gap-6">
                <div><strong>{{ $t('barcode') }}:</strong> {{ patron.barcode }}</div>
                <div><strong>{{ $t('first_name') }}:</strong> {{ patron.first_name }}</div>
                <div><strong>{{ $t('last_name') }}:</strong> {{ patron.last_name }}</div>
                <div><strong>{{ $t('email') }}:</strong> {{ patron.email }}</div>
                <div><strong>{{ $t('phone') }}:</strong> {{ patron.phone }}</div>
                <div><strong>{{ $t('subcription_Plan') }}:</strong> {{ patron.subscriptionPlan?.title }}</div>
                <div><strong>{{ $t('duration_plan') }}:</strong> {{ patron.isAnnual ? "Year" : "Month" }}</div>
                <div><strong>{{ $t('last_subscription') }} </strong> {{
                    new Intl.DateTimeFormat('fr-CM',
                        {
                            dateStyle: 'full',
                            timeStyle: 'long',
                        }
                    ).format(new Date(patron.lastSubcriptionDate))

                }}</div>
                <div><strong>{{ $t('expired_date') }}: </strong>{{
                    new Intl.DateTimeFormat('fr-CM',
                        {
                            dateStyle: 'full',
                            timeStyle: 'long',
                        }
                    ).format(new Date(patron.endSubscriptionDate))

                }} </div>
                <div><strong>{{ $t('address') }}: </strong> {{ patron.address }}</div>
                <div><strong>{{ $t('NIC') }}: </strong> {{ patron.cni }}</div>
                <div>
                    <strong>{{ $t('status') }}:</strong>
                    <span :class="patron.freeze ? 'text-red-500' : 'text-green-500'">
                        {{ patron.freeze ? 'Frozen' : 'Active' }}
                    </span>
                </div>
                <div>
                    <strong>{{ $t('created_by') }}: </strong>
                    <span>
                        {{ patron.created_by_name }}
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
                    <Spinner v-if="isRenew" />
                    {{ $t('renew_subscription') }}
                </button>
                <button @click="changeSubsciption"
                    class="px-4 py-2 bg-yellow-950 hover:bg-yellow-800 rounded-md text-white">
                    <Spinner v-if="isRenew" />
                    {{ $t('change_subscription') }}
                </button>
                <button @click="deletePatron" class="px-4 py-2 bg-red hover:bg-red-800 rounded-md text-white flex">
                    <Spinner v-if="isDeleting" />
                    {{ $t('delete_patron') }}
                </button>
                <button @click="identification" class="px-4 py-2 bg-brand-default hover:bg-red-800 rounded-md text-white flex">
                    <Spinner v-if="isDeleting" />
                    {{ $t('identification') }}
                </button>
            </div>
        </div>
        <!-- patron documents -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 class="text-2xl font-semibold mb-4">{{ $t('Documents') }}</h2>
            <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="colDocumentDefs" :rowData="patron.documents"
                :pagination="true" :paginationPageSize="10" @cellClicked="onCellClicked"></ag-grid-vue>
        </div>
        <!-- Patron Activity Logs -->
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4">{{ $t('Activity Logs') }}</h2>
            <ag-grid-vue class="ag-theme-quartz w-full h-96" :columnDefs="logColumnDefs" :rowData="activityLogs"
                :pagination="true" :paginationPageSize="10"></ag-grid-vue>
        </div>
    </div>
    <confirmation-popup v-if="showPopup" :title="popupTitle" :message="popupMessage" :onConfirm="confirmAction"
        :onCancel="cancelAction">
        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4" v-if="show">
            <p class="font-bold">{{ $t('payment.cash_notice_title') }}</p>
            <p>{{ $t('payment.cash_notice_body') }}</p>
        </div>
    </confirmation-popup>
    <UpdatSubscription :patron="patron" @cancel="closeModal" @refresh="refreshPage" v-if="isChanging">
    </UpdatSubscription>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import ConfirmationPopup from "@/components/Alerts/ConfirmPopup.vue"
import { AgGridVue } from "ag-grid-vue3";
import router from "../router";
import { createActivitiesLogs, deleteUser, getActivities, getSingleDocuments, updateUser } from "../lib/appwrite";
import Spinner from "../components/Utilities/Spinner.vue";
import showAlert from "../helpers/alert";
import { useI18n } from "vue-i18n";
import { generateCashPaymentLog } from "../components/Utilities/UtilitiesFunction";
import { useUserStore } from "../stores/user";
const { t } = useI18n({ useScope: "global" });
import UpdatSubscription from "../components/patron/UpdatSubscription.vue";
const { documentId } = router.currentRoute.value.params;
const patron = ref();
const showPopup = ref(false);
const isDeleting = ref(false);
const isFreezing = ref(false);
const isRenew = ref(false);
const isChanging = ref(false);
const popupTitle = ref("");
const action = ref<string>('');
const popupMessage = ref("");
const actionToConfirm = ref<null | (() => void)>(null);
// Sample activity logs
const activityLogs = ref();
const userStore = useUserStore();
const show = computed(() => {
    console.log('action.value', action.value)
    console.log(action.value === 'renew')
    return (action.value.toLocaleLowerCase() === 'renew')
})
const employ = computed(() => {
    return { ...JSON.parse(userStore.getUser) }
});
const colDocumentDefs = [
    { field: "title", headerName: t("Title"), flex: 1 },
    {
        field: "type",
        headerName: t("Type"),
        flex: 1,
        cellRenderer: (params: any) => {
            return params.value ? `<span class="px-2 py-1">${params.value}</span>` : "";
        },
    },
    {
        field: "createdAt",
        headerName: t("Created At"),
        flex: 1,
        valueFormatter: ({ value }: { value: string }) => {
            if (!value) return "";
            const date = new Date(value);
            return new Intl.DateTimeFormat("fr-FR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(date);
        },
    },
];
const logColumnDefs = [
    {
        field: "$createdAt",
        headerName: t("Date"),
        flex: 1,
        valueFormatter: ({ value }: { value: string }) => {
            if (!value) return "";
            const date = new Date(value);
            return new Intl.DateTimeFormat("fr-FR", {
                dateStyle: "short",
                timeStyle: "short",
            }).format(date);
        },
    },
    {
        field: "log",
        headerName: t("Activity"),
        flex: 2,
        wrapText: true,
        autoHeight: true,
    },
    {
        field: "paymentMethod",
        headerName: t("paymentMethod"),
        flex: 1,
    },
    {
        field: "subscriptionPlan.title",
        headerName: t("subscriptionPlan"),
        flex: 1,
    },
];


// Methods
const goBack = () => {
    window.location.href = '/patrons'
};
const onCellClicked = (e: any) => {
    window.location.href = '/documents/' + e.data.$id;
};
const identification = () => {
    window.location.href = '/identification/'+patron.value.$id;
}
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
    action.value = 'renew'
    popupTitle.value = t('renew_subscription');
    popupMessage.value = t('renew_subscription_messsage');
    actionToConfirm.value = async () => {

        // Get the current date
        const now = new Date(patron.value.endSubscriptionDate);

        // Now + 1 month
        const oneMonthLater = new Date(now);
        oneMonthLater.setMonth(now.getMonth() + 1);

        // Now + 1 year
        const oneYearLater = new Date(now);
        oneYearLater.setFullYear(now.getFullYear() + 1);
        isRenew.value = true;
        await updateUser({
            patron_id: patron.value.patron_id,
            tags: patron.value.tags,
            barcode: patron.value.barcode,
            freeze: false,
            subscriptionPlan: patron.value.subscriptionPlan.$id,
            lastSubcriptionDate: new Date(now),
            endSubscriptionDate: patron.value.isAnnual.value ? oneYearLater : oneMonthLater,
            readCondition: true,
        }, patron.value.$id);
        const amount = patron.value.isAnnual.value ? patron.value.subscriptionPlan.yearly_amount : patron.value.subscriptionPlan.monthly_amount;
        const activityLogObjsc = {
            patrons: patron.value.$id,
            subscriptionPlan: patron.value.subscriptionPlan.$id,
            paymentMethod: 'cash',
            log: generateCashPaymentLog(`${patron.value.first_name ?? ''} ${patron.value.last_name ?? ''}`, amount, employ.value.name ?? employ.value.email, true)
        }
        const activityLog = await createActivitiesLogs(activityLogObjsc);
        refresh();
        isRenew.value = false;
        action.value = "";
        showAlert('success', t('renew_succes'));
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
const refresh = () => {
    getDocument();
    getActivitiesLog()
}
const changeSubsciption = () => {
    isChanging.value = true;
}
const closeModal = () => {
    isChanging.value = false;
}
const refreshPage = () => {
    isChanging.value = false;
    showAlert('success', t('renew_succes'));
    refresh();
}
refresh()
</script>

<style scoped>
/* Custom AG Grid Styling */
.ag-theme-alpine-dark {
    --ag-header-background-color: #1f2937;
    --ag-row-hover-color: #374151;
}

.log-cell-wrap {
    white-space: pre-wrap !important;
    overflow-wrap: anywhere;
    word-break: break-word;
    line-height: 1.4;
    white-space: normal;
}
</style>
