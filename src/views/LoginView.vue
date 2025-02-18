<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getUser, login, users } from '../lib/appwrite';
import { userSessionStore } from '../stores';
import { useUserStore } from '../stores/user';
import showAlert from '../helpers/alert';
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });
const password = ref('');
const email = ref('');
const isLoading = ref(false);
const session = userSessionStore();
const userStore = useUserStore();
const passwordVisible = ref(false);

const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

const loginUser = async () => {
    try {
        isLoading.value = true;
        const ss = await login(email.value, password.value);
        session.toggleSidebar(ss);
        userStore.login(await getUser(), ss.userId);
        window.location.href = '/';
    } catch (e) {
        console.log(e);
        showAlert('error', t("login_fail"))
    } finally {
        isLoading.value = false;
    }

}

onMounted(async () => {
    console.log()
})
</script>

<template>
    <div class="bg-grey-lighter text-base text-grey-darkest font-normal relative">
        <div class="container mx-auto p-8">
            <div class="mx-auto max-w-sm">
                <div class="py-10 flex justify-center">
                    <img src="@/assets/images/logo/Plandetravail23.png" alt="Logo" class="h-15" />
                </div>

                <div class="bg-white rounded shadow">
                    <div class="border-b py-8 font-bold text-black text-center text-xl tracking-widest uppercase">
                        {{ $t('welcome_back') }}
                    </div>

                    <form class="bg-grey-lightest px-10 py-10" @submit.prevent="loginUser">


                        <!-- Email input -->
                        <div class="relative mb-4">
                            <input v-model="email" type="text"
                                class="peer block  w-full h-13 text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-brand-default focus:outline-none focus:ring-0 focus:border-brand-default px-3 py-2 leading-[1.6] transition-all duration-200 ease-linear"
                                id="userName" placeholder=" " required />
                            <label for="userName"
                                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-brand-default peer-focus:dark:text-brand-default peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none">
                                {{ $t('email') }}
                            </label>
                        </div>
                        <div class="relative mb-4">
                            <input v-model="password" :type="passwordVisible ? 'text' : 'password'"
                                class="peer block h-13 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-brand-default focus:outline-none focus:ring-0 focus:border-brand-default px-3 py-2 leading-[1.6] transition-all duration-200 ease-linear"
                                id="password" placeholder=" " required />
                            <label for="password"
                                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-brand-default peer-focus:dark:text-brand-default peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none">
                                {{ $t('password') }}
                            </label>
                            <!-- Eye icon for password visibility toggle -->
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                @click="togglePasswordVisibility" v-if="passwordVisible" stroke-width="1.5"
                                stroke="currentColor"
                                class="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>

                            <svg @click="togglePasswordVisibility" xmlns="http://www.w3.org/2000/svg" v-else
                                class="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.724 7.758 5 12 5s8.268 2.724 9.542 7c-1.274 4.276-5.3 7-9.542 7-4.242 0-8.268-2.724-9.542-7z" />
                            </svg>

                        </div>
                        <div class="flex">
                            <button type="submit"
                                class="bg-brand-default hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
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

                                {{ $t('login') }}
                            </button>
                        </div>
                    </form>

                    <div class="border-t px-10 py-6">
                        <div class="flex justify-between">
                            <a href="#" class="font-bold text-brand-default hover:text-primary-dark no-underline">{{
                                $t('forgot_password') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>