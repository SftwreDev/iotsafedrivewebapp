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
const is_staff = localStorage.getItem('is_staff') === 'true'
const is_superuser = localStorage.getItem('is_superuser') === 'true'

fetchUserProfile()
fetchRescuers()
fetchTrustedContacts()
</script>

<template>
    <main>
        <div v-if="is_staff">
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
        <div v-if="is_superuser">

        </div>
    </main>
</template>
