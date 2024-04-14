<script>
import { apiVerifyAccessToken } from '@/api'
import router from '@/router/index.js'

export default {
    // Properties returned from data() become reactive state
    // and will be exposed on `this`.
    data() {
        return {
            isAuthenticated: false,
            isLoading: false,
            isStaff: '',
            isSuperUser: ''
        }
    },

    // Methods are functions that mutate state and trigger updates.
    // They can be bound as event handlers in templates.
    methods: {
        async getToken() {
            const access_token = localStorage.getItem('access_token')
            this.isStaff = localStorage.getItem('is_staff')
            this.isSuperUser = localStorage.getItem('is_superuser')
            const verifyAccessToken = await apiVerifyAccessToken(access_token)

            if (verifyAccessToken['status_code'] === 200) {
                this.isAuthenticated = true
            } else {
                this.isAuthenticated = false
                router.push('/')
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
    }
}
</script>
<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import Layout from './components/Layout.vue'
import LoadingSpinner from './components/utils/LoadingSpinner.vue'
</script>

<template>

    <LoadingSpinner :isLoading="isLoading" />
    <Layout v-if="isAuthenticated">
        <RouterView />
    </Layout>
    <RouterView v-else />
</template>

<style scoped></style>
