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
            email: '',
            new_password: '',
            confirm_password: '',
            error_message: null,
            isLoading: false,
            isPasswordMatch: true
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        async signIn() {
            const payload = {
                email: this.email,
                password: this.new_password
            }
            this.isLoading = true
            try {
                if (this.isPasswordMatch) {
                    const resp = await apiSignIn(payload)

                    if (resp['status_code'] == 201) {
                        this.isLoading = false
                        window.location.href = '/signin'
                    } else if (resp['status_code'] == 404) {
                        this.isLoading = false
                        this.error_message = resp['message']
                    }
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
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

async function apiSignIn(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/reset-password`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }).then((resp) => resp)
        return resp.json()
    } catch (error) {
        console.log(error)
        return []
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
                Reset your password
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <div class="space-y-6">
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
                    <div v-if="error_message != null" class="rounded-md bg-red-50 p-4">
                        <div class="flex">
                            <div class="flex-shrink-0">
                                <XCircleIcon aria-hidden="true" class="h-5 w-5 text-red-400" />
                            </div>
                            <div class="ml-3">
                                <h3 class="text-sm font-medium text-red-800">
                                    {{ error_message }}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            class="flex w-full gap-x-2 justify-center rounded-md bg-custom-bg-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                            type="submit"
                            @click="signIn()"
                        >
                            <div v-if="isLoading" class="spinner"></div>
                            Reset Password
                        </button>
                    </div>
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
