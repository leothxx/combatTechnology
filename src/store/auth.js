import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        role: 'USER' // or 'ADMIN'
    }),
    getters: {
        isLoggedIn: (s) => !!s.token,
        isAdmin: (s) => s.role === 'ADMIN'
    },
    actions: {
        async login({ email, password }) {
// TODO: call real API
            if (email && password) {
                this.token = 'mock-token'
                this.role = email.includes('admin') ? 'ADMIN' : 'USER'
                return true
            }
            return false
        },
        logout() {
            this.token = null
            this.role = 'USER'
        }
    }
})