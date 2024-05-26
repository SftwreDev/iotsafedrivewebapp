<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAcceptedAccidentsStore, useRejectedAccidentsStore } from '@/stores/accidents.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'

const currentTab = ref('accepted')

const tabs = [
    { name: 'Accepted Accidents', tab_name: 'accepted', current: currentTab.value === 'accepted' },
    { name: 'Rejected Accidents', tab_name: 'rejected', current: currentTab.value === 'rejected' }
]

var url = location.href
const lastSegmentPath = url.match(/([^\/]*)\/*$/)[1]

const acceptedAccidentsColumns = [
    { field: 'timestamps', title: 'TIMESTAMPS' },
    { field: 'accepted_by', title: 'ACCEPTED BY' },
    { field: 'rescuer', title: 'RESCUER' },
    { field: 'patient', title: 'PATIENT' },
    { field: 'status', title: 'STATUS' }
]
const rejectedAccidentsColumns = [
    { field: 'timestamps', title: 'TIMESTAMPS' },
    { field: 'rejected_by', title: 'REJECTED BY' },
    { field: 'rescuer', title: 'RESCUER' },
    { field: 'patient', title: 'PATIENT' },
    { field: 'notes', title: 'NOTES' },
    { field: 'status', title: 'STATUS' }
]

const { accepted_accidents, loading } = storeToRefs(useAcceptedAccidentsStore())
const { fetchAcceptedAccidents } = useAcceptedAccidentsStore()

const { rejected_accidents } = storeToRefs(useRejectedAccidentsStore())
const { fetchRejectedAccidents } = useRejectedAccidentsStore()

onMounted(async () => {
    await fetchAcceptedAccidents()
    await fetchRejectedAccidents()
})
</script>

<template>
    <header
        class="bg-white shadow lg:static lg:overflow-y-visible mb-10 py-5 border-b border-gray-300"
    >
        <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div class="flex flex-shrink-0 items-center">
                        <p
                            v-if="lastSegmentPath === 'received-accidents'"
                            class="text-xl font-medium text-gray-800"
                        >
                            Received Accidents
                            <br />
                            <span class="text-xs text-gray-500"
                                >Reports for received accidents from the command center (accepted
                                and rejected)</span
                            >
                        </p>

                        <p
                            v-if="lastSegmentPath === 'forwarded-accidents'"
                            class="text-xl font-medium text-gray-800"
                        >
                            Forwarded Accidents
                            <br />
                            <span class="text-xs text-gray-500"
                                >Reports for forwarded accidents from the command center (accepted
                                and rejected)</span
                            >
                        </p>
                    </div>
                </div>
                <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div
                        class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
                    ></div>
                </div>
                <div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden"></div>
                <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                    <component :is="componentToRender" />
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <nav aria-label="Global" class="lg:hidden">
            <div class="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4"></div>
            <div class="border-t border-gray-200 pb-3 pt-4"></div>
        </nav>
    </header>

    <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div class="sm:hidden">
            <label class="sr-only" for="tabs">Select a tab</label>
            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
            <select
                id="tabs"
                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                name="tabs"
            >
                <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
                    {{ tab.name }}
                </option>
            </select>
        </div>
        <div class="hidden sm:block">
            <div class="border-b border-gray-200">
                <nav aria-label="Tabs" class="-mb-px flex space-x-8">
                    <p
                        v-for="tab in tabs"
                        :key="tab.name"
                        :aria-current="tab.current ? 'page' : undefined"
                        :class="[
                            currentTab === tab.tab_name
                                ? 'border-indigo-500 text-indigo-600'
                                : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                        ]"
                        @click="currentTab = tab.tab_name"
                    >
                        {{ tab.name }}
                    </p>
                </nav>
            </div>
        </div>
    </div>

    <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div v-if="currentTab === 'accepted'">
            <div v-if="!loading">
                <CustomDataTable
                    :cols="acceptedAccidentsColumns"
                    :isLoading="loading"
                    :rows="accepted_accidents"
                />
            </div>
        </div>
        <div v-if="currentTab === 'rejected'">
            <div v-if="!loading">
                <CustomDataTable
                    :cols="rejectedAccidentsColumns"
                    :isLoading="loading"
                    :rows="rejected_accidents"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
