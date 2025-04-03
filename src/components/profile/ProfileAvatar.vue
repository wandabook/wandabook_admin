<template>
    <div class="relative inline-block text-left">
        <!-- Profile Button -->
        <button @click="toggleDropdown" class="flex items-center space-x-2 hover:bg-gray-200 px-4 py-2 rounded-full">
            <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full" />
            <span class="text-sm font-medium  md:text-gray-700 md:flex hidden">{{ user.name ?? user.email
                }}</span>
            <span class="text-sm font-medium text-white  md:hidden">{{ user.name ?? user.email
                }}</span>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul>
                <li>
                    <a :href="`/members/${user.$id}/info`" @click="viewProfile"
                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {{ $t('viewProfile') }}
                    </a>
                </li>
                <li>
                    <a href="#" @click="logoutUse" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {{ $t('logout') }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { logout } from '../../lib/appwrite';
const dropdownOpen = ref(false);
const userStore = useUserStore();

const user = ref<any>({});

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const viewProfile = () => {
    dropdownOpen.value = false;
};

const logoutUse = async () => {
    dropdownOpen.value = false;
    await logout();
    userStore.logout();
    location.reload();
};

onMounted(() => {
    if (userStore.getUser) {
        user.value = { ...JSON.parse(userStore.getUser), avatar: "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg" }
    }
})
</script>

<style>
/* Optional: You can customize the styling further if needed */
</style>
