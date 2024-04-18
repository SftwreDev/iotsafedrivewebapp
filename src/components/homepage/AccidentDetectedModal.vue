<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

</script>
<script>

import BASE_URL from '@/constants.js'
import { Howl } from 'howler'
import MapsLocation from '@/components/maps/MapsLocation.vue'

const access_token = localStorage.getItem('access_token')

const deviceLatitude = localStorage.getItem('latitude')
const deviceLongitude = localStorage.getItem('longitude')

export default {
    props: ['rows', 'cols', 'isLoading', 'title'],
    components: {
        MapsLocation
    },
    data() {
        return {
            isAccidentDetected: false,
            id: '',
            center: {},
            longitude: '',
            latitude: '',
            device_id: '',
            countdown: 30
        }
    },
    computed: {
        headings() {
            // Extracting keys from the first object in data array to use as table headings
            if (this.data.length > 0) {
                return Object.keys(this.data[0]).map(key => ({ key, label: this.capitalize(key) }))
            }
            return []
        }
    },
    methods: {
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        playAlarm() {
            var sound = new Howl({
                src: ['https://res.cloudinary.com/sftwredev/video/upload/v1703344317/emergency_alert_uqhmcs.mp3'],
                html5: true
            })

            sound.pause()
            sound.play()
        },
        async checkAlerts() {
            try {
                const { status, data } = await apiCheckAlerts()

                if (data.data) {
                    this.device_id = data.data[0].device_id
                    this.latitude = data.data[0].latitude
                    this.longitude = data.data[0].longitude

                    if (this.latitude !== '0.0' || this.longitude !== '0.0') {
                        this.center = { lat: this.latitude, lng: this.longitude }
                    } else {

                        this.center = { lat: deviceLatitude, lng: deviceLongitude }
                    }
                    this.isAccidentDetected = true
                } else {
                    this.isAccidentDetected = false
                }
            } catch (err) {
                console.log(err)
            }
        },

        async sendSMS(false_alarm) {
            const payload = {
                is_false_alarm: !!false_alarm
            }

            if (this.latitude !== '' || this.longitude !== '') {
                payload.latitude = this.latitude
                payload.longitude = this.longitude
            } else {
                payload.latitude = deviceLatitude
                payload.longitude = deviceLongitude
            }

            console.log(payload)
            try {
                const resp = await apiSendSMS(payload)

                if (resp['status_code'] === 200) {

                    window.location.href = `/`
                }
            } catch (err) {
                console.error('Error sending sms:', err)
            }
        },
        async updateCountdown() {
            if (this.countdown > 0) {
                this.countdown -= 1
            } else {
                // Perform any action when the countdown reaches 0
                clearInterval(this.countdownInterval)
                // Get the reference to the div with the id "myDiv"
                var myDiv = document.getElementById('countdown')
                // Change the text content of the div
                myDiv.textContent = 'Sending sms notification now...'

                await this.sendSMS(false)
            }
        }
    },
    watch: {
        isAccidentDetected(newValue, oldValue) {
            if (newValue) {
                // Update the countdown every second
                this.countdownInterval = setInterval(this.updateCountdown, 1000)
            }
        }
    },

    async mounted() {
        setInterval(await this.checkAlerts, 500)
    }
}

async function apiCheckAlerts() {
    try {
        const response = await fetch(`${BASE_URL}/api/iot/alerts/check`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        // Check if the response status is in the range 200-299
        if (response.ok) {
            const data = await response.json()
            return { status: response.status, data }
        } else {
            // If the response status is not in the range 200-299, handle the error
            console.error(`Error: ${response.status}`)
            return { status: response.status, data: null }
        }
    } catch (error) {
        console.error(error)
        return { status: null, data: null }
    }
}

async function apiSendSMS(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/send-sms`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
    }
}
</script>

<template>
    <TransitionRoot :show="isAccidentDetected" as="template">
        <Dialog as="div" class="relative z-10" @close="isAccidentDetected = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div>
                                <div
                                    class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                    <ExclamationTriangleIcon aria-hidden="true" class="h-10 w-10 text-red-600" />
                                </div>
                                <div class="mt-3 text-center sm:mt-5">
                                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                        Accident Detected
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <MapsLocation :center="center" />
                                    </div>
                                    <div class="mt-5">
                                        <p class="text-sm text-gray-500">
                                            If this is a false alarm, you have 30 seconds to disengage SMS notification
                                            system.
                                        </p>
                                    </div>
                                    <div id="countdown" class="text-gray-500 mt-2">{{ countdown }} seconds
                                        remaining...
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5">
                                <button
                                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                                    type="button"
                                    @click="sendSMS(true)">False Alarm
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>

</style>