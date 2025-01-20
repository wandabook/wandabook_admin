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
                        <div class="mb-3">
                            <input class="border w-full p-3" name="email" type="text" :placeholder="$t('email')"
                                required v-model="email">
                        </div>
                        <div class="mb-6">
                            <input class="border w-full p-3" name="password" type="password"
                                placeholder="**************" required v-model="password">
                        </div>
                        <div class="flex">
                            <button type="submit"
                                class="bg-primary hover:bg-primary-dark w-full p-4 text-sm text-white uppercase font-bold tracking-wider">
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
                            <a href="#" class="font-bold text-primary hover:text-primary-dark no-underline">{{
                                $t('forgot_password') }}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>