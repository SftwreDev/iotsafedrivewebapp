<script>
import BASE_URL from '@/constants.js'
import router from '@/router/index.js'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline/index.js'

const access_token = localStorage.getItem('access_token')

export default {
    components: { DialogTitle, XMarkIcon, Dialog, TransitionChild, DialogPanel, TransitionRoot },
    props: ['rescuers', 'id'],
    data() {
        return {
            name: '',
            address: '',
            contact: '',
            isLoading: false,
            isSuccess: false,
            open: false
        }
    },
    computed: {},
    methods: {
        async saveBtn() {
            const payload = {
                name: this.name,
                address: this.address,
                contact: this.contact
            }
            this.isLoading = true
            try {
                const resp = await apiAddNewRescuer(payload)

                if (resp['status_code'] === 201) {
                    this.isLoading = false
                    this.isSuccess = true

                    window.location.href = `/rescuers-contacts`
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        }
    }
}


async function apiAddNewRescuer(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/rescuers/add`, {
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
    <div class="border-b border-gray-200 bg-white ">
        <div class="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div class="ml-4 mt-2">

            </div>
            <div class="ml-4 mt-2 flex-shrink-0">
                <button
                    class="relative inline-flex items-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                    type="button"
                    @click="open = true"
                >
                    Add new rescuer
                </button>
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
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3"
                                                 class="text-base font-semibold leading-6 text-gray-900">
                                        Add new rescue team
                                    </DialogTitle>
                                    <div class="mt-5  border-t border-gray-200">
                                        <div class="mt-5">
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="name">Name</label>
                                            <div class="mt-2">
                                                <input id="name" v-model="name"
                                                       autocomplete="off"
                                                       class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div class="mt-5">
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="address">Address</label>
                                            <div class="mt-2">
                                                <input id="address" v-model="address"
                                                       autocomplete="off"
                                                       class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div class="mt-5">
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="contact">Contact</label>
                                            <div class="mt-2">
                                                <input id="contact" v-model="contact"
                                                       autocomplete="off"
                                                       class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    class="inline-flex w-full justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 sm:ml-3 sm:w-auto"
                                    type="button"
                                    @click="saveBtn">Save
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
</template>

<style scoped>

</style>