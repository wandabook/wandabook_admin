<template>
    <div v-if="isVisible" class="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
            <p class="mb-6">{{ message }}</p>
            <div class="flex justify-end space-x-4">
                <button @click="cancel" class="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                    Cancel
                </button>
                <button @click="confirm" class="px-4 py-2 bg-red-600 rounded-md hover:bg-red-700">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "ConfirmationPopup",
    props: {
        title: {
            type: String,
            default: "Confirm Action",
        },
        message: {
            type: String,
            required: true,
        },
        onConfirm: {
            type: Function,
            required: true,
        },
        onCancel: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const isVisible = ref(true);

        const confirm = () => {
            props.onConfirm();
            isVisible.value = false;
        };

        const cancel = () => {
            props.onCancel();
            isVisible.value = false;
        };

        return {
            isVisible,
            confirm,
            cancel,
        };
    },
});
</script>

<style scoped>
/* Add animations if needed */
</style>
