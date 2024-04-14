<script>
import BASE_URL from '@/constants.js'

export default {
    props: ['userProfile', 'vehicle', 'rescuers', 'trusted_contacts'],
    data() {
        return {
            tab: 'profile',
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            contact: '',
            device_id: '',
            profile_picture: '',
            image: '',
            imageUrl: '',
            new_password: '',
            confirm_password: '',

            brand: '',
            model: '',
            year_model: '',
            plate_no: '',

            trusted_contact_name_1: '',
            trusted_contact_address_1: '',
            trusted_contact_contact_1: '',

            trusted_contact_name_2: '',
            trusted_contact_address_2: '',
            trusted_contact_contact_2: '',

            trusted_contact_name_3: '',
            trusted_contact_address_3: '',
            trusted_contact_contact_3: '',

            isLoading: false,
            isPasswordMatch: true
        }
    },
    methods: {
        async updateProfile() {
            const access_token = localStorage.getItem('access_token')

            const payload = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                contact: this.contact,
                address: this.address,
                device_id: this.device_id,
                profile_picture: this.image
            }
            this.isLoading = true
            try {
                const resp = await apiUpdateProfile(payload, access_token)

                if (resp['status_code'] === 201) {
                    this.isLoading = false
                    // window.location.href = '/settings'
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        async updatePassword() {
            const access_token = localStorage.getItem('access_token')

            const payload = {
                password: this.new_password
            }
            this.isLoading = true
            try {
                if (this.isPasswordMatch) {
                    const resp = await apiUpdatePassword(payload, access_token)

                    if (resp['status_code'] === 201) {
                        this.isLoading = false
                        window.location.href = '/settings'
                    }
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        async updateVehicle() {
            const access_token = localStorage.getItem('access_token')

            const payload = {
                brand: this.brand,
                model: this.model,
                year_model: this.year_model,
                plate_no: this.plate_no
            }
            this.isLoading = true
            try {
                const resp = await apiUpdateVehicle(payload, access_token)

                if (resp['status_code'] === 201) {
                    this.isLoading = false
                    window.location.href = '/settings'
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        async updateTrustedContacts() {
            const access_token = localStorage.getItem('access_token')
            const payload = [
                {
                    name: this.trusted_contact_name_1,
                    address: this.trusted_contact_address_1,
                    contact: this.trusted_contact_contact_1
                },
                {
                    name: this.trusted_contact_name_2,
                    address: this.trusted_contact_address_2,
                    contact: this.trusted_contact_contact_2
                },
                {
                    name: this.trusted_contact_name_3,
                    address: this.trusted_contact_address_3,
                    contact: this.trusted_contact_contact_3
                }
            ]
            this.isLoading = true
            try {
                const resp = await apiUpdateTrustedContacts(payload, access_token)
                if (resp.status_code === 201) {
                    this.isLoading = false
                    // window.location.href = '/settings'
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0]

            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                console.error('The selected file is not an image.')
                return
            }

            // Read the file as Data URL
            const reader = new FileReader()
            reader.onload = () => {
                this.image = file
                this.imageUrl = reader.result // Set imageUrl to the Data URL of the uploaded image
            }
            reader.readAsDataURL(file)
        },
        checkIfPasswordMatch() {
            this.isPasswordMatch = this.new_password === this.confirm_password
        }
    },
    watch: {
        userProfile: {
            handler(newValue) {
                if (newValue.length > 0) {
                    this.first_name = newValue[0].first_name || ''
                    this.last_name = newValue[0].last_name || ''
                    this.email = newValue[0].email || ''
                    this.address = newValue[0].address || ''
                    this.contact = newValue[0].contact || ''
                    this.device_id = newValue[0].device_id || ''
                    this.profile_picture = newValue[0].profile_picture || ''
                }
            },
            deep: true // Watch for changes inside the array elements
        },
        vehicle: {
            handler(newValue) {
                if (newValue.length > 0) {
                    this.brand = newValue[0].brand || ''
                    this.model = newValue[0].model || ''
                    this.year_model = newValue[0].year_model || ''
                    this.plate_no = newValue[0].plate_no || ''
                }
            },
            deep: true // Watch for changes inside the array elements
        },
        trusted_contacts: {
            handler(newValue) {
                if (newValue.length > 0) {
                    this.trusted_contact_name_1 = newValue[0].name || ''
                    this.trusted_contact_address_1 = newValue[0].address || ''
                    this.trusted_contact_contact_1 = newValue[0].contact || ''

                    this.trusted_contact_name_2 = newValue[1].name || ''
                    this.trusted_contact_address_2 = newValue[1].address || ''
                    this.trusted_contact_contact_2 = newValue[1].contact || ''

                    this.trusted_contact_name_3 = newValue[2].name || ''
                    this.trusted_contact_address_3 = newValue[2].address || ''
                    this.trusted_contact_contact_3 = newValue[2].contact || ''

                }
            },
            deep: true // Watch for changes inside the array elements
        },
        loading: {
            handler(newValue) {
                if (!newValue && this.userProfile.length > 0) {
                    this.first_name = this.userProfile[0].first_name || ''
                    this.last_name = this.userProfile[0].last_name || ''
                    this.email = this.userProfile[0].email || ''
                    this.address = this.userProfile[0].address || ''
                    this.contact = this.userProfile[0].contact || ''
                    this.device_id = this.userProfile[0].device_id || ''
                    this.profile_picture = this.userProfile[0].profile_picture || ''
                }
            },
            immediate: true // Trigger the handler immediately after mounting
        }
    }

}

async function apiUpdateProfile(payload, access_token) {
    try {
        // Construct FormData object
        const formData = new FormData()
        formData.append('email', payload.email)
        formData.append('first_name', payload.first_name)
        formData.append('last_name', payload.last_name)
        formData.append('contact', payload.contact)
        formData.append('address', payload.address)
        formData.append('device_id', payload.device_id)
        formData.append('profile_picture', payload.profile_picture)
        // Append additional fields as needed

        const resp = await fetch(`${BASE_URL}/api/actor/profile/update`, {
            method: 'POST',
            body: formData, // Pass FormData object as body
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        // Check if response is ok
        if (!resp.ok) {
            throw new Error('Network response was not ok')
        }

        return await resp.json() // Return JSON response
    } catch (error) {
        console.error('Error:', error)
        return [] // Return empty array if there's an error
    }
}

async function apiUpdatePassword(payload, access_token) {
    try {
        const resp = await fetch(`${BASE_URL}/api/update-password`, {
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

async function apiUpdateVehicle(payload, access_token) {
    try {
        const resp = await fetch(`${BASE_URL}/api/vehicle/update`, {
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

async function apiUpdateTrustedContacts(payload, access_token) {
    try {
        const resp = await fetch(`${BASE_URL}/api/trusted-contacts/update`, {
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
        <Disclosure v-slot="{ open }" as="div" class="relative overflow-hidden bg-sky-700 pb-32">
            <nav
                :class="[open ? 'bg-sky-900' : 'bg-transparent', 'relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent']">
                <div class="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                    <div class="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
                        <div class="flex items-center px-2 lg:px-0">

                        </div>
                        <div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                            <div class="w-full max-w-lg lg:max-w-xs">
                                <div class="relative text-sky-100 focus-within:text-gray-400">

                                </div>
                            </div>
                        </div>
                        <div class="flex lg:hidden">

                        </div>
                        <div class="hidden lg:ml-4 lg:block">

                        </div>
                    </div>
                </div>

            </nav>
            <div
                :class="[open ? 'bottom-0' : 'inset-y-0', 'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0']"
                aria-hidden="true">
                <div class="absolute inset-0 flex">
                    <div class="h-full w-1/2" style="background-color: #009485" />
                    <div class="h-full w-1/2" style="background-color: #037e71" />
                </div>
                <div class="relative flex justify-center">
                    <svg class="flex-shrink-0" height="308" viewBox="0 0 1750 308" width="1750">
                        <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#009485" />
                        <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#009485" />
                        <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#037e71" />
                        <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#037e71" />
                    </svg>
                </div>
            </div>
            <header class="relative py-10">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-white">Settings</h1>
                </div>
            </header>
        </Disclosure>

        <main class="relative -mt-32">
            <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                <div class="overflow-hidden rounded-lg bg-white shadow">
                    <div class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
                        <aside class="py-6 lg:col-span-3">
                            <nav class="space-y-1">
                                <a v-for="item in subNavigation" :key="item.name"
                                   :aria-current="item.current ? 'page' : undefined"
                                   :class="[tab === item.tab ? 'bg-custom-bg-500 text-gray-100 rounded-lg cursor-pointer' : 'border-transparent cursor-pointer text-gray-900 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center border-l-4 px-3 py-2 text-sm font-medium']"
                                   @click="tab = item.tab"
                                >
                                    <span class="truncate">{{ item.name }}</span>
                                </a>
                            </nav>
                        </aside>

                        <div v-if="tab === 'profile' "
                             class="divide-y divide-gray-200 lg:col-span-9"
                        >
                            <!-- Profile section -->
                            <div class="px-4 py-6 sm:p-6 lg:pb-8">
                                <div>
                                    <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
                                    <p class="mt-1 text-sm text-gray-500">This information will be displayed publicly so
                                        be careful what you share.</p>
                                </div>

                                <div class="mt-6 flex flex-col lg:flex-row">
                                    <div class="flex-grow space-y-6">
                                        <div>
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="username">Email address</label>
                                            <div class="mt-2 flex rounded-md shadow-sm">

                                                <input
                                                    v-model="email"
                                                    class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                    name="url"
                                                    type="text" />
                                            </div>
                                        </div>

                                        <div class="mt-6 grid grid-cols-12 gap-6">
                                            <div class="col-span-12 sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="first-name">First
                                                    name</label>
                                                <input id="first-name" v-model="first_name" autocomplete="given-name"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="first-name"
                                                       type="text" />
                                            </div>

                                            <div class="col-span-12 sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="last-name">Last
                                                    name</label>
                                                <input id="last-name" v-model="last_name"
                                                       autocomplete="family-name"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="last-name"
                                                       type="text" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-6 flex-grow lg:ml-6 lg:mt-0 lg:flex-shrink-0 lg:flex-grow-0">
                                        <p aria-hidden="true" class="text-sm font-medium leading-6 text-gray-900">
                                            Photo</p>
                                        <div class="mt-2 lg:hidden">
                                            <div class="flex items-center">
                                                <div
                                                    aria-hidden="true"
                                                    class="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                                                    <img :src="profile_picture" alt=""
                                                         class="h-full w-full rounded-full" />
                                                </div>
                                                <div class="relative ml-5">
                                                    <input id="mobile-user-photo"
                                                           class="peer absolute h-full w-full rounded-md opacity-0"
                                                           name="user-photo"
                                                           type="file" @change="handleFileUpload" />
                                                    <label
                                                        class="pointer-events-none block rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 peer-hover:ring-gray-400 peer-focus:ring-2 peer-focus:ring-sky-500"
                                                        for="mobile-user-photo">
                                                        <span>Change</span>
                                                        <span class="sr-only"> user photo</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="relative hidden overflow-hidden rounded-full lg:block">
                                            <img v-if="imageUrl === ''" :src="profile_picture" alt=""
                                                 class="relative h-40 w-40 rounded-full" />
                                            <img v-if="imageUrl !== ''" :src="imageUrl" alt=""
                                                 class="relative h-40 w-40 rounded-full" />
                                            <label
                                                class="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                                                for="desktop-user-photo">
                                                <span>Change</span>
                                                <span class="sr-only"> user photo</span>
                                                <input id="desktop-user-photo"
                                                       class="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                                       name="user-photo"
                                                       type="file"
                                                       @change="handleFileUpload" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-6 grid grid-cols-12 gap-6">
                                    <div class="col-span-12 sm:col-span-6">
                                        <label class="block text-sm font-medium leading-6 text-gray-900"
                                               for="first-name">Address</label>
                                        <input id="first-name" v-model="address" autocomplete="given-name"
                                               class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                               name="first-name"
                                               type="text" />
                                    </div>

                                    <div class="col-span-12 sm:col-span-6">
                                        <label class="block text-sm font-medium leading-6 text-gray-900"
                                               for="last-name">Contact</label>
                                        <input id="last-name" v-model="contact" autocomplete="family-name"
                                               class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                               name="last-name"
                                               type="text" />
                                    </div>

                                    <div class="col-span-12 sm:col-span-6">
                                        <label class="block text-sm font-medium leading-6 text-gray-900" for="company">Device
                                            Id</label>
                                        <input id="company" v-model="device_id" autocomplete="organization"
                                               class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                               name="company"
                                               type="text" />
                                    </div>
                                </div>
                            </div>

                            <!-- Privacy section -->
                            <div class="divide-y divide-gray-200 pt-6">

                                <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                                    <button
                                        class="flex gap-x-2 inline-flex justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                        @click="updateProfile">
                                        <div v-if="isLoading" class="spinner"></div>
                                        <span v-if="!isLoading">Save</span>
                                        <span v-if="isLoading">Saving...</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="tab === 'vehicle' "
                             class="divide-y divide-gray-200 lg:col-span-9"
                        >
                            <!-- Vehicle section -->
                            <div class="px-4 py-6 sm:p-6 lg:pb-8">
                                <div>
                                    <h2 class="text-lg font-medium leading-6 text-gray-900">Vehicle</h2>
                                    <p class="mt-1 text-sm text-gray-500">You can update your vehicle information
                                        here</p>
                                </div>

                                <div class="mt-6 flex flex-col lg:flex-row">
                                    <div class="flex-grow space-y-6">

                                        <div>
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="brand">Brand</label>
                                            <div class="mt-2 flex rounded-md shadow-sm">

                                                <input
                                                    v-model="brand"
                                                    class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="model">Model</label>
                                            <div class="mt-2 flex rounded-md shadow-sm">

                                                <input
                                                    v-model="model"
                                                    class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="year_model">Year Model</label>
                                            <div class="mt-2 flex rounded-md shadow-sm">

                                                <input
                                                    v-model="year_model"
                                                    class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium leading-6 text-gray-900"
                                                   for="plate_no">Plate No.</label>
                                            <div class="mt-2 flex rounded-md shadow-sm">

                                                <input
                                                    v-model="plate_no"
                                                    class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                    type="text" />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <!-- Privacy section -->
                            <div class="divide-y divide-gray-200 pt-6">

                                <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                                    <button
                                        class="flex gap-x-2 inline-flex justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                        @click="updateVehicle">
                                        <div v-if="isLoading" class="spinner"></div>
                                        <span v-if="!isLoading">Save</span>
                                        <span v-if="isLoading">Saving...</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div v-if="tab === 'password' "
                             class="divide-y divide-gray-200 lg:col-span-9"
                        >
                            <!-- Password section -->
                            <div class="px-4 py-6 sm:p-6 lg:pb-8">
                                <div>
                                    <h2 class="text-lg font-medium leading-6 text-gray-900">Password</h2>
                                    <p class="mt-1 text-sm text-gray-500">You can update your password here</p>
                                </div>

                                <div class="mt-6 flex flex-col lg:flex-row">
                                    <div class="flex-grow space-y-6">

                                        <div class="mt-6 grid grid-cols-12 gap-6">
                                            <div class="col-span-12 sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="new_password">
                                                    New Password
                                                </label>
                                                <input id="new_password" v-model="new_password"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="new_password"
                                                       type="password" />
                                            </div>

                                            <div class="col-span-12 sm:col-span-6">
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="confirm_password">
                                                    Confirm Password
                                                </label>
                                                <input id="confirm_password" v-model="confirm_password"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="confirm_password"
                                                       type="password"
                                                       @change="checkIfPasswordMatch"
                                                />
                                            </div>
                                        </div>
                                        <div v-if="!isPasswordMatch" class="rounded-md bg-red-50 p-4">
                                            <div class="flex">
                                                <div class="flex-shrink-0">
                                                    <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                                                </div>
                                                <div class="ml-3">
                                                    <h3 class="text-sm font-medium text-red-800">
                                                        New and confirm password doesn't match
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <!-- Privacy section -->
                            <div class="divide-y divide-gray-200 pt-6">

                                <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                                    <button
                                        class="flex gap-x-2 inline-flex justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                        @click="updatePassword">
                                        <div v-if="isLoading" class="spinner"></div>
                                        <span v-if="!isLoading">Save</span>
                                        <span v-if="isLoading">Saving...</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <form v-if="tab === 'trusted-contacts' "
                              class="divide-y divide-gray-200 lg:col-span-9"
                              @submit.prevent=""
                        >
                            <!-- Password section -->
                            <div class="px-4 py-6 sm:p-6 lg:pb-8">
                                <div>
                                    <h2 class="text-lg font-medium leading-6 text-gray-900">Trusted Contacts</h2>
                                    <p class="mt-1 text-sm text-gray-500">You can update your 3 trusted contacts
                                        here</p>
                                </div>

                                <div class="mt-6 flex flex-col lg:flex-row">
                                    <div class="flex-grow space-y-6">

                                        <div v-for="(items, index) in trusted_contacts" :key="items.id"
                                             class="mt-6 grid grid-cols-3 gap-6">
                                            <div>
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="trusted_contact_name_1">
                                                    Name
                                                </label>
                                                <input id="trusted_contact_name_1"
                                                       v-model='trusted_contact_name'
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="trusted_contact_name_1" />
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="trusted_contact_address_1">
                                                    Address
                                                </label>
                                                <input id="trusted_contact_address_1"
                                                       v-model="trusted_contact_address_1"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="trusted_contact_address_1"
                                                />
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium leading-6 text-gray-900"
                                                       for="trusted_contact_contact_1">
                                                    Contact
                                                </label>
                                                <input id="trusted_contact_contact_1"
                                                       v-model="trusted_contact_contact_1"
                                                       class="mt-2 block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-0 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                                                       name="trusted_contact_contact_1"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <!-- Privacy section -->
                            <div class="divide-y divide-gray-200 pt-6">

                                <div class="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                                    <button
                                        class="flex gap-x-2 inline-flex justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                    >
                                        <div v-if="isLoading" class="spinner"></div>
                                        <span v-if="!isLoading">Save</span>
                                        <span v-if="isLoading">Saving...</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {
    Disclosure
} from '@headlessui/vue'

import {
    KeyIcon,
    UserCircleIcon
} from '@heroicons/vue/24/outline'
import { XCircleIcon } from '@heroicons/vue/20/solid/index.js'

const subNavigation = [
    { name: 'Profile', tab: 'profile' },
    { name: 'Vehicle', tab: 'vehicle' },
    { name: 'Password', tab: 'password' },
    { name: 'Trusted Contacts', tab: 'trusted-contacts' }
]

</script>

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