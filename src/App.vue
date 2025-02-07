<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';
import router from './router';
import { useI18n } from "vue-i18n";
import { useLanguageStore } from './lang/language';
import { useUserStore } from './stores/user';
const showLogin = ref(true)
const useLanguage = useLanguageStore();
const t = useI18n({ useScope: "global" });
if (useLanguage.language) {
  t.locale.value = useLanguage.language;
} else {
  useLanguage.set(t.locale.value)
}

const checkUseLogged = () => {
  const store = useUserStore();
  const route = (router.currentRoute.value.path == '/login');
  console.log('route', router.currentRoute.value.path);
  console.log('route', route);
  if (!route) {
    if (!store.isLoggedIn) {
      // location.href = '/login'
      showLogin.value = true;
    } else {
      showLogin.value = false;
    }
  }
}

checkUseLogged();
</script>

<template>
  <template v-if="showLogin">
    <RouterView />
  </template>
  <template v-if="!showLogin">
    <DefaultLayout>
      <RouterView />
    </DefaultLayout>
  </template>
</template>
