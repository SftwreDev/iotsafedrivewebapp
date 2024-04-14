<script setup>
import { XCircleIcon } from '@heroicons/vue/20/solid'
</script>

<script>
import BASE_URL from '../../constants.js'

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            first_name: '',
            last_name: '',
            contact: '',
            email: '',
            address: '',
            device_id: '',
            new_password: '',
            confirm_password: '',
            image: null,
            isLoading: false,
            isPasswordMatch: true
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        async signUp() {
            const payload = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                contact: this.contact,
                address: this.address,
                device_id: this.device_id,
                new_password: this.new_password,
                profile_picture: this.image
            }
            this.isLoading = true
            try {
                if (this.isPasswordMatch) {
                    const resp = await apiSignUp(payload)

                    if (resp['status_code'] === 201) {
                        this.isLoading = false
                        // window.location.href = '/signin'
                    }
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0]
            this.image = file
            console.log(this.image)
        },
        checkIfPasswordMatch() {
            if (this.new_password === this.confirm_password) {
                this.isPasswordMatch = true
            } else {
                this.isPasswordMatch = false
            }
        }
    },

    mounted() {
    }
}

async function apiSignUp(payload) {
    try {
        // Construct FormData object
        const formData = new FormData()
        formData.append('email', payload.email)
        formData.append('first_name', payload.first_name)
        formData.append('last_name', payload.last_name)
        formData.append('contact', payload.contact)
        formData.append('address', payload.address)
        formData.append('device_id', payload.device_id)
        formData.append('password', payload.new_password)
        formData.append('profile_picture', payload.profile_picture)
        // Append additional fields as needed

        const resp = await fetch(`${BASE_URL}/api/signup`, {
            method: 'POST',
            body: formData // Pass FormData object as body
            // Note: Content-Type header is set automatically when FormData is used
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
</script>
<template>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img alt=""
                 class="mx-auto h-24 w-24 rounded-full ring-1 ring-custom-bg-500 p-0.5"
                 src="/logo.png" />
            <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your own account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div class="space-y-6">
                    <div>
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="profile_picture"
                        >Profile Picture</label
                        >
                        <div class="mt-2">
                            <input
                                id="profile_picture"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                required=""
                                type="file"
                                @change="handleFileUpload"
                            />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label
                                class="block text-sm font-medium leading-6 text-gray-900"
                                for="first_name"
                            >First Name</label
                            >
                            <div class="mt-2">
                                <input
                                    id="first_name"
                                    v-model="first_name"
                                    autocomplete="first_name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="first_name"
                                    required=""
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium leading-6 text-gray-900"
                                for="last_name"
                            >Last Name</label
                            >
                            <div class="mt-2">
                                <input
                                    id="last_name"
                                    v-model="last_name"
                                    autocomplete="last_name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="last_name"
                                    required=""
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="address"
                        >Address</label
                        >
                        <div class="mt-2">
                            <input
                                id="address"
                                v-model="address"
                                autocomplete="address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="address"
                                required=""
                            />
                        </div>
                    </div>
                    <div>
                        <div class="sm:col-span-4">
                            <label
                                class="block text-sm font-medium leading-6 text-gray-900"
                                for="contact"
                            >Contact</label
                            >
                            <div class="mt-2">
                                <div
                                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                                >
                                    <span
                                        class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                    >+63</span
                                    >
                                    <input
                                        id="contact"
                                        v-model="contact"
                                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        name="contact"
                                        placeholder="9xxxxxxxxx"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium leading-6 text-gray-900" for="email"
                        >Email address</label
                        >
                        <div class="mt-2">
                            <input
                                id="email"
                                v-model="email"
                                autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="email"
                                required=""
                                type="email"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="new_password"
                        >New Password</label
                        >
                        <div class="mt-2">
                            <input
                                id="new_password"
                                v-model="new_password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="new_password"
                                required=""
                                type="password"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="confirm_password"
                        >Confirm Password</label
                        >
                        <div class="mt-2">
                            <input
                                id="confirm_password"
                                v-model="confirm_password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="confirm_password"
                                required=""
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
                    <div>
                        <label
                            class="block text-sm font-medium leading-6 text-gray-900"
                            for="device_id"
                        >Device ID</label
                        >
                        <div class="mt-2">
                            <input
                                id="device_id"
                                v-model="device_id"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="device_id"
                                required=""
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                class="h-4 w-4 rounded border-gray-300 text-custom-bg-600 focus:ring-custom-bg-600"
                                name="remember-me"
                                type="checkbox"
                            />
                            <label
                                class="ml-3 block text-sm leading-6 text-gray-900"
                                for="remember-me"
                            >Show password</label
                            >
                        </div>
                    </div>

                    <div>
                        <button
                            class="flex w-full gap-x-2 justify-center rounded-md bg-custom-bg-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                            type="submit"
                            @click="signUp()"
                        >
                            <div v-if="isLoading" class="spinner"></div>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Already a member? Sign in
                {{ ' ' }}
                <a
                    class="font-semibold leading-6 text-custom-bg-500 hover:text-custom-bg-600"
                    href="/signin"
                >here</a
                >
            </p>
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
