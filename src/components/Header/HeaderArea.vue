<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
import type { OrderDTODish } from '@/types/OrderDTO';
import { computed, ref } from 'vue';
import router from '../../router';
import LanguageButton from '../languages/LanguageButton.vue';
import ProfileAvatar from '../profile/ProfileAvatar.vue';

const { toggleSidebar } = useSidebarStore()
const sidebarStore = useSidebarStore()
const searchQuery = ref('');
const currentRoute = router.currentRoute;

</script>

<template>
  <header class="sticky top-0 z-999 flex flex-col w-full pb-4">
    <div class="flex flex-grow items-center justify-between py-4 px-4 md:px-6 2xl:px-11">

      <!-- Mobile menu start -->
      <div class="flex items-center justify-end gap-2 sm:gap-4 lg:hidden">
        <!-- Hamburger Toggle BTN -->
        <button
          class="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          @click="() => {
            toggleSidebar()
          }">
          <span class="relative block h-5.5 w-5.5 cursor-pointer">
            <span class="block absolute right-0 h-full w-full">
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-300': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-400': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white"
                :class="{ '!w-full delay-500': !sidebarStore.isSidebarOpen }"></span>
            </span>
            <span class="block absolute right-0 h-full w-full rotate-45">
              <span
                class="absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-[0]': !sidebarStore.isSidebarOpen }"></span>
              <span
                class="delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white"
                :class="{ '!h-0 delay-200': !sidebarStore.isSidebarOpen }"></span>
            </span>
          </span>
        </button>
        <!-- Hamburger Toggle BTN -->
        <router-link class="block flex-shrink-0 lg:hidden" to="/">
          <img src="@/assets/images/logo/Plandetravail23.png" alt="Logo" class="h-15" />
        </router-link>
      </div>
      <!-- Mobile menu end -->
      <!-- search bar -->
      <div class="flex items-center p-2 bg-white h-14 w-full px-5 justify-between z-50">
        <div class="flex gap-7 ">
          <div class="self-center">
            <span v-for="(tab, i) in currentRoute.path.split('/')">
              {{ tab.toLocaleUpperCase() }} <span v-if="i != 0 && i < (currentRoute.path.split('/').length - 1)"> >
              </span>
            </span>
          </div>
        </div>
        <div class="right flex">
          <LanguageButton class="align-middle items-center justify-center self-center" />
          <div class="hidden sm:inline">
            <ProfileAvatar />
          </div>
        </div>

      </div>
      <!-- search bar -->

    </div>
  </header>
</template>

<style scoped>
.shadow-top {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

.custom-scrollbar {
  overflow-x: auto;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
  /* scrollbar height*/
  background-color: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4CAF50;
  border-radius: 10px;
}
</style>
