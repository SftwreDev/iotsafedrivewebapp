import { defineStore } from 'pinia'
import BASE_URL from '@/constants.js'

const access_token = localStorage.getItem('access_token')
export const useAllActivityHistoriesStore = defineStore({
    id: 'vehicle',
    state: () => ({
        histories: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchAllActivityHistories() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/activity-history/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.histories = data['data']
                    console.log('this.histories', this.histories)
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})

export const usePendingActivityHistoriesStore = defineStore({
    id: 'history',
    state: () => ({
        histories: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchPendingActivityHistories() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/activity-history/pending`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data?.status_code === 200) {
                    this.histories = data['data']
                    console.log('this.histories', this.histories)
                    this.loading = false
                } else {
                    this.histories = []
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
                this.loading = false
            }
        }
    }
})

export const useDetailedActivityHistoriesStore = defineStore({
    id: 'history',
    state: () => ({
        histories: [],
        loading: true,
        center: {}
    }),
    actions: {
        async fetchDetailedActivityHistories(id) { // Accept 'id' as a parameter
            try {
                this.loading = true
                const resp = await fetch(`${BASE_URL}/api/activity-history?id=${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.histories = data['data']
                    this.center = { lat: data['data'][0]['latitude'], lng: data['data'][0]['longitude'] }
                    console.log('this.histories', this.histories)
                    this.loading = true
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            } finally {
                this.loading = false
            }
        }
    }
})


export const useLatestActivityHistoriesStore = defineStore({
    id: 'latest_accident',
    state: () => ({
        latest_accident: []
    }),
    actions: {
        async fetchLatestActivityHistories() {
            try {
                const resp = await fetch(`${BASE_URL}/api/activity-history/latest`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.latest_accident = data['data']
                } else {
                    this.latest_accident = []
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})


export const useForwardedAccidentStore = defineStore({
    id: 'forwarded_accidents',
    state: () => ({
        forwarded_accidents: [],
        faLoading: false
    }),
    getters: {},
    actions: {
        async fetchForwardedAccidents() {
            try {
                this.faLoading = true
                const resp = await fetch(`${BASE_URL}/api/activity-history/forwarded?type=all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data?.status_code === 200) {
                    this.forwarded_accidents = data['data']
                    this.faLoading = false
                } else {
                    this.forwarded_accidents = []
                    this.faLoading = false
                }
            } catch (error) {
                console.error('Error fetching accidents:', error)
                this.faLoading = false
            }
        }
    }
})