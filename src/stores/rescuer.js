import { defineStore } from 'pinia'
import BASE_URL from '@/constants'

const access_token = localStorage.getItem('access_token')
export const useRescuerStore = defineStore({
    id: 'rescuers',
    state: () => ({
        rescuers: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchRescuers() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/rescuers`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.rescuers = data['data']
                    console.log('this.rescuers', this.rescuers)
                    this.loading = false
                } else {
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})
