<script>
import { apiVerifyAccessToken } from '@/api'

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            isAuthenticated: false,
            isLoading: false,
            isStaff: '',
            isSuperUser: '',
            role: localStorage.getItem('role')
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        async getToken() {
            const access_token = localStorage.getItem('access_token')
            this.isStaff = localStorage.getItem('is_staff')
            this.isSuperUser = localStorage.getItem('is_superuser')
            const resp = await apiVerifyAccessToken(access_token)

            if (resp['status_code'] === 200) {
                this.isAuthenticated = true
                const access_token = resp['data'][0]['access_token']
                const refresh_token = resp['data'][0]['refresh_token']
                const first_name = resp['data'][0]['first_name']
                const last_name = resp['data'][0]['last_name']
                const profile_picture = resp['data'][0]['profile_picture']
                const email_address = resp['data'][0]['email']
                const is_superuser = resp['data'][0]['is_superuser']
                const is_staff = resp['data'][0]['is_staff']
                const is_onboarding_done = resp['data'][0]['is_onboarding_done']
                const role = resp['data'][0]['role']

                // Add the token to localStorage
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token)
                localStorage.setItem('full_name', `${first_name} ${last_name}`)
                localStorage.setItem('email_address', email_address)
                localStorage.setItem('profile_picture', profile_picture)
                localStorage.setItem('is_superuser', is_superuser)
                localStorage.setItem('is_staff', is_staff)
                localStorage.setItem('is_onboarding_done', is_onboarding_done)
                localStorage.setItem('role', role)
            } else {
                this.isAuthenticated = false
                // router.push('/')
            }
        }
    },

    async mounted() {
        this.isLoading = true
        await this.getToken()
    },
    created() {
        // Simulate loading time (replace with your actual loading logic)
        setTimeout(() => {
            this.isLoading = false
        }, 500)

        const success = (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude

            localStorage.setItem('latitude', latitude)
            localStorage.setItem('longitude', longitude)

            console.log(latitude, longitude)
            // Do something with the position
        }

        const error = () => {
            console.log(error)
        }

        // This will open permission popup
        navigator.geolocation.getCurrentPosition(success, error)
    }
}
</script>
<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Layout from './components/Layout.vue'
import UserLayout from '@/components/UserLayout.vue'
import LoadingSpinner from './components/utils/LoadingSpinner.vue'
</script>

<template>
    <LoadingSpinner :isLoading="isLoading" />
    <div v-if="isAuthenticated">
        <div v-if="role === 'super_admin' || role === 'rescuer'">
            <Layout>
                <RouterView />
            </Layout>
        </div>
        <div v-if="role === 'user'">
            <UserLayout>
                <RouterView />
            </UserLayout>
        </div>
    </div>
    <RouterView v-else />
</template>

<style scoped></style>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-vue-grids/styles/tailwind.css';
</style>
