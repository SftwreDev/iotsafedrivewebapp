import { defineStore } from 'pinia'
import BASE_URL from '@/constants.js'

const access_token = localStorage.getItem('access_token')


export const useAcceptedAccidentsStore = defineStore({
    id: 'accepted_accidents',
    state: () => ({
        accepted_accidents: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchAcceptedAccidents() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/accident-alert/accepted`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.accepted_accidents = data['data']
                    console.log('this.accepted_accidents', this.accepted_accidents)
                    this.loading = false
                } else {
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching accepted accidents:', error)
            }
        }
    }
})

export const useRejectedAccidentsStore = defineStore({
    id: 'rejected_accidents',
    state: () => ({
        rejected_accidents: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchRejectedAccidents() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/accident-alert/rejected`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.rejected_accidents = data['data']
                    console.log('this.rejected_accidents', this.rejected_accidents)
                    this.loading = false
                } else {
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching accepted accidents:', error)
            }
        }
    }
})