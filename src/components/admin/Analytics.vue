<script setup>

import Statistics from '@/components/admin/charts/Statistics.vue'
import SmsSentVsFalseAlarm from '@/components/admin/charts/AccidentDetectedVsFalseAlarm.vue'
import RespondedAccicent from '@/components/admin/charts/RespondedAccicent.vue'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import PendingVsOnGoingAccident from '@/components/admin/charts/PendingVsOnGoingAccident.vue'

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'


const filters = [
    {
        'value': 'daily', 'label': 'Daily'
    }, {
        'value': 'monthly', 'label': 'Monthly'
    }, {
        'value': 'yearly', 'label': 'Yearly'
    }, {
        'value': 'all', 'label': 'All'
    }
]
</script>

<script>

import BASE_URL from '@/constants.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components: { VueDatePicker },
    props: ['rescuers', 'id'],
    data() {
        return {
            smsVsFalseTimestamps: [],
            totalSmsSentData: [],
            totalFalseAlarmData: [],
            totalSmsNotSentData: [],

            rescuedAccidentTimestamps: [],
            totalRescuedAccident: [],

            selected: { 'value': 'all', 'label': 'All' },
            filter: 'all',
            value: 0,

            total_responded_accident: 0,
            total_activity: 0,
            total_sms_sent: 0,
            total_false_alarm: 0,
            total_sms_not_sent: 0,
            pending_percentage: 0.0,
            closed_percentage: 0.0,
            on_going_percentage: 0.0,

            isLoading: false,

            year: new Date().getFullYear(),
            month: {
                month: new Date().getMonth(),
                year: new Date().getFullYear()
            },
            day: new Date()
        }
    },
    computed: {},
    methods: {
        async filterAnalytics() {
            this.isLoading = true
            this.filter = this.selected['value']
            const payload = {
                filter: this.filter
            }
            switch (this.filter) {
                case 'monthly' :
                    payload['value'] = `${this.month.month + 1}/${this.month.year}`
                    break
                case 'yearly':
                    payload['value'] = `${this.year}`
                    break
                case 'daily':
                    payload['value'] = this.day.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    })
                    break
                default:
                    payload['value'] = ''
            }
            try {
                const resp = await apiStatistics(payload)

                if (resp['status_code'] === 200) {
                    this.total_responded_accident = resp['data'][0]['accident_rescue'][0]['total_responded_accident']
                    this.total_activity = resp['data'][0]['activity_history'][0]['total_activity']
                    this.total_sms_sent = resp['data'][0]['activity_history'][0]['total_sms_sent']
                    this.total_false_alarm = resp['data'][0]['activity_history'][0]['total_false_alarm']
                    this.total_sms_not_sent = resp['data'][0]['activity_history'][0]['total_sms_not_sent']

                    this.pending_percentage = resp['data'][0]['ongoing_vs_closed_pending'][0]['pending_percentage']
                    this.closed_percentage = resp['data'][0]['ongoing_vs_closed_pending'][0]['closed_percentage']
                    this.on_going_percentage = resp['data'][0]['ongoing_vs_closed_pending'][0]['on_going_percentage']

                    if (resp['data'][0]['sms_vs_false']) {
                        for (const item of resp['data'][0]['sms_vs_false']) {
                            // Extract the timestamps
                            this.smsVsFalseTimestamps.push(item['timestamps'])
                            this.totalSmsSentData.push(item['total_sms_sent'])
                            this.totalSmsNotSentData.push(item['total_sms_not_sent'])
                            this.totalFalseAlarmData.push(item['total_false_alarm'])
                        }
                    } else {
                        this.smsVsFalseTimestamps = []
                        this.totalSmsSentData = []
                        this.totalSmsNotSentData = []
                        this.totalFalseAlarmData = []
                    }

                    if (resp['data'][0]['rescued_accident']) {
                        for (const item of resp['data'][0]['rescued_accident']) {
                            // Extract the timestamps
                            this.rescuedAccidentTimestamps.push(item['timestamps'])
                            this.totalRescuedAccident.push(item['total_rescued_accident'])
                        }
                    } else {
                        this.rescuedAccidentTimestamps = []
                        this.totalRescuedAccident = []
                    }


                    this.isLoading = false
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        format() {
            const day = this.day.getDate()
            const month = this.day.getMonth() + 1
            const year = this.day.getFullYear()

            return `${month}/${day}/${year}`
        }
    },
    async mounted() {
        console.log(this.day)
        await this.filterAnalytics()
    }

}

const access_token = localStorage.getItem('access_token')

async function apiStatistics(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/analytics/statistics`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.error('Error fetching user profile:', error)
    }
}


</script>
<template>
    <div class="sm:px-6 lg:px-8">
        <div>
            <div class="flex gap-x-3 w-96">
                <Listbox v-model="selected" as="div">
                    <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Filter by</ListboxLabel>
                    <div class="relative mt-2">
                        <ListboxButton
                            class=" relative w-48 cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span class="block truncate">{{ selected.label }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
                         </span>
                        </ListboxButton>

                        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                    leave-to-class="opacity-0">
                            <ListboxOptions
                                class="absolute z-10 mt-1 max-h-60 w-48 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption v-for="(filter, idx) in filters" :key="idx" v-slot="{ active, selected }"
                                               :value="filter"
                                               as="template">
                                    <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <span
                                        :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ filter.label
                                        }}</span>
                                    </li>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </div>
                </Listbox>

                <VueDatePicker v-if="selected.value === 'yearly' " v-model="year" class="mt-8"
                               year-picker></VueDatePicker>

                <VueDatePicker v-if="selected.value === 'monthly' " v-model="month" class="mt-8"
                               month-picker></VueDatePicker>
                <VueDatePicker v-if="selected.value === 'daily' " v-model="day" :enableTimePicker="false"
                               :format="format" class="mt-8" text-input>
                </VueDatePicker>

            </div>

            <button
                class="mt-5 rounded bg-custom-bg-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                type="button"
                @click="filterAnalytics()">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5"
                     viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>

            </button>


        </div>
        <div v-if="!isLoading">
            <Statistics :total_activity="total_activity" :total_false_alarm="total_false_alarm"
                        :total_responded_accident="total_responded_accident" :total_sms_not_sent="total_sms_not_sent"
                        :total_sms_sent="total_sms_sent"
            />

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-10">
                <SmsSentVsFalseAlarm :smsVsFalseTimestamps="smsVsFalseTimestamps"
                                     :totalFalseAlarmData="totalFalseAlarmData"
                                     :totalSmsNotSentData="totalSmsNotSentData"
                                     :totalSmsSentData="totalSmsSentData" />
                <RespondedAccicent :rescuedAccidentTimestamps="rescuedAccidentTimestamps"
                                   :totalRescuedAccident="totalRescuedAccident" />
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-10">
                <PendingVsOnGoingAccident :closed_percentage="closed_percentage"
                                          :on_going_percentage="on_going_percentage"
                                          :pending_percentage="pending_percentage" />
                <div class="col-span-2 ">
                    <CustomDataTable />
                </div>
            </div>
        </div>


    </div>
</template>

<style scoped>

</style>