<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import WInput from '../components/ui/WInput.vue';
import { createUser } from '../lib/appwrite';
import showAlert from '../helpers/alert';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const isCreation = ref(false);
const emit = defineEmits(['close', 'save'])
const isSuccess = ref(false);
const errorMessage = ref("");
const isLoading = ref();
const subscriptions = ref();
const createUserAccount = async () => {
    try {
        isLoading.value = true;
        const us = {
            name: `${user.value.first_name ?? ''} ${user.value.last_name}`,
            phone: '+237' + user.value.phone,
            email: user.value.email
        }
        const newUser = await createUser(JSON.stringify(us));
        if (newUser.responseStatusCode === 200) {
            const result = JSON.parse(newUser.responseBody);
            if (result.$id) {
                console.log('newUser', newUser);
                showAlert('success', t('user_created_sucessfully'));
                emit('save');
                return;
            }
        }
        showAlert('error', t('user_created_Failled'))
        isLoading.value = false;
    } catch (error: any) {
        showAlert('error', t('user_created_Failled'))
        console.log('error', error);
        isLoading.value = false;
    };
}
const user = ref({
    first_name: 's',
    last_name: 's',
    email: 's@gmail.com',
    phone: '650505050'
});
const cancel = () => {
    emit('close')
}
</script>

<template>
    <div>
        <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-7 sm:w-full sm:max-w-lg">
                        <form @submit.prevent="createUserAccount">
                            <div class="bg-white px-4 sm:p-6 sm:pb-2">
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 class="text-base font-heading leading-6 text-gray-900 mb-5"
                                            id="modal-title">{{
                                                $t('createAccount') }}</h3>
                                        <div class="mt-3" v-if="errorMessage">
                                            <div class="text-red">
                                                {{ errorMessage }}
                                            </div>
                                        </div>
                                        <div class="mt-1">
                                            <div class="mb-1 rounded-lg px-0 text-left">
                                                <div class="flex justify-between flex-wrap">
                                                    <div class="mb-2  w-5/12"><label
                                                            class="mb-2 block text-sm font-bold" for="firstname">{{
                                                                $t('firstName') }}</label>
                                                        <WInput :required="true" id="firstname"
                                                            v-model="user.first_name" />
                                                    </div>
                                                    <div class="mb-2 w-6/12"><label class="mb-2 block text-sm font-bold"
                                                            for="lastname">{{
                                                                $t('lastName') }}</label>
                                                        <WInput :required="true" id="lastname"
                                                            v-model="user.last_name" />
                                                    </div>
                                                </div>
                                                <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                        for="email">{{ $t('email') }}</label>
                                                    <WInput type="email" :required="true" id="email"
                                                        v-model="user.email" />
                                                </div>
                                                <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                        for="phone">{{ $t('phone') }}</label>
                                                    <WInput type="text" :required="true" id="phone"
                                                        v-model="user.phone" />
                                                </div>
                                                <!--
                                                <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                        for="address">{{ $t('address') }}</label>
                                                    <WInput type="text" :required="true" id="address"
                                                        v-model="user.address1" />
                                                </div>
                                                <div class="mb-2"><label class=" mb-2 block text-sm font-bold"
                                                        for="cni">{{
                                                            $t('cni') }}</label>
                                                    <WInput type="text" :required="true" id="cni" v-model="user.cni" />
                                                </div>-->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="md:bg-gray-50 px-4 py-3 flex flex-row sm:px-6 justify-between w-full">
                                <button type="button" @click="cancel"
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
    </div>
</template>

<style></style>