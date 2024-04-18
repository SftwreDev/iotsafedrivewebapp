<script>
import BASE_URL from '../../constants.js'

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        async signIn() {
            const payload = {
                email: this.email,
                password: this.password
            }
            this.isLoading = true
            try {
                const resp = await apiSignIn(payload)

                if (resp['status_code'] === 200) {
                    localStorage.clear()
                    const access_token = resp['data'][0]['access_token']
                    const refresh_token = resp['data'][0]['refresh_token']
                    const first_name = resp['data'][0]['first_name']
                    const last_name = resp['data'][0]['last_name']
                    const profile_picture = resp['data'][0]['profile_picture']
                    const email_address = resp['data'][0]['email']
                    const is_superuser = resp['data'][0]['is_superuser']
                    const is_staff = resp['data'][0]['is_staff']
                    const is_onboarding_done = resp['data'][0]['is_onboarding_done']

                    // Add the token to localStorage
                    localStorage.setItem('access_token', access_token)
                    localStorage.setItem('refresh_token', refresh_token)
                    localStorage.setItem('full_name', `${first_name} ${last_name}`)
                    localStorage.setItem('email_address', email_address)
                    localStorage.setItem('profile_picture', profile_picture)
                    localStorage.setItem('is_superuser', is_superuser)
                    localStorage.setItem('is_staff', is_staff)
                    localStorage.setItem('is_onboarding_done', is_onboarding_done)

                    this.isLoading = false

                    if (is_superuser) {
                        window.location.href = '/dashboard'
                    } else {
                        window.location.href = '/'
                    }

                }
            } catch (err) {
                console.error('Error creating account:', err)
            }
        }
    },

    mounted() {
    }
}

async function apiSignIn(payload) {
    try {
        const resp = await fetch(`${BASE_URL}/api/signin`, {
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
                Sign in to your account
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
                            for="password"
                        >Password</label
                        >
                        <div class="mt-2">
                            <input
                                id="password"
                                v-model="password"
                                autocomplete="current-password"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name="password"
                                required=""
                                type="password"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember-me"
                                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                name="remember-me"
                                type="checkbox"
                            />
                            <label
                                class="ml-3 block text-sm leading-6 text-gray-900"
                                for="remember-me"
                            >Remember me</label
                            >
                        </div>

                        <div class="text-sm leading-6">
                            <a
                                class="font-semibold text-custom-bg-500 hover:text-custom-bg-600"
                                href="/reset-password"
                            >Forgot password?</a
                            >
                        </div>
                    </div>

                    <div>
                        <button
                            class="flex w-full gap-x-2 justify-center rounded-md bg-custom-bg-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                            type="submit"
                            @click="signIn()"
                        >
                            <div v-if="isLoading" class="spinner"></div>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <a
                    class="font-semibold leading-6 text-custom-bg-500 hover:text-custom-bg-600"
                    href="/signup"
                >Create your account now</a
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
