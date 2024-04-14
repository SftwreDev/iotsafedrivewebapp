import { defineStore } from 'pinia'
import BASE_URL from '@/constants'

const access_token = localStorage.getItem('access_token')
export const useUserProfileStore = defineStore({
    id: 'profile',
    state: () => ({
        userProfile: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchUserProfile() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/actor/profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.userProfile = data['data']
                    console.log('this.userProfile', this.userProfile)
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching user profile:', error)
            }
        }
    }
})


export const useAllUserStore = defineStore({
    id: 'users',
    state: () => ({
        users: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchAllUsers() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/users/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.users = data['data']
                    console.log('this.users', this.users)
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching user profile:', error)
            }
        }
    }
})