<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

import { storeToRefs } from 'pinia'

import { useForwardedAccidentStore, usePendingActivityHistoriesStore } from '@/stores/history.js'
import CustomDataTableActions from '@/components/tables/CustomDataTableActions.vue'
import { useIsPasswordChangedStore } from '@/stores/user.js'
import { XCircleIcon } from '@heroicons/vue/20/solid/index.js'
import BASE_URL from '@/constants.js'
import CustomErrorAlerts from '@/components/alerts/CustomErrorAlerts.vue'
import CustomSuccessAlerts from '@/components/alerts/CustomSuccessAlerts.vue'
import CustomDataTableActionsRescuers from '@/components/tables/CustomDataTableActionsRescuers.vue'


const { histories, loading } = storeToRefs(usePendingActivityHistoriesStore())
const { fetchPendingActivityHistories } = usePendingActivityHistoriesStore()

const { forwarded_accidents, faLoading } = storeToRefs(useForwardedAccidentStore())
const { fetchForwardedAccidents } = useForwardedAccidentStore()

const { is_password_changed } = storeToRefs(useIsPasswordChangedStore())
const { fetchIsPasswordChanged } = useIsPasswordChangedStore()


const columns = [
    { field: 'time_stamps', title: 'TIME STAMPS' },
    { field: 'owner', title: 'USER' },
    { field: 'location', title: 'LOCATION' },
    { field: 'latitude', title: 'LATITUDE' },
    { field: 'longitude', title: 'LONGITUDE' },
    { field: 'status_report', title: 'STATUS REPORT' },
    { field: 'status', title: 'STATUS' },
    { field: 'actions', title: 'ACTIONS' }
]

const faColumns = [
    { field: 'victim', title: 'PATIENT' },
    { field: 'location', title: 'LOCATION' },
    { field: 'accident_occurred_on', title: 'ACCIDENT OCCURRED ON' },
    { field: 'forwarded_by', title: 'FORWARDED BY' },
    { field: 'forwarded_on', title: 'FORWARDED ON' },
    { field: 'status', title: 'STATUS' },
    { field: 'actions', title: 'ACTIONS' }
]

fetchPendingActivityHistories()
fetchIsPasswordChanged()
fetchForwardedAccidents()

const role = localStorage.getItem('role')


const open = ref(is_password_changed.value === true ? false : false)
const current_password = ref('')
const new_password = ref('')
const confirm_password = ref('')
const isPasswordMatch = ref(true)
const isSuccess = ref(false)
const isError = ref(false)
const isLoading = ref(false)
const content = ref('')


const access_token = localStorage.getItem('access_token')

function showPassword() {
    var current_password = document.getElementById('current_password')
    var new_password = document.getElementById('new_password')
    var confirm_password = document.getElementById('confirm_password')

    if (current_password.type === 'password' || new_password.type === 'password' || confirm_password.type === 'password') {
        current_password.type = 'text'
        new_password.type = 'text'
        confirm_password.type = 'text'
    } else {
        current_password.type = 'password'
        new_password.type = 'password'
        confirm_password.type = 'password'
    }
}


function checkIfPasswordMatch() {
    isPasswordMatch.value = new_password.value === confirm_password.value
}

async function apiUpdatePassword() {

    const payload = {
        'current_password': current_password.value,
        'new_password': new_password.value
    }
    try {
        const resp = await fetch(`${BASE_URL}/api/update-temporary-password`, {
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


async function saveBtn() {
    isLoading.value = true
    try {
        const resp = await apiUpdatePassword()

        if (resp['status_code'] === 201) {
            isLoading.value = false
            isSuccess.value = true
            isError.value = false
            content.value = resp['message']
            setTimeout(() => {
                window.location.href = '/'
            }, 2000)

        } else {
            isLoading.value = false
            isSuccess.value = false
            isError.value = true
            content.value = resp['message']
        }
    } catch (err) {
        console.error('Error creating account:', err)
        isError.value = true
        content.value = err
    }
}
</script>


<template>
    <div v-if="!loading">

        <TransitionRoot :show="open" as="template">
            <Dialog as="div" class="relative z-10">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0"
                                 enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100"
                                 leave-to="opacity-0">
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
                                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div
                                            class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon aria-hidden="true" class="h-6 w-6 text-red-600" />
                                        </div>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <DialogTitle as="h3"
                                                         class="text-base font-semibold leading-6 text-gray-900">
                                                Update password
                                            </DialogTitle>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">You're still using your temporary
                                                    password. Please update it now to continue using this
                                                    application</p>

                                                <form class="gap-y-5 mt-5 border-t border-gray-200"
                                                      @submit.prevent="saveBtn">
                                                    <label
                                                        class="mt-5 block text-sm font-medium leading-6 text-gray-900"
                                                        for="current_password">Current password</label>
                                                    <div class="mt-2">
                                                        <input id="current_password" v-model="current_password"
                                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                               name="current_password"
                                                               required
                                                               type="password" />
                                                    </div>

                                                    <label
                                                        class="mt-5 block text-sm font-medium leading-6 text-gray-900"
                                                        for="new_password">New password</label>
                                                    <div class="mt-2">
                                                        <input id="new_password" v-model="new_password"
                                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                               name="new_password"
                                                               required
                                                               type="password" />
                                                    </div>

                                                    <label
                                                        class="mt-5 block text-sm font-medium leading-6 text-gray-900"
                                                        for="confirm_password">Confirm password</label>
                                                    <div class="mt-2">
                                                        <input id="confirm_password" v-model="confirm_password"
                                                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                               name="confirm_password"
                                                               required
                                                               type="password"
                                                               @change="checkIfPasswordMatch" />
                                                    </div>
                                                    <div v-if="!isPasswordMatch" class="rounded-md bg-red-50 p-4">
                                                        <div class="flex">
                                                            <div class="flex-shrink-0">
                                                                <XCircleIcon aria-hidden="true"
                                                                             class="h-5 w-5 text-red-400" />
                                                            </div>
                                                            <div class="ml-3">
                                                                <h3 class="text-sm font-medium text-red-800">
                                                                    New and confirm password doesn't match
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <CustomSuccessAlerts v-if="isSuccess" :content="content" />
                                                    <CustomErrorAlerts v-if="isError" :content="content" />

                                                    <div class="flex items-center mt-5">
                                                        <input
                                                            id="remember-me"
                                                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                            name="remember-me"
                                                            type="checkbox"
                                                            @click="showPassword"
                                                        />
                                                        <label
                                                            class="ml-3 block text-sm leading-6 text-gray-900"
                                                            for="remember-me"
                                                        >Show password</label
                                                        >
                                                    </div>

                                                    <button
                                                        class="my-5 flex w-full gap-x-2 justify-center rounded-md bg-custom-bg-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                                        type="submit"
                                                    >
                                                        <div v-if="isLoading" class="spinner"></div>
                                                        Sign in
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <div v-if="role === 'super_admin'">
            <CustomDataTableActions :cols="columns" :isLoading="loading"
                                    :rows="histories"
                                    title="Dashboard" />
        </div>

        <div v-if="role === 'rescuer'">
            <CustomDataTableActionsRescuers :cols="faColumns" :isLoading="faLoading"
                                            :rows="forwarded_accidents"
                                            title="Dashboard" />
        </div>
    </div>
</template>
<style scoped>
.spinner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(farthest-side, #ffff 94%, #0000) top/3.8px 3.8px no-repeat,
    conic-gradient(#0000 30%, #ffff);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 3.8px), #000 0);
    animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
    100% {
        transform: rotate(1turn);
    }
}
</style>