import { defineStore } from 'pinia'
import BASE_URL from '@/constants'

const access_token = localStorage.getItem('access_token')
export const useTrustedContactsStore = defineStore({
    id: 'trusted_contacts',
    state: () => ({
        trusted_contacts: []
    }),
    getters: {},
    actions: {
        async fetchTrustedContacts() {
            try {
                const resp = await fetch(`${BASE_URL}/api/trusted-contacts`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.trusted_contacts = data['data']
                    console.log(this.trusted_contacts)
                }
            } catch (error) {
                console.error('Error fetching trusted_contacts:', error)
            }
        }
    }
})


export const useAllTrustedContactsStore = defineStore({
    id: 'vehicle',
    state: () => ({
        trusted_contacts: [],
        loading: true
    }),
    getters: {},
    actions: {
        async fetchAllTrustedContacts() {
            this.loading = true
            try {
                const resp = await fetch(`${BASE_URL}/api/trusted-contacts/all`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                const data = await resp.json()
                if (data.status_code === 200) {
                    this.trusted_contacts = data['data']
                    console.log('this.trusted_contacts', this.trusted_contacts)
                    this.loading = false
                }
            } catch (error) {
                console.error('Error fetching rescuers:', error)
            }
        }
    }
})