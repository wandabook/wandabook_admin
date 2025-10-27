<template>



    <section class="w-full hidden md:block">
        <div class="w-full px-3 md:px-20 xl:px-40 py-24 max-w-[1440px] mx-auto">
            <h3
                class="text-[32px] lg:text-[42px] text-brand-dark-blu capitalize text-center lg:text-left mb-8 lg:mb-12 font-thin">
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
                        :class="isAnnual ? 'text-white dark:text-slate-400 ' : 'text-white'" @click="isAnnual = false"
                        :aria-pressed="isAnnual">{{ $t('monthly') }}</button>
                    <button
                        class="  uppercase font-bold relative flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out"
                        :class="isAnnual ? 'text-white' : 'text-white dark:text-slate-400 '" @click="isAnnual = true"
                        :aria-pressed="isAnnual">{{ $t('yearly') }}</button>

                </div>
            </div>
            <div class="relative isolate bg-white md:px-6 py-5 sm:py-10 lg:px-8">
                <div
                    class="mx-auto mt-1 grid max-w-lg grid-cols-3 items-center gap-y-6 lg:mt-1  lg:max-w-4xl lg:grid-cols-3 space-x-2">
                    <div v-for="(tier, tierIdx) in subscriptions" :key="tier.id"
                        :class="['relative shadow-2xl', 'lg:rounded-t-3xl lg:rounded-tr-3xl', 'rounded-3xl md:pt-4 px-4 p-3 ring-1 ring-gray-900/10 ']">
                        <h3 :id="tier.id" :class="['text-brand-default font-extrabold uppercase leading-7']">
                            {{ $t(tier.title) }}</h3>
                        <p class="mt-4 flex items-baseline gap-x-2" v-if="isAnnual">
                            <span :class="['text-gray-900', 'md:text-2xl text-sm font-bold tracking-tight']">{{
                                new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(
                                    tier.yearly_amount,
                                )
                            }}</span>
                            <span :class="['text-gray-500', 'md:text-base text-sm']">/{{ $t('year') }}</span>
                        </p>
                        <p class="mt-4 flex items-baseline gap-x-2" v-else>
                            <span :class="['text-gray-900', 'lg:text-2xl text-sm font-bold tracking-tight']">{{
                                new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(
                                    tier.monthly_amount,
                                )
                            }}</span>
                            <span :class="['text-gray-500', 'md:text-base  text-sm']">/{{ $t('month') }}</span>
                        </p>
                        <!--  <p :class="['text-gray-600', 'md:mt-6 mt-2 md:text-base text-sm leading-7']">{{
                            tier.description }}</p> -->
                        <a :aria-describedby="tier.id" @click="onSelectSubscription(tier)"
                            :class="['bg-brand-default text-white shadow-sm hover:bg-brand-default/80', 'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10']">
                            {{ $t('subscribeNow') }}

                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--Mobile app-->
    <section class="w-full md:hidden">
        <div class="w-full max-w-[1440px] mx-auto">
            <h3 class="text-xl px-5 text-left capitalize font-heading">
                {{ $t('price') }}
            </h3>
            <div class="flex justify-center max-w-[14rem] m-auto mb-2  mt-2">
                <div class="relative flex w-full p-1 bg-brand-default dark:bg-slate-900 rounded-full">
                    <span class="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                        <span
                            class="absolute inset-0 w-1/2 bg-red rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out"
                            :class="isAnnual ? 'translate-x-full' : 'translate-x-0'"></span>
                    </span>
                    <button
                        class="relative uppercase font-bold flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out"
                        :class="isAnnual ? 'text-white dark:text-slate-400 ' : 'text-white'" @click="isAnnual = false"
                        :aria-pressed="isAnnual">{{ $t('monthly') }}</button>
                    <button
                        class="  uppercase font-bold relative flex-1 text-sm h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out"
                        :class="isAnnual ? 'text-white' : 'text-white dark:text-slate-400 '" @click="isAnnual = true"
                        :aria-pressed="isAnnual">{{ $t('yearly') }}</button>
                </div>
            </div>
            <div class="relative isolate bg-white md:px-6 pt-2 pb-3 px-5">
                <div
                    class="mx-auto mt-1 grid max-w-lg grid-cols-3 items-center gap-y-6 lg:mt-1 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 space-x-2">
                    <div v-for="(tier, tierIdx) in subscriptions" :key="tier.id" @click="onSelectSubscription(tier)"
                        :class="['relative md:mx-5', 'rounded-3xl p-3 ring-1 ring-gray-900/10 sm:p-10']">
                        <h3 :id="tier.id" :class="['text-brand-default font-extrabold uppercase  text-sm']">
                            {{ $t(tier.title) }}</h3>
                        <div class="mt-2">{{ $t('unlimited') }}</div>
                        <p class="mt-2 flex items-baseline gap-x-2" v-if="isAnnual">
                            <span :class="['text-gray-900', 'md:text-5xl text-sm font-bold tracking-tight']">{{
                                new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(
                                    tier.yearly_amount,
                                )
                            }}</span>
                        </p>
                        <p class="mt-2 flex items-baseline gap-x-2" v-else>
                            <span :class="['text-gray-900', 'lg:text-5xl text-sm font-bold tracking-tight']">{{
                                new Intl.NumberFormat('fr-CM', { style: 'currency', currency: 'XAF' }).format(
                                    tier.monthly_amount,
                                )
                            }}</span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <div v-if="isCreation" class="fixed inset-0 z-999 flex items-center justify-center bg-black/25">
        <!-- Overlay sombre en arrière-plan -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <!-- Conteneur de la modale -->
        <div class="relative z-50 w-full max-w-lg mx-auto overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8"
            role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <form @submit.prevent="createUserAccount">
                <!-- Contenu principal -->
                <div class="bg-white px-6 py-4">
                    <h3 class="text-title-md font-heading text-gray-900 mb-5" id="modal-title">
                        {{ $t('createAccount') }}
                    </h3>

                    <!-- Message d'erreur -->
                    <div v-if="errorMessage" class="text-red mb-3">
                        {{ errorMessage }}
                    </div>

                    <!-- Form fields -->
                    <div class="space-y-3">
                        <div class="flex gap-4">
                            <div class="w-1/2">
                                <label for="firstname" class="block text-sm font-bold mb-1">{{ $t('firstName')
                                }}</label>
                                <WInput id="firstname" v-model="user.first_name" :required="true" />
                            </div>
                            <div class="w-1/2">
                                <label for="lastname" class="block text-sm font-bold mb-1">{{ $t('lastName') }}</label>
                                <WInput id="lastname" v-model="user.last_name" :required="true" />
                            </div>
                        </div>

                        <div>
                            <label for="email" class="block text-sm font-bold mb-1">{{ $t('email') }}</label>
                            <WInput id="email" v-model="user.email" type="email" :required="true" />
                        </div>

                        <div>
                            <label for="phone" class="block text-sm font-bold mb-1">{{ $t('phone') }}</label>
                            <PhoneInput id="phone" v-model="user.phone" :required="true" />
                        </div>

                        <div>
                            <label for="address" class="block text-sm font-bold mb-1">{{ $t('address') }}</label>
                            <WInput id="address" v-model="user.address1" type="text" :required="true" />
                        </div>

                        <div>
                            <WInputCNI id="cni" v-model="user.cni" :required="true" />
                        </div>

                        <!-- Conditions -->
                        <div class="mt-4">
                            <label class="flex text-sm">
                                <input type="checkbox" class="mr-2" required />
                                <span class="text-gray-800">
                                    {{ $t('acceptT') }}
                                    <a href="#" class="text-blue-500 underline">{{ $t('termsOfUse') }}</a>
                                    {{ $t('and') }}
                                    <a href="#" class="text-blue-500 underline">{{ $t('privacy') }}</a>
                                </span>
                            </label>
                        </div>
                        <div v-if="paymentMethod === 'cash'"
                            class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4">
                            <p class="font-bold">{{ $t('payment.cash_notice_title') }}</p>
                            <p>{{ $t('payment.cash_notice_body') }}</p>
                        </div>
                    </div>
                </div>

                <!-- Boutons -->
                <div class="bg-gray-50 px-6 py-4 flex justify-between">
                    <button type="button" @click="isCreation = false"
                        class="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100">
                        {{ $t('cancel') }}
                    </button>
                    <button type="submit"
                        class="inline-flex items-center justify-center rounded-md bg-brand-default px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red">
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
                        {{ $t('createAccount') }}
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>
<script setup lang="ts" type="module">
import { computed, onMounted, ref } from 'vue';

const isAnnual = ref(false);
const isCreation = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");
const paymentMethod = ref('cash')
const subscriptions = ref();

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
import WInput from '@/components/ui/WInput.vue';
import { addNewUser, createActivitiesLogs, createNewUser, getDocumentsGlobal, getDocumentsWithFilerGlobal } from '@/lib/appwrite';
import { subscriptionCollection } from '@/components/Utilities/constants';
import { Query } from 'appwrite';
import { useUserStore } from '@/stores/user';
import PhoneInput from '../Forms/PhoneInput.vue';
import WInputCNI from '../Forms/WInputCNI.vue';
import { generateCashPaymentLog, generateTemporaryPassword, generateWelcomeMessage, sendEmail } from '../Utilities/UtilitiesFunction';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const userStore = useUserStore();

const redirectToLogin = (id: string) => {
    window.location.href = '/patrons/' + id // Assuming your login route is named "login"
};
declare global {
    interface Window {
        CinetPay: any; // Typage de CinetPay si le SDK est chargé dans window
    }
}

const isLoading = ref(false);
const employ = computed(() => {
    return { ...JSON.parse(userStore.getUser) }
});
const createUserAccount = async () => {
    errorMessage.value = "";
    isLoading.value = true;
    user.value.notification_email = user.value.email;
    user.value.patron_id = selectedSubscription.value.title;
    user.value.tags = selectedSubscription.value.title + ',' + (isAnnual ? 'One year' : "One Month");
    const result = await addNewUser(JSON.stringify(user.value));
    console.log("result", result);
    if (result.status === 'failed') {
        errorMessage.value = 'an error occur. please try again or contact the support'
    } else if (result.status === 'completed') {
        const response = JSON.parse(result.responseBody);
        if (response.result && response.result.error) {
            errorMessage.value = 'an error occur. please try again or contact the support'
        } else {
            await createWandaUser(response.result.barcode);
        }
    }
    isLoading.value = false;

}
const onSelectSubscription = (tier: any) => {
    isCreation.value = true;
    selectedSubscription.value = tier;
}
const confirm_pass = ref('');
const end_user = ref('Yes')
const user = ref({
    first_name: '',
    last_name: '',
    email: '',
    notification_email: '',
    password: generateTemporaryPassword(),
    phone: "",
    address1: "",
    city: '',
    cni: "",
    patron_id: "",
    tags: "",

});
fetchSubscriptions();
const createWandaUser = async (barcode: any) => {
    // Get the current date
    const now = new Date();

    // Now + 1 month
    const oneMonthLater = new Date(now);
    oneMonthLater.setMonth(now.getMonth() + 3);

    // Now + 1 year
    const oneYearLater = new Date(now);
    oneYearLater.setFullYear(now.getFullYear() + 1);
    let userRecord = {
        first_name: user.value.first_name,
        last_name: user.value.last_name,
        email: user.value.email,
        phone: user.value.phone,
        address: user.value.address1,
        city: user.value.city,
        freeze: false,
        barcode: barcode,
        cni: user.value.cni,
        subscriptionPlan: selectedSubscription.value.$id,
        lastSubcriptionDate: new Date(now),
        endSubscriptionDate: isAnnual.value ? oneYearLater : oneMonthLater,
        readCondition: true,
        patron_id: selectedSubscription.value.title,
        tags: selectedSubscription.value.title + ',' + (isAnnual ? 'One year' : "One Month"),
        isAnnual: isAnnual.value,
        created_by: employ.value.$id,
        created_by_name: `${employ.value.name ?? ''} ${employ.value.phone ?? ''} ${employ.value.email ?? ''}`
    };
    try {
        const userResult = await createNewUser(userRecord);
        const amount = isAnnual.value ? selectedSubscription.value.yearly_amount : selectedSubscription.value.monthly_amount;
        const activityLogObjsc = {
            patrons: userResult.$id,
            subscriptionPlan: selectedSubscription.value.$id,
            paymentMethod: paymentMethod.value,
            log: generateCashPaymentLog(`${userRecord.first_name ?? ''} ${userRecord.last_name ?? ''}`, amount, employ.value.name ?? employ.value.email, false)
        }
        const activityLog = await createActivitiesLogs(activityLogObjsc);
        try {
            await sendEmail({
                to: user.value.email,
                subject: 'Confirmation de votre abonnement',
                text: generateWelcomeMessage(
                    user.value.first_name,
                    barcode,
                    user.value.password,
                    import.meta.env.VITE_APP_LOGIN_LINK
                )
            });
        } catch (error) {
            console.error("Error sending email:", error);
        }
        isCreation.value = false;
        isSuccess.value = true;
        redirectToLogin(userResult.$id);
    } catch (e) {
        console.log("error", e);
        errorMessage.value = t('errorOccur')
    }
}
onMounted(() => {
    console.log('em', employ.value)
})
</script>
