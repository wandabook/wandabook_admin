import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userSessionStore = defineStore('Session', () => {
    const session = ref(null);
    function toggleSidebar(ss: any) {
        session.value = ss;
    }
    return { session, toggleSidebar }
})
