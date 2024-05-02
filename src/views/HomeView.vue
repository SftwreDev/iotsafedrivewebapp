<script setup>
import HomePage from '@/components/HomePage.vue'
import Onboarding from '@/components/onboarding/Onboarding.vue'

import { storeToRefs } from 'pinia'
import { useUserProfileStore } from '../stores/user'
import { useRescuerStore } from '../stores/rescuer'
import { useTrustedContactsStore } from '../stores/trusted_contacts'

const { userProfile, loading } = storeToRefs(useUserProfileStore())
const { fetchUserProfile } = useUserProfileStore()
const { rescuers } = storeToRefs(useRescuerStore())
const { fetchRescuers } = useRescuerStore()
const { trusted_contacts } = storeToRefs(useTrustedContactsStore())
const { fetchTrustedContacts } = useTrustedContactsStore()
const is_onboarding_done = localStorage.getItem('is_onboarding_done') === 'true'
const role = localStorage.getItem('role')

fetchUserProfile()
fetchRescuers()
fetchTrustedContacts()


if (role === 'super_admin' || role === 'rescuer') {
    window.location.href = '/dashboard'
}

</script>

<template>
    <main>
        <div v-if="role === 'user'">
            <div v-if="is_onboarding_done">
                <HomePage
                    v-if="!loading"
                    :rescuers="rescuers"
                    :trusted_contacts="trusted_contacts"
                    :userProfile="userProfile"
                />
            </div>
            <div v-if="!is_onboarding_done">
                <Onboarding :userProfile="userProfile" />
            </div>
        </div>
        <div v-if="role === 'super_admin' || role === 'rescuer'">

        </div>
    </main>
</template>
