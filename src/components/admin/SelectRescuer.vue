<script setup>

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/vue/20/solid'

</script>

<script>
import BASE_URL from '@/constants.js'
import router from '@/router/index.js'

const access_token = localStorage.getItem('access_token')

export default {
    props: ['rescuers', 'id'],
    data() {
        return {
            selected: '',
            responders_name: '',
            notes: '',
            forwarded_by: '',
            isLoading: false,
            isSuccess: false,
            alreadyForwarded: false
        }
    },
    computed: {},
    methods: {
        async saveBtn() {
            const payload = {
                activity_history_id: this.id,
                rescuer_id: `${this.selected.id}`,
                forwarded_by: this.forwarded_by,
                notes: this.notes,
                status: 'pending'
            }
            this.isLoading = true
            try {
                const resp = await apiForwardAccident(payload)

                if (resp['status_code'] === 200) {
                    this.isLoading = false
                    this.isSuccess = true

                    setInterval(() => {
                        window.location.href = `/alert/${this.id}`
                    }, 3000)
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        }


    }
}


async function apiForwardAccident(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/accident-alert/forward`, {
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

    <div>
        <div>
            <Listbox v-model="selected" as="div">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Assigned to</ListboxLabel>
                <div class="relative mt-2">
                    <ListboxButton
                        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <span v-if="selected" class="block truncate">{{ selected.name }}</span>
                        <span v-else class="block truncate">-</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" class="h-5 w-5 text-gray-400" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                                leave-to-class="opacity-0">
                        <ListboxOptions
                            class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption v-for="(rescuer, idx) in rescuers" :key="idx" v-slot="{ active, selected }"
                                           :value="rescuer"
                                           as="template">
                                <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                <span
                                    :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ rescuer.name
                                    }}
                                </span>

                                    <span v-if="selected"
                                          :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                    <CheckIcon aria-hidden="true" class="h-5 w-5" />
                                </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>
        </div>


        <div class="mt-8">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="notes">Notes</label>
            <div class="mt-2">
                <textarea id="notes" v-model="notes"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          name="notes"
                          rows="4" />
            </div>
        </div>

        <div class="mt-8">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="forwarded_by">Forwarded by</label>
            <div class="mt-2">
                <input id="forwarded_by" v-model="forwarded_by"
                       class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       name="notes" />
            </div>
        </div>

        <button
            v-if="!isLoading"
            class=" gap-x-2 mt-8 relative mr-5 inline-flex items-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-500"
            type="button"
            @click="saveBtn">
            Save
        </button>

        <button
            v-if="isLoading"
            class=" gap-x-2 mt-8 relative mr-5 inline-flex items-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-500"
            type="button">
            <div class="spinner"></div>
            Saving...
        </button>

        <!-- Global notification live region, render this permanently at the end of the document -->
        <div aria-live="assertive"
             class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
            <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
                <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
                <transition enter-active-class="transform ease-out duration-300 transition"
                            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                            leave-to-class="opacity-0">
                    <div v-if="isSuccess"
                         class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div class="p-4">
                            <div class="flex items-start">
                                <div class="flex-shrink-0">
                                    <CheckCircleIcon aria-hidden="true" class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-3 w-0 flex-1 pt-0.5">
                                    <p class="text-sm font-medium text-gray-900">Successfully saved!</p>
                                </div>
                                <div class="ml-4 flex flex-shrink-0">
                                    <button
                                        class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        type="button"
                                        @click="isSuccess = false">
                                        <span class="sr-only">Close</span>
                                        <XMarkIcon aria-hidden="true" class="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.spinner {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: conic-gradient(#0000 10%, #ffffff);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 3.8px), #000 0);
    animation: spinner-zp9dbg 1s infinite linear;
}

@keyframes spinner-zp9dbg {
    to {
        transform: rotate(1turn);
    }
}
</style>