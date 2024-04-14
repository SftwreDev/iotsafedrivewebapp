<script setup>
import Settings from '@/components/settings/Settings.vue'
import { storeToRefs } from 'pinia'
import { useUserProfileStore } from '@/stores/user.js'
import { useVehicleStore } from '@/stores/vehicle.js'
import { useTrustedContactsStore } from '@/stores/trusted_contacts.js'

const { userProfile } = storeToRefs(useUserProfileStore())
const { fetchUserProfile } = useUserProfileStore()
const { vehicle } = storeToRefs(useVehicleStore())
const { fetchVehicle } = useVehicleStore()
const { trusted_contacts } = storeToRefs(useTrustedContactsStore())
const { fetchTrustedContacts } = useTrustedContactsStore()


fetchUserProfile()
fetchVehicle()
fetchTrustedContacts()
</script>

<template>
    <Settings :trusted_contacts="trusted_contacts" :userProfile="userProfile" :vehicle="vehicle" />
</template>

<style scoped>

</style>