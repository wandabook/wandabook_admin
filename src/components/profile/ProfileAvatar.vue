<template>
    <div class="relative inline-block text-left">
        <!-- Profile Button -->
        <button @click="toggleDropdown" class="flex items-center space-x-2 hover:bg-gray-200 px-4 py-2 rounded-full">
            <img :src="user.avatar" alt="User Avatar" class="w-8 h-8 rounded-full" />
            <span class="text-sm font-medium text-gray-700">{{ user.name ?? user.email }}</span>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <ul>
                <li>
                    <a :href="`/members/${user.user_id}/info`" @click="viewProfile"
                        class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {{ $t('viewProfile') }}
                    </a>
                </li>
                <li>
                    <a href="#" @click="openSettings" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {{ $t('settings') }}
                    </a>
                </li>
                <li>
                    <a href="#" @click="logout" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                        {{ $t('logout') }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
const dropdownOpen = ref(false);
const userStore = useUserStore();

const user = ref({ ...JSON.parse(userStore.getUser), avatar: "https://via.placeholder.com/150" });

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const viewProfile = () => {
    dropdownOpen.value = false;
    console.log('View Profile clicked');
};

const openSettings = () => {
    dropdownOpen.value = false;
    console.log('Settings clicked');
};

const logout = () => {
    dropdownOpen.value = false;
    console.log('Logout clicked');
    userStore.logout();
};
</script>

<style>
/* Optional: You can customize the styling further if needed */
</style>
