<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import router from './router';



const isLogin = true;

// const isLogin = computed<boolean>(() => {
//   return( router.currentRoute.value.path === '/auth/signin')|| (router.currentRoute.value.path === '/');
// });


</script>

<template>
  <template v-if="isLogin">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </template>
  <template v-else>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </template>
</template>
