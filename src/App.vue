<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import router from './router';
import { useI18n } from "vue-i18n";
import { useLanguageStore } from './lang/language';
const isLogin = computed<boolean>(() => {
  return (router.currentRoute.value.path === '/login');
});
const useLanguage = useLanguageStore();
const t = useI18n({ useScope: "global" });
if (useLanguage.language) {
  t.locale.value = useLanguage.language;
} else {
  useLanguage.set(t.locale.value)
}
</script>

<template>
  <template v-if="isLogin">
    <RouterView />
  </template>
  <template v-else>
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </template>
</template>
