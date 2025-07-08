<template>
  <div class="relative">
    <!-- Bouton -->
    <div class="flex gap-2 ">
      <span class="flex items-center">
        <img :src="selectLanguage.icon" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
      </span>
      <span class="font-bold">{{ $t(selectLanguage.name) }}</span>
      <button @click="show = !show" type="button"
        class=" relative w-fit cursor-default rounded-md  text-left text-white-900 ring-gray-300 sm:text-sm sm:leading-6"
        aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
        <span class="flex items-center cursor-pointer w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>

        </span>
      </button>
    </div>


    <!-- Menu déroulant -->
    <ul v-if="show" style="width: 150px;"
      class="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white dark:bg-boxdark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm right-0 "
      tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
      <!-- Options -->
      <li v-for="(language, i) in languages" :key="i"
        class="relative cursor-pointer select-none py-2 pl-3 text-graydark dark:text-white" id="listbox-option-0"
        role="option" @click="setLanguage(language)">
        <div class="flex items-center gap-2">
          <span class="flex items-center">
            <img :src="language.icon" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" />
          </span>
          <!-- Texte de l'option -->
          <span class="ml-0 block truncate font-normal">
            {{ language.name }}
          </span>

        </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
          v-if="selectLanguage.code === language.code">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </li>
    </ul>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import sw from '@/assets/images/home/united-kingdom_551844.png'
import cm from '@/assets/images/home/Flag_of_France.png'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/lang/language'
const { rt } = useI18n();
const t = useI18n({ useScope: 'global' })

const languages = [
  {
    code: 'en',
    name: rt('English'),
    icon: sw,
  },
  {
    code: 'fr',
    name: rt('French'),
    icon: cm,
  },
]
const show = ref(false)
const useLanguage = useLanguageStore()
const selectLanguage = computed(() => {
  return languages.filter((e) => e.code === useLanguage.locale)[0]
})
const setLanguage = (lg: any) => {
  console.log('setLanguage', lg)
  show.value = !show
  if (lg.code !== t.locale.value) {
    t.locale.value = lg.code
    useLanguage.set(t.locale.value)
  }
  console.log('useLanguage', useLanguage.locale)
}
</script>
