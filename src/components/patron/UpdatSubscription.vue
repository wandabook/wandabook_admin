<template>
    <div class="fixed inset-0 z-999 flex items-center justify-center bg-black/25">
        <!-- Overlay sombre en arrière-plan -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- Conteneur de la modale -->
        <div class="relative z-50 w-full max-w-lg mx-auto overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8"
            role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div>
                <div class="w-full">
                    <div class="w-full p-4">
                        <h3 class="text-lg">
                            {{ $t('price') }}
                        </h3>
                        <div class="flex justify-center max-w-[14rem] m-auto mb-8 lg:mb-5 mt-10">
                            <div class="relative flex w-full p-1 bg-brand-default dark:bg-slate-900 rounded-full">
                                <span class="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                                    <span
                                        class="absolute inset-0 w-1/2 bg-red rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out"
                                        :class="isAnnual ? 'translate-x-full' : 'translate-x-0'"></span>
                                </span>
                                <button
                                    class="relative uppercase font-bold flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out"
                                    :class="isAnnual ? 'text-white dark:text-slate-400 ' : 'text-white'"
                                    @click="isAnnual = false" :aria-pressed="isAnnual">{{ $t('monthly') }}</button>
                                <button
                                    class="  uppercase font-bold relative flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out"
                                    :class="isAnnual ? 'text-white' : 'text-white dark:text-slate-400 '"
                                    @click="isAnnual = true" :aria-pressed="isAnnual">{{ $t('yearly') }}</button>

                            </div>
                        </div>
                        <div class="relative isolate bg-white">
                            <div class="flex flex-wrap gap-4 justify-center">
                                <div v-for="(tier, tierIdx) in subscriptions" :key="tier.id"
                                    class="relative w-full sm:w-[45%] lg:w-[30%] rounded-3xl p-4 ring-1 ring-gray-900/10">
                                    <h3 :id="tier.id"
                                        class="text-brand-default font-extrabold uppercase leading-7 text-center">
                                        {{ $t(tier.title) }}
                                    </h3>
                                    <p class="mt-4 flex justify-center items-baseline gap-x-2" v-if="isAnnual">
                                        <span class="text-gray-900 text-xl lg:text-sm font-bold tracking-tight">
                                            {{
                                                new Intl.NumberFormat('fr-CM', {
                                                    style: 'currency',
                                                    currency: 'XAF',
                                                }).format(tier.yearly_amount)
                                            }}
                                        </span>
                                        <span class="text-gray-500 text-sm md:text-base">/{{ $t('year') }}</span>
                                    </p>
                                    <p class="mt-4 flex justify-center items-baseline gap-x-2" v-else>
                                        <span class="text-gray-900 text-xl lg:text-sm font-bold tracking-tight">
                                            {{
                                                new Intl.NumberFormat('fr-CM', {
                                                    style: 'currency',
                                                    currency: 'XAF',
                                                }).format(tier.monthly_amount)
                                            }}
                                        </span>
                                        <span class="text-gray-500 text-sm md:text-base">/{{ $t('month') }}</span>
                                    </p>
                                    <a :aria-describedby="tier.id" @click="onSelectSubscription(tier)"
                                        :class="(tier.$id === selectedSubscription?.$id) ? 'bg-red' : ''"
                                        class="mt-6 cursor-pointer block w-full bg-brand-default text-white rounded-md px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm hover:bg-brand-default/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-8">

                                        <span v-if="tier.$id === selectedSubscription?.$id">{{ $t('selected') }}</span>
                                        <span v-else>{{ $t('select') }}</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="px-6 py-4 flex justify-between" v-if="selectedSubscription && selectedSubscription.$id">
                    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4">
                        <p class="font-bold">{{ $t('payment.cash_notice_title') }}</p>
                        <p>{{ $t('payment.cash_notice_body') }}</p>
                    </div>
                </div>
                <!-- Boutons -->
                <div class="bg-gray-50 px-6 py-4 flex justify-between">
                    <button type="button" @click="emits('cancel')"
                        class="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                        {{ $t('cancel') }}
                    </button>
                    <button type="button" @click="changeSubscriptionPlan"
                        :disabled="!selectedSubscription || !selectedSubscription.$id"
                        class="inline-flex items-center justify-center rounded-md disabled:bg-brand-default/25 bg-brand-default px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red">
                        <svg aria-hidden="true" role="status" v-if="isLoading"
                            class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor" />
                        </svg>
                        {{ $t('Change') }}
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts" type="module">
import { computed, onMounted, ref } from 'vue';
import { createActivitiesLogs, getDocumentsWithFilerGlobal, updateUser } from '@/lib/appwrite';
import { subscriptionCollection } from '@/components/Utilities/constants';
import { Query } from 'appwrite';
import { useUserStore } from '@/stores/user';
import { generateCashPaymentLog } from '../Utilities/UtilitiesFunction';
import { useI18n } from 'vue-i18n'

const isAnnual = ref(false);
const isCreation = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");
const paymentMethod = ref('cash')
const subscriptions = ref();
const props = defineProps({
    patron: {
        type: Object,
        required: true
    }
});
const emits = defineEmits(['cancel', "refresh"])
const fetchSubscriptions = async () => {
    const result = await getDocumentsWithFilerGlobal(subscriptionCollection, [Query.equal('status', "active")]);
    if (result.documents != null && result.documents.length > 0) {
        subscriptions.value = result.documents;
    } else {
        subscriptions.value = [];
    }
    console.log(result);
}

const selectedSubscription = ref();
const { t } = useI18n()
const isRenew = ref(false);
const userStore = useUserStore();

declare global {
    interface Window {
        CinetPay: any; // Typage de CinetPay si le SDK est chargé dans window
    }
}

const isLoading = ref(false);
const employ = computed(() => {
    return { ...JSON.parse(userStore.getUser) }
});
const onSelectSubscription = (tier: any) => {
    isCreation.value = true;
    selectedSubscription.value = tier;
}

fetchSubscriptions();
const changeSubscriptionPlan = async () => {
    // Get the current date
    const now = new Date();

    // Now + 1 month
    const oneMonthLater = new Date(now);
    oneMonthLater.setMonth(now.getMonth() + 1);

    // Now + 1 year
    const oneYearLater = new Date(now);
    oneYearLater.setFullYear(now.getFullYear() + 1);
    isRenew.value = true;
    isLoading.value = true;
    await updateUser({
        patron_id: props.patron.patron_id,
        tags: props.patron.tags,
        barcode: props.patron.barcode,
        freeze: false,
        subscriptionPlan: props.patron.subscriptionPlan.$id,
        lastSubcriptionDate: new Date(now),
        endSubscriptionDate: isAnnual.value ? oneYearLater : oneMonthLater,
        readCondition: true,
    }, props.patron.$id);
    const amount = isAnnual.value ? selectedSubscription.value.yearly_amount : selectedSubscription.value.monthly_amount;
    const activityLogObjsc = {
        patrons: props.patron.$id,
        subscriptionPlan: selectedSubscription.value.$id,
        paymentMethod: 'cash',
        log: generateCashPaymentLog(`${props.patron.first_name ?? ''} ${props.patron.last_name ?? ''}`, amount, employ.value.name ?? employ.value.email, true)
    }
    const activityLog = await createActivitiesLogs(activityLogObjsc);
    isRenew.value = false;
    isLoading.value = false;
    emits('refresh')
}
onMounted(() => {
    console.log('em', employ.value)
})
</script>