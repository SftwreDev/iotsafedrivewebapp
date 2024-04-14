<script lang="ts" setup>
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
</script>

<script lang="ts">
import BASE_URL from '@/constants.js'
import { Howl } from 'howler'

const access_token = localStorage.getItem('access_token')

export default {
    props: ['rows', 'cols', 'isLoading', 'title'],
    data() {
        return {
            isAccidentDetected: false,
            id: ''
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

        viewNotification(data) {
            const id = data.id
            window.location.href = `/alert/${id}`
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
                    this.id = data.data[0].id
                    this.isAccidentDetected = true
                } else {
                    this.isAccidentDetected = false
                }
            } catch (err) {
                console.log(err)
            }
        }
    },

    async mounted() {
        if (this.title !== 'Activity Histories') {
            setInterval(await this.checkAlerts, 500)
        }
    }
}

async function apiCheckAlerts() {
    try {
        const response = await fetch(`${BASE_URL}/api/activity-history/latest`, {
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
</script>

<template>


    <div
        class="mx-10 max-w-9xl my-20 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div v-show="isAccidentDetected">
            <div class="border-l-4 border-red-400 bg-red-50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <ExclamationTriangleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                    </div>
                    <div class="ml-3">
                        <p class="text-base text-red-700">
                            Accident detected!
                            {{ ' ' }}
                            <a :href="'/alert/' + id" class="font-medium text-red-700 underline hover:text-red-600">
                                Click here to view more details
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between my-5">
                <h2 class="text-3xl">{{ title }}</h2>
            </div>
        </div>

        <div class="flex items-center justify-between mb-5">
            <h2 class="text-3xl">{{ title }}</h2>
        </div>

        <vue3-datatable
            :columnFilter="true"
            :columns="cols"
            :loading="isLoading"
            :pageSize="10"
            :pageSizeOptions="[10, 15, 30, 50]"
            :rows="rows"
            :sortable="true"
        >
            <template #id="data">
                <strong>#{{ data.value.id }}</strong>
            </template>
            <template #actions="data">
                <div class="flex gap-4">
                    <button
                        class="rounded bg-red-600 px-5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        type="button"
                        @click="viewNotification(data.value)"
                    >
                        View
                    </button>
                </div>
            </template>
        </vue3-datatable>
    </div>
</template>

<style>
.bh-datatable .bh-table-responsive {
    @apply min-h-[380px];
}
</style>