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
                        <p :class="['text-gray-600', 'md:mt-6 mt-2 md:text-base text-sm leading-7']">{{
                            tier.description }}</p>
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

    <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true" v-if="isCreation">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div
                    class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-7 sm:w-full sm:max-w-lg">
                    <form @submit.prevent="createUserAccount">
                        <div class="bg-white px-4 sm:p-6 sm:pb-2">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-heading leading-6 text-gray-900 mb-5" id="modal-title">{{
                                        $t('createAccount') }}</h3>
                                    <div class="mt-3" v-if="errorMessage">
                                        <div class="text-red">
                                            {{ errorMessage }}
                                        </div>
                                    </div>
                                    <div class="mt-1">
                                        <div class="mb-1 rounded-lg px-0 text-left">
                                            <div class="flex justify-between flex-wrap">
                                                <div class="mb-2  w-5/12"><label class="mb-2 block text-sm font-bold"
                                                        for="firstname">{{
                                                            $t('firstName') }}</label>
                                                    <WInput :required="true" id="firstname" v-model="user.first_name" />
                                                </div>
                                                <div class="mb-2 w-6/12"><label class="mb-2 block text-sm font-bold"
                                                        for="lastname">{{
                                                            $t('lastName') }}</label>
                                                    <WInput :required="true" id="lastname" v-model="user.last_name" />
                                                </div>
                                            </div>
                                            <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                    for="email">{{ $t('email') }}</label>
                                                <WInput type="email" :required="true" id="email" v-model="user.email" />
                                            </div>
                                            <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                    for="phone">{{ $t('phone') }}</label>
                                                <WInput type="text" :required="true" id="phone" v-model="user.phone" />
                                            </div>
                                            <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                    for="address">{{ $t('address') }}</label>
                                                <WInput type="text" :required="true" id="address"
                                                    v-model="user.address1" />
                                            </div>
                                            <div class="mb-2"><label class=" mb-2 block text-sm font-bold" for="cni">{{
                                                $t('cni') }}</label>
                                                <WInput type="text" :required="true" id="cni" v-model="user.cni" />
                                            </div>
                                            <!--
                                            <div class="mb-2" v-if="end_user === 'Yes'"><label
                                                    class="mb-2 block text-sm font-bold" for="password">{{
                                                        $t('password') }}</label>
                                                <WInput type="password" :required="true"
                                                    placeholder="******************" id="password"
                                                    v-model="user.password" />
                                            </div>
                                            <div class="mb-2" v-if="end_user === 'Yes'"><label
                                                    class="mb-2 block text-sm font-bold" for="confirm_password">{{
                                                        $t('confirmPassword') }}</label>
                                                <WInput type="password" :required="true"
                                                    placeholder="******************" v-model="confirm_pass"
                                                    id="confirm_password" />
                                            </div>
-->
                                            <div class="mb-6">
                                                <label class="mb-2 flex text-sm"><input type="checkbox" name="accept"
                                                        class="mr-2" :required="true" />
                                                    <div class="text-gray-800">
                                                        <p class="">
                                                            {{ $t('acceptT') }}
                                                            <a href="#"
                                                                class="cursor-pointer text-blue-500 underline">{{
                                                                    $t('termsOfUse') }}</a>
                                                            {{ $t('and') }}
                                                            <a href="#" class="cursor-pointer text-blue-500 underline">
                                                                {{ $t('privacy') }}</a>
                                                        </p>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="md:bg-gray-50 px-4 py-3 flex flex-row sm:px-6 justify-between w-full">
                            <button type="button" @click="isCreation = false"
                                class="mt-2 inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                {{ $t('cancel') }}</button>
                            <button type="submit"
                                class=" justify-center rounded-md bg-brand-default px-3 py- text-sm font-semibold text-white shadow-sm hover:bg-red sm:ml-3 sm:w-auto">
                                <svg aria-hidden="true" role="status" v-if="isLoading"
                                    class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB" />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor" />
                                </svg>
                                {{ $t('createAccount') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" type="module">
import { computed, onMounted, ref } from 'vue';

const isAnnual = ref(false);
const isCreation = ref(false);
const isSuccess = ref(false);
const errorMessage = ref("");

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
import { addNewUser, createNewUser, getDocumentsGlobal, getDocumentsWithFilerGlobal } from '@/lib/appwrite';
import { subscriptionCollection } from '@/components/Utilities/constants';
import { Query } from 'appwrite';
import { useUserStore } from '@/stores/user';
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
    if (confirm_pass.value === user.value.password) {
        isLoading.value = true;
        user.value.notification_email = user.value.email;
        user.value.patron_id = selectedSubscription.value.title;
        user.value.tags = selectedSubscription.value.title + ',' + (isAnnual ? 'One year' : "One Month");
        const result = await addNewUser(JSON.stringify(user.value));
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
}
const onSelectSubscription = (tier: any) => {
    isCreation.value = true;
    selectedSubscription.value = tier;
}
const confirm_pass = ref('password1234');
const end_user = ref('Yes')
const user = ref({
    first_name: 'Tchio',
    last_name: 'Styves',
    email: 'styvesdaudet@gmail.com',
    notification_email: '',
    password: 'password1234',
    phone: "650601933",
    address1: "Message",
    city: 'Yaounde',
    cni: "111112",
    patron_id: "",
    tags: "",

});
fetchSubscriptions();
const createWandaUser = async (barcode: any) => {
    // Get the current date
    const now = new Date();

    // Now + 1 month
    const oneMonthLater = new Date(now);
    oneMonthLater.setMonth(now.getMonth() + 1);

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
        isAnnual: isAnnual.value,
        created_by: employ.value.$id,
        created_by_name: `${employ.value.name ?? ''} ${employ.value.phone ?? ''} ${employ.value.email ?? ''}`
    };
    try {
        const userResult = await createNewUser(userRecord);
        isCreation.value = false;
        isSuccess.value = true;
        redirectToLogin(userResult.$id);
    } catch (e) {
        console.log("error", e);
        errorMessage.value = 'errorOccur'
    }
}
onMounted(() => {
    console.log('em', employ.value)
})
</script>