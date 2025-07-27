<template>
    <!-- Modal backdrop -->
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300"
        @click.self="onClose">
        <!-- Modal panel -->
        <div
            class="bg-white dark:bg-boxdark rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
            <div class="flex justify-between items-center border-b border-gray-200 dark:border-strokedark pb-4 mb-4">
                <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">{{ $t('change_password') }}</h2>
                <button @click="onClose" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <form @submit.prevent="onSave">
                <div class="mb-4">
                    <label for="new-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{
                        $t('password') }}</label>
                    <input type="password" id="new-password" v-model="password"
                        class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        required>
                </div>
                <div class="mb-4">
                    <label for="confirm-password"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ $t('confirmPassword')
                        }}</label>
                    <input type="password" id="confirm-password" v-model="confirmPassword"
                        class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        required>
                </div>
                <p v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</p>
                <div class="flex justify-end space-x-4 mt-6">
                    <button type="button" @click="onClose"
                        class="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600 transition-colors duration-200">{{
                            $t('cancel') }}</button>
                    <button type="submit"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">


                        <Spinner v-if="isChanging" />{{


                            $t('save')
                        }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChangeUserPassword } from '../../lib/appwrite';
import Swal from 'sweetalert2';
import Spinner from '../Utilities/Spinner.vue';
const isChanging = ref(false)
const { t } = useI18n({ useScope: 'global' });
const emit = defineEmits(['close']);
const props = defineProps({
    patron: {
        type: Object,
        required: true
    }
})
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

const onSave = async () => {
    if (password.value !== confirmPassword.value) {
        error.value = t('passwords_do_not_match');
        return;
    }
    if (password.value.length < 8) {
        error.value = t('password_too_short');
        return;
    }
    error.value = '';
    await handlePasswordChange(password.value)
};

const onClose = () => {
    emit('close');
};

const handlePasswordChange = async (newPassword: string) => {
    isChanging.value = true;
    try {
        const result = await ChangeUserPassword(JSON.stringify({
            userId: props.patron.$id,
            password: newPassword
        }));


        console.log('result', result);
        if (result.status === "failed") {
            Swal.fire({ icon: 'error', title: t('password_change_failed'), text: '' });
            return
        }
        Swal.fire({
            icon: 'success',
            title: t('password_changed_successfully'),
            showConfirmButton: false,
            timer: 1500
        });
        emit('close');
    } catch (error) {
        console.error("Failed to change password:", error);
        Swal.fire({ icon: 'error', title: t('password_change_failed'), text: (error as Error).message });
    } finally {
        isChanging.value = false;
    }
};
</script>

<style scoped>
@keyframes scale-in {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-scale-in {
    animation: scale-in 0.2s ease-out forwards;
}
</style>
