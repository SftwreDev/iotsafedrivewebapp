<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import SelectRescuer from '@/components/admin/SelectRescuer.vue'

const logs = [
    { 'title': 'User', 'field': 'owner' },
    { 'title': 'Location', 'field': 'location' },
    { 'title': 'Latitude', 'field': 'latitude' },
    { 'title': 'Longitude', 'field': 'longitude' },
    { 'title': 'Status', 'field': 'status' },
    { 'title': 'Status Report', 'field': 'status_report' }
]


</script>
<script>
import MapsLocation from '@/components/maps/MapsLocation.vue'
import BASE_URL from '@/constants.js'

const access_token = localStorage.getItem('access_token')
const role = localStorage.getItem('role')

export default {
    props: ['histories', 'loading', 'center', 'id', 'rescuers'],
    components: {
        MapsLocation
    },
    data() {
        return {
            tabContent: 'profile',
            rescuersInfo: {},
            formData: {},
            isLoading: false,
            open: false,
            assignRescuer: false,
            alreadyForwarded: false,
            rejectModal: false,

            reasonForRejecting: '',

            reasons: [
                { 'value': 'No available rescue team at the moment' },
                { 'value': 'No ambulance available' },
                { 'value': 'All Personnel deployed' },
                { 'value': 'Others' }
            ],

            selected: '-',
            otherReasons: '',

            role
        }
    },
    methods: {
        changeTab(tab) {
            this.tabContent = tab
        },

        async closeActivityHistory() {

            try {
                const resp = await apiCloseActivityHistoryApi(this.id)

                if (resp['status_code'] === 200) {
                    window.location.href = '/dashboard'
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },

        async getRescuersDetails() {
            try {
                const { status, data } = await apiGetRescuerDetailsApi(this.id)

                if (data.data) {
                    this.rescuersInfo = data.data
                    console.log(this.rescuersInfo)
                }
            } catch (err) {
                console.log(err)
            }
        },

        async checkIfForwarded() {
            try {
                const resp = await apiCheckIfForwarded(this.id)

                this.alreadyForwarded = resp['status_code'] === 200
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },

        async activityAction(action) {
            try {
                const payload = {
                    'reason': this.selected !== 'Others' ? this.selected : this.otherReasons
                }
                const resp = await apiActivityHistoryAction(action, this.id, payload)

                if (resp['status_code'] === 200) {
                    setInterval(() => {
                        window.location.href = `/alert/${this.id}`
                    }, 3000)
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        }


    },
    async mounted() {
        await this.getRescuersDetails()
        setInterval(await this.checkIfForwarded, 500)
    }
}

async function apiCloseActivityHistoryApi(id) {

    try {
        const resp = await fetch(`${BASE_URL}/api/activity-history/close?id=${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
    }
}


async function apiActivityHistoryAction(action, id, payload) {

    try {
        const resp = await fetch(`${BASE_URL}/api/accident-alert/action?action=${action}&activity_id=${id}`, {
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

async function apiGetRescuerDetailsApi(id) {
    try {
        const response = await fetch(`${BASE_URL}/api/rescuers/details?accident-rescuer=${id}`, {
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

async function apiCheckIfForwarded(id) {
    try {
        const resp = await fetch(`${BASE_URL}/api/accident-alert/status?id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${access_token}` }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
    }
}
</script>

<style scoped>
[v-cloak] {
    display: none;
}
</style>
<template>
    <div v-cloak v-if="!loading" class="mx-auto max-w-9xl sm:px-6 lg:px-8 mt-20">
        <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div class="px-4 py-5 sm:px-6">
                <!-- Content goes here -->
                <div class="px-4 py-5 sm:px-6">
                    <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                        <div class="ml-4 mt-2">
                            <h3 class="text-base font-semibold leading-6 text-gray-900">Accident Alert</h3>
                        </div>
                        <div class="flex gap-x-2 ml-4 mt-2 flex-shrink-0">

                            <button
                                v-if="histories[0]['status_report'] === 'pending' && role === 'super_admin' && !alreadyForwarded"
                                class="relative mr-5 inline-flex items-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-500"
                                type="button"
                                @click="assignRescuer = true">
                                Forward to
                            </button>
                            <button
                                v-if="histories[0]['status_report'] === 'closed'"
                                class="relative inline-flex items-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                                type="button">
                                Closed
                            </button>
                            <button
                                v-if="histories[0]['status_report'] === 'in-progress'"
                                class="relative inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="button">
                                In-Progress
                            </button>
                            <div v-if="role === 'rescuer' ">
                                <button
                                    v-if="histories[0]['status_report'] === 'pending' || histories[0]['status_report'] === 'in-progress' || histories[0]['status_report'] === 'accepted'"
                                    class="relative inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    type="button"
                                    @click="open = !open">
                                    Mark as Done
                                </button>
                            </div>
                            <div v-if="histories[0]['status_report'] === 'forwarded' && role === 'rescuer'">
                                <button
                                    class="mr-5 relative inline-flex gap-x-1 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    type="button"
                                    @click="activityAction('accepted')">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor"
                                         stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m4.5 12.75 6 6 9-13.5" stroke-linecap="round"
                                              stroke-linejoin="round" />
                                    </svg>
                                    Accept
                                </button>
                                <button
                                    class="relative inline-flex gap-x-1 items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                    type="button"
                                    @click="rejectModal = true">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor"
                                         stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!isLoading" class="px-4 py-2 sm:p-6">
                <!-- Content goes here -->
                <div class="grid grid-cols-3 gap-5">
                    <div class="col-span-2">
                        <MapsLocation :center="center" />
                    </div>
                    <div class="border border-gray-300 px-5 rounded-lg shadow">
                        <div class="border-b border-gray-200 bg-white py-5">
                            <h3 class="text-base font-semibold leading-6 text-gray-900">Accident Information</h3>
                        </div>
                        <ul class="divide-y divide-gray-100" role="list">
                            <li v-for="(log, idx) in logs" :key="idx"
                                class="flex flex-wrap items-center justify-between gap-x-6 gap-y-5 py-2 sm:flex-nowrap">
                                <div v-for="(history, idxs) in histories" :key="idxs">
                                    <div>
                                        <p class="text-sm font-medium leading-6 text-gray-900">{{ log.title }}</p>
                                    </div>
                                    <div class="mt-1 flex items-center gap-x-2 text-sm leading-5 text-gray-500">
                                        <p
                                            class="text-gray-500">{{ history[log.field] }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
            <div v-if="rescuersInfo[0]" class="px-4 py-4 sm:px-6">
                <!-- Content goes here -->
                <!-- We use less vertical padding on card footers at all sizes than on headers or body sections -->
                <div class="px-4 sm:px-6 lg:px-8">
                    <div class="sm:flex sm:items-center">
                        <div class="sm:flex-auto">
                            <h1 class="text-base font-semibold leading-6 text-gray-900">Accident Responders</h1>
                            <p class="mt-2 text-sm text-gray-700">
                                Information about the rescuers responding to the accident
                            </p>
                        </div>

                    </div>
                    <div class="mt-8 flow-root">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 min-h-56">
                            <ul class="space-y-6" role="list">
                                <li class="relative flex gap-x-4">
                                    <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div class="w-px bg-gray-200"></div>
                                    </div>
                                    <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                    </div>
                                    <div>
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <tbody class="bg-white">
                                            <tr class="even:bg-gray-50">
                                                <td class="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    Name :
                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">

                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">
                                                    {{ rescuersInfo[0]?.name }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li class="relative flex gap-x-4">
                                    <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div class="w-px bg-gray-200"></div>
                                    </div>
                                    <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                    </div>
                                    <div>
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <tbody class="bg-white">
                                            <tr class="even:bg-gray-50">
                                                <td class="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    Address :
                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">

                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">
                                                    {{ rescuersInfo[0]?.address }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li class="relative flex gap-x-4">
                                    <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div class="w-px bg-gray-200"></div>
                                    </div>
                                    <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                    </div>
                                    <div>
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <tbody class="bg-white">
                                            <tr class="even:bg-gray-50">
                                                <td class="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    Contact :
                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">

                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">
                                                    {{ rescuersInfo[0]?.contact }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li class="relative flex gap-x-4">
                                    <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div class="w-px bg-gray-200"></div>
                                    </div>
                                    <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                    </div>
                                    <div>
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <tbody class="bg-white">
                                            <tr class="even:bg-gray-50">
                                                <td class="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    Responder's Name :
                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">

                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">
                                                    {{ rescuersInfo[0]?.responders_name }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                                <li class="relative flex gap-x-4">
                                    <div class="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
                                        <div class="w-px bg-gray-200"></div>
                                    </div>
                                    <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                        <div class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
                                    </div>
                                    <div>
                                        <table class="min-w-full divide-y divide-gray-300">
                                            <tbody class="bg-white">
                                            <tr class="even:bg-gray-50">
                                                <td class="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                                    Notes :
                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">

                                                </td>
                                                <td class="whitespace-nowrap px-3 text-sm text-gray-500">
                                                    {{ rescuersInfo[0]?.notes }}
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot :show="open" as="template">
        <Dialog as="div" class="relative z-10" @close="open = false">
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
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button
                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    type="button"
                                    @click="open = false">
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon aria-hidden="true" class="h-6 w-6 text-red-600" />
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                        Close this alert?
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to mark this accident as
                                            done?
                                            Please note that this action cannot be undone.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    type="button"
                                    @click="closeActivityHistory()">Yes
                                </button>
                                <button
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    type="button"
                                    @click="open = false">Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


    <TransitionRoot :show="assignRescuer" as="template">
        <Dialog as="div" class="relative z-10" @close="assignRescuer = false">
            <div class="fixed inset-0" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template"
                                         enter="transform transition ease-in-out duration-500 sm:duration-700"
                                         enter-from="translate-x-full" enter-to="translate-x-0"
                                         leave="transform transition ease-in-out duration-500 sm:duration-700"
                                         leave-from="translate-x-0" leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div class="bg-custom-bg-500 px-4 py-6 sm:px-6">
                                        <div class="flex items-center justify-between">
                                            <DialogTitle class="text-base font-semibold leading-6 text-white">
                                                Choose a Rescuer:
                                            </DialogTitle>
                                            <div class="ml-3 flex h-7 items-center">
                                                <button
                                                    class="relative rounded-md bg-custom-bg-600 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                    type="button"
                                                    @click="assignRescuer = false">
                                                    <span class="absolute -inset-2.5" />
                                                    <span class="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="mt-1">
                                            <p class="text-sm text-white">Select a medical rescuer to respond to the
                                                accident.</p>
                                        </div>
                                    </div>
                                    <div class="relative flex-1 px-4 py-6 sm:px-6">
                                        <SelectRescuer :id="id" :rescuers="rescuers" />
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>


    <TransitionRoot :show="rejectModal" as="template">
        <Dialog class="relative z-10" @close="open = false">
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
                            class="h-96 relative transform overflow-hidden rounded-lg bg-white px-5 py-10 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="sm:flex sm:items-start">
                                <div
                                    class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon aria-hidden="true" class="h-6 w-6 text-red-600" />
                                </div>
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                        Reject notification
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-500">Are you sure you want to reject this accident
                                            notification?</p>

                                        <Listbox v-model="selected" as="div" class="mt-5">
                                            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">
                                                Select reason for rejecting:
                                            </ListboxLabel>
                                            <div class="relative mt-2">
                                                <ListboxButton
                                                    class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                    <span class="block truncate">{{ selected }}</span>
                                                    <span
                                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                      <ChevronUpDownIcon aria-hidden="true"
                                                                         class="h-5 w-5 text-gray-400" />
                                                    </span>
                                                </ListboxButton>

                                                <transition leave-active-class="transition ease-in duration-100"
                                                            leave-from-class="opacity-100" leave-to-class="opacity-0">
                                                    <ListboxOptions
                                                        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        <ListboxOption v-for="(reason, idx) in reasons" :key="idx"
                                                                       v-slot="{ active, selected }"
                                                                       :value="reason.value"
                                                                       as="template">
                                                            <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4']">
                                                                <span
                                                                    :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ reason.value
                                                                    }}</span>

                                                                <span v-if="selected"
                                                                      :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                                    <CheckIcon aria-hidden="true" class="h-5 w-5" />
                                                                  </span>
                                                            </li>
                                                        </ListboxOption>
                                                    </ListboxOptions>
                                                </transition>
                                            </div>
                                        </Listbox>

                                        <div v-if="selected === 'Others'">
                                            <label
                                                class="block text-sm font-medium leading-6 text-gray-900 mt-5"
                                                for="reasons">If others, please specify:</label>
                                            <div class="mt-2">
                                                <textarea id="reasons"
                                                          v-model="otherReasons"
                                                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                          name="reasons"
                                                          rows="2" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="mt-10 sm:flex sm:flex-row-reverse">
                                <button
                                    v-if="selected === '-'"
                                    class="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                    type="button">Reject
                                </button>
                                <button
                                    v-if="selected !== '-'"
                                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    type="button"
                                    @click="activityAction('rejected')">Reject
                                </button>
                                <button ref="cancelButtonRef"
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        type="button" @click="rejectModal = false">Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
