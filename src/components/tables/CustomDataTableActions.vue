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
    props: ['rows', 'cols', 'isLoading', 'title', 'componentToRender'],
    data() {
        return {
            isAccidentDetected: false,
            id: '',
            params: {
                'current_page': 1,
                'pagesize': 10,
                'sort_column': 'id',
                'sort_direction': 'asc',
                'search': ''
            }
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
        },

        async saveAsPdf() {
            // Pass the element id here
            await this.$htmlToPaper('dataTable')
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
    <header class="bg-white shadow-lg lg:static lg:overflow-y-visible mb-10 py-5 border-b border-gray-300">
        <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div class="flex flex-shrink-0 items-center">
                        <p class="text-xl font-medium text-gray-800 ">
                            {{ title }}
                        </p>
                    </div>
                </div>
                <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">

                    </div>
                </div>
                <div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">

                </div>
                <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

                    <component :is="componentToRender" />
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <nav aria-label="Global" class="lg:hidden">
            <div class="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            </div>
            <div class="border-t border-gray-200 pb-3 pt-4">
            </div>
        </nav>
    </header>

    <div
        class="">
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
        <div class="flex gap-x-5 mx-2 mt-5">

            <button
                class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="button" @click="saveAsPdf">
                Export as PDF
            </button>

        </div>
        <div class="max-w-9xl mx-2 px-2 bg-white border border-gray-200 rounded-lg shadow-md mt-5">
            <div class="mb-5">
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd"
                                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                  fill-rule="evenodd" />
                        </svg>

                    </div>
                    <input id="search"
                           v-model="params.search"
                           autocomplete="off"
                           class="block max-w-xs rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           name="search"
                           placeholder="Search ..."
                           type="text"
                    >
                </div>
            </div>

            <vue3-datatable
                id="dataTable"
                :columns="cols"
                :loading="isLoading"
                :pageSize="10"
                :pageSizeOptions="[10, 15, 30, 50]"
                :rows="rows"
                :search="params.search"
                :sortColumn="params.sort_column"
                :sortDirection="params.sort_direction"
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

    </div>
</template>

<style>
.bh-datatable .bh-table-responsive {
    @apply min-h-[380px];
}
</style>