import { defineStore } from 'pinia'
import BASE_URL from '@/constants'

const access_token = localStorage.getItem('access_token')
export const useVehicleStore = defineStore({
    id: 'vehicle',
    state: () => ({
        vehicle: []
    }),
    getters: {},
    actions: {
        async fetchVehicle() {

            try {
                const resp = await fetch(`${BASE_URL}/api/vehicle`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.vehicle = data['data']
                    console.log('this.vehicle', this.vehicle)

                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})


export const useAllVehicleStore = defineStore({
    id: 'vehicle',
    state: () => ({
        vehicle: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchAllVehicle() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/vehicle/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.vehicle = data['data']
                    console.log('this.vehicle', this.vehicle)
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})