<script setup>
import { XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<script>
import BASE_URL from '../../constants.js'

const access_token = localStorage.getItem('access_token')

export default {
    props: ['userProfile'],
    data() {
        return {
            tabContent: 'stage1',
            brand: '',
            model: '',
            year_model: '',
            plate_no: '',
            full_name1: '',
            address1: '',
            contact1: '',
            full_name2: '',
            address2: '',
            contact2: '',
            full_name3: '',
            address3: '',
            contact3: '',
            emptyField: []
        }
    },
    methods: {
        changeTab(tab) {
            console.log(this.userProfile[0]?.brand != '')
            if (this.userProfile[0]?.brand !== '') {
                this.tabContent = 'stage3'

            } else {
                this.tabContent = tab
            }
        },
        async addVehicle() {
            const payload = {
                brand: this.brand,
                model: this.model,
                year_model: this.year_model,
                plate_no: this.plate_no
            }
            this.isLoading = true
            try {
                if (this.brand === '') {
                    this.emptyField.push('brand')
                }
                if (this.model === '') {
                    this.emptyField.push('model')
                }
                if (this.year_model === '') {
                    this.emptyField.push('year_model')
                }
                if (this.plate_no === '') {
                    this.emptyField.push('plate_no')
                }
                if (this.emptyField.length === 0) {
                    const resp = await apiAddVehicle(payload)
                    if (resp.status_code === 201) {
                        this.isLoading = false
                        // window.location.href = '/'
                        this.changeTab('stage3')
                    }
                } else {
                    this.isLoading = false
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        async addTrustedContacts() {
            const payload = [
                {
                    name: this.full_name1,
                    address: this.address1,
                    contact: this.contact1
                },
                {
                    name: this.full_name2,
                    address: this.address2,
                    contact: this.contact2
                },
                {
                    name: this.full_name3,
                    address: this.address3,
                    contact: this.contact3
                }
            ]
            this.isLoading = true
            try {
                const resp = await apiAddTrustedContacts(payload)
                if (resp.status_code === 201) {
                    this.isLoading = false
                    localStorage.setItem('is_onboarding_done', 'true')
                    window.location.href = '/'
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        removeInEmptyField(field) {
            this.emptyField = this.emptyField.filter((item) => item !== field)
        }
    },
    mounted() {
    }
}

async function apiAddVehicle(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/vehicle/add`, {
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

async function apiAddTrustedContacts(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/trusted-contacts/add`, {
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
    <div class="bg-white">
        <div v-if="tabContent === 'stage1'" class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 mt-20">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Welcome <br />{{ userProfile[0]?.first_name }}!
                </h2>
                <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                    Hey there! Welcome to <span class="font-semibold">Iot Safe Drive</span>! We're
                    thrilled to have you join our community. Getting started is easy-peasy. Just
                    fill out a few quick forms to tell us a bit about your vehicle as well as your
                    trusted contacts, and you'll be on your way to experiencing all that
                    <span class="font-semibold">Iot Safe Drive</span> has to offer. Think of it as a
                    friendly handshake – the kind that leads to exciting possibilities.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <a
                        class="cursor-pointer rounded-md bg-custom-bg-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                        @click="changeTab('stage2')"
                    >
                        Get started</a>
                </div>
            </div>
        </div>

        <div
            v-if="tabContent === 'stage2'"
            class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 mt-24"
        >
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Tell us about your vehicle
                    </h2>
                    <p class="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        Please specify the vehicle in which you intend to install the IoTSafeDrive
                        device.
                    </p>
                    <div class="mt-10 flex items-center gap-x-6">
                        <a
                            class="flex gap-x-5 cursor-pointer rounded-md bg-custom-bg-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                            @click="addVehicle"
                        >
                            <div v-if="isLoading" class="spinner"></div>
                            Submit</a
                        >
                    </div>
                </div>
                <div>
                    <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="brand"
                        >Brand</label
                        >
                        <div class="mt-2">
                            <input
                                id="brand"
                                v-model="brand"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="brand"
                                @change="removeInEmptyField('brand')"
                            />
                        </div>
                        <div
                            v-if="emptyField.includes('brand')"
                            class="rounded-md bg-red-50 p-2 mt-2"
                        >
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-xs font-medium text-red-800">
                                        Brand is required
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="model"
                        >Model</label
                        >
                        <div class="mt-2">
                            <input
                                id="model"
                                v-model="model"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="model"
                                @change="removeInEmptyField('model')"
                            />
                        </div>
                        <div
                            v-if="emptyField.includes('model')"
                            class="rounded-md bg-red-50 p-2 mt-2"
                        >
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-xs font-medium text-red-800">
                                        Model is required
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="year_model"
                        >Year Model</label
                        >
                        <div class="mt-2">
                            <input
                                id="year_model"
                                v-model="year_model"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="year_model"
                                @change="removeInEmptyField('year_model')"
                            />
                        </div>
                        <div
                            v-if="emptyField.includes('year_model')"
                            class="rounded-md bg-red-50 p-2 mt-2"
                        >
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-xs font-medium text-red-800">
                                        Year model is required
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5">
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="plate_no"
                        >Plate No</label
                        >
                        <div class="mt-2">
                            <input
                                id="plate_no"
                                v-model="plate_no"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="plate_no"
                                @change="removeInEmptyField('plate_no')"
                            />
                        </div>
                        <div
                            v-if="emptyField.includes('plate_no')"
                            class="rounded-md bg-red-50 p-2 mt-2"
                        >
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-xs font-medium text-red-800">
                                        Plate no. is required
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="tabContent === 'stage3'">
            <div class="space-y-10 divide-y divide-gray-900/10 mx-auto max-w-5xl mt-20">
                <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                    <div class="px-4 sm:px-0">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">
                            Trusted Contacts
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                            Please add up to three trusted contacts below. They will be notified in
                            case of an accident.
                        </p>
                    </div>

                    <form
                        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
                        @submit.prevent="addTrustedContacts"
                    >
                        <div class="px-4 py-6 sm:p-8">
                            <div class="border-b border-gray-200 bg-white py-5">
                                <h3 class="text-base font-semibold leading-6 text-gray-900">
                                    First emergency contact
                                </h3>
                            </div>
                            <div
                                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5"
                            >
                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="full_name"
                                    >Full Name</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="full_name"
                                            v-model="full_name1"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="full_name"
                                            required="required"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="address"
                                    >Address</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="address"
                                            v-model="address1"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="address"
                                            required="required"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="contact"
                                    >Contact</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="contact"
                                            v-model="contact1"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="contact"
                                            required="required"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="px-4 py-6 sm:p-8">
                            <div class="border-b border-gray-200 bg-white py-5">
                                <h3 class="text-base font-semibold leading-6 text-gray-900">
                                    Second emergency contact
                                </h3>
                            </div>
                            <div
                                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5"
                            >
                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="full_name"
                                    >Full Name</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="full_name"
                                            v-model="full_name2"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="full_name"
                                            required="required"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="address"
                                    >Address</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="address"
                                            v-model="address2"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="address"
                                            required="required"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="contact"
                                    >Contact</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="contact"
                                            v-model="contact2"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="contact"
                                            required="required"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="px-4 py-6 sm:p-8">
                            <div class="border-b border-gray-200 bg-white py-5">
                                <h3 class="text-base font-semibold leading-6 text-gray-900">
                                    Third emergency contact
                                </h3>
                            </div>
                            <div
                                class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5"
                            >
                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="full_name"
                                    >Full Name</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="full_name"
                                            v-model="full_name3"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="full_name"
                                            required="required"
                                            type="text"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="address"
                                    >Address</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="address"
                                            v-model="address3"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="address"
                                            required="required"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label
                                        class="block text-sm font-medium leading-6 text-gray-900"
                                        for="contact"
                                    >Contact</label
                                    >
                                    <div class="mt-2">
                                        <input
                                            id="contact"
                                            v-model="contact3"
                                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            name="contact"
                                            required="required"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
                        >
                            <button
                                class="text-sm font-semibold leading-6 text-gray-900"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
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
