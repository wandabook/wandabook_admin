import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user_wandabook', {
    state: () => ({
        user: useStorage('user_wandabook', ""), // Persist user object
        token: useStorage('token', "nll"), // Persist JWT or session token
    }),
    getters: {
        isLoggedIn: (state) => !!state.user, // Determine if user is logged in
        getUser: (state) => state.user
    },
    actions: {
        login(userData: any, token: any) {
            this.user = JSON.stringify(userData)
            this.token = JSON.stringify(userData)
            console.log('login', this.user)
        },
        logout() {
            this.user = ""
            this.token = ""
        },
    },
})
