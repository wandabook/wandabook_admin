import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', {
    state: () => ({ language: null }),
    getters: {
        locale: (state) => state.language,
    },

    actions: {
        set(lang: any) {
            this.language = lang;
            console.log('here', lang);
        },
    },
    persist: {
        storage: sessionStorage,
    },

});
