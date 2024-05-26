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
            role: '',
            formData: {
                first_name: '',
                last_name: '',
                email: '',
                contact: '',
                address: '',
                password: ''
            },

            isLoading: false,
            isSuccess: false,
            open: false,
            successOpen: false,
            formFields: [
                { name: 'first_name', type: 'text', label: 'First Name' },
                { name: 'last_name', type: 'text', label: 'Last Name' },
                { name: 'email', type: 'email', label: 'Email Address' },
                { name: 'contact', type: 'text', label: 'Contact No.' },
                { name: 'address', type: 'text', label: 'Address' },
                { name: 'password', type: 'password', label: 'Password' }
            ],
            roleField: [
                { value: 'super_admin', label: 'Super Admin' },
                { value: 'rescuer', label: 'Rescuer' },
                { value: 'user', label: 'User' }
            ]
        }
    },
    computed: {},
    methods: {
        async saveBtn() {
            const payload = {
                email: this.formData['email'],
                first_name: this.formData['first_name'],
                last_name: this.formData['last_name'],
                address: this.formData['address'],
                contact: this.formData['contact'],
                password: this.formData['password'],
                role: this.role
            }
            this.isLoading = true
            try {
                const resp = await apiAddNewAccount(payload)

                if (resp['status_code'] === 201) {
                    this.isLoading = false
                    this.isSuccess = true
                    this.open = false
                    this.successOpen = true
                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        },
        generatePassword() {
            const length = 12 // Length of the generated password
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Character set for the password
            let password = ''
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length)
                password += charset[randomIndex]
            }
            this.formData['password'] = password
            console.log(this.formData['password'])
        },

        show_password() {
            var password = document.getElementById('password')
            if (password.type === 'password') {
                password.type = 'text'
            } else {
                password.type = 'password'
            }
        },
        copyToClipboard() {
            const email = `Email Address: ${this.formData['email']}`
            const password = `Password: ${this.formData['password']}`
            const textToCopy = `${email}\n\nTemporary password: \n${password}` // Combine email and password
            navigator.clipboard
                .writeText(textToCopy)
                .then(() => {
                    alert('Successfully copied to clipboard')
                })
                .catch(() => {
                    alert('Error copying to clipboard')
                })
        },

        closeAccountCreatedModal() {
            this.successOpen = false
            window.location.href = '/users'
        }
    },
    mounted() {}
}

async function apiAddNewAccount(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/add-account`, {
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
    <div class="border-b border-gray-200 bg-white">
        <div class="-ml-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div class="ml-4 mt-2"></div>
            <div class="ml-4 mt-2 flex-shrink-0">
                <a-button
                    class="relative inline-flex items-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                    @click="open = true"
                    >Add new user
                </a-button>
            </div>
        </div>
    </div>

    <TransitionRoot :show="open" as="template">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                        >
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button
                                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    type="button"
                                    @click="open = false"
                                >
                                    <span class="sr-only">Close</span>
                                    <XMarkIcon aria-hidden="true" class="h-6 w-6" />
                                </button>
                            </div>
                            <form @submit.prevent="saveBtn">
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            class="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Add new account
                                        </DialogTitle>
                                        <div
                                            v-for="(field, idx) in formFields"
                                            :key="idx"
                                            class="mt-5 border-t border-gray-200"
                                        >
                                            <div class="mt-5">
                                                <label
                                                    :for="field.name"
                                                    class="block text-sm font-medium leading-6 text-gray-900"
                                                    >{{ field.label }}</label
                                                >
                                                <div class="mt-2">
                                                    <input
                                                        :id="field.name"
                                                        v-model="formData[field.name]"
                                                        :type="field.type"
                                                        autocomplete="off"
                                                        class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            class="mt-2 rounded bg-custom-bg-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                            type="button"
                                            @click="generatePassword"
                                        >
                                            Generate Password
                                        </button>

                                        <div class="mt-5 flex items-center">
                                            <input
                                                id="remember-me"
                                                class="h-4 w-4 rounded border-gray-300 text-custom-bg-500 focus:ring-custom-bg-600"
                                                name="remember-me"
                                                type="checkbox"
                                                @click="show_password"
                                            />
                                            <label
                                                class="ml-3 block text-sm leading-6 text-gray-900"
                                                for="remember-me"
                                                >Show password</label
                                            >
                                        </div>

                                        <div class="mt-5 border-t border-gray-200">
                                            <label
                                                class="block text-sm font-medium leading-6 text-gray-900 mt-5"
                                                for="role"
                                                >Role</label
                                            >
                                            <select
                                                id="role"
                                                v-model="role"
                                                class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                name="location"
                                                required
                                            >
                                                <option
                                                    v-for="(role, idx) in roleField"
                                                    :key="idx"
                                                    :value="role.value"
                                                >
                                                    {{ role.label }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        class="inline-flex w-full justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 sm:ml-3 sm:w-auto"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                    <button
                                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        type="button"
                                        @click="open = false"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <TransitionRoot :show="successOpen" as="template">
        <Dialog as="div" class="relative z-10" @close="successOpen = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                        >
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"></div>
                            <form>
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            class="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Account Created Successfully
                                            <p class="mt-2 text-sm text-gray-600">
                                                Please copy the email and password and send it to
                                                the user.
                                                <br />
                                                <span class="font-bold text-red-500">Note: </span
                                                >This information will only be displayed once.
                                            </p>
                                        </DialogTitle>
                                        <div class="mt-5 border-t border-gray-200">
                                            <div class="mt-5">
                                                <label
                                                    class="block text-sm font-medium leading-6 text-gray-900"
                                                    >Email Address</label
                                                >
                                                <div class="mt-2">
                                                    <input
                                                        v-model="formData['email']"
                                                        autocomplete="off"
                                                        class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        disabled
                                                    />
                                                </div>
                                            </div>

                                            <div class="mt-5">
                                                <label
                                                    class="block text-sm font-medium leading-6 text-gray-900"
                                                    >Password</label
                                                >
                                                <div class="mt-2">
                                                    <input
                                                        id="password"
                                                        v-model="formData['password']"
                                                        autocomplete="off"
                                                        class="block w-[450px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        disabled
                                                        type="password"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mt-5 flex items-center">
                                            <input
                                                id="remember-me"
                                                class="h-4 w-4 rounded border-gray-300 text-custom-bg-500 focus:ring-custom-bg-600"
                                                name="remember-me"
                                                type="checkbox"
                                                @click="show_password"
                                            />
                                            <label
                                                class="ml-3 block text-sm leading-6 text-gray-900"
                                                for="remember-me"
                                                >Show password</label
                                            >
                                        </div>

                                        <button
                                            class="inline-flex mt-5 w-full justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                                            type="button"
                                            @click="copyToClipboard"
                                        >
                                            Copy to clipboard
                                        </button>
                                    </div>
                                </div>
                                <div
                                    class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse border-t border-gray-200"
                                >
                                    <button
                                        class="mt-5 inline-flex w-full justify-center rounded-md bg-custom-bg-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-bg-600 sm:ml-3 sm:w-auto"
                                        type="button"
                                        @click="closeAccountCreatedModal"
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped></style>
