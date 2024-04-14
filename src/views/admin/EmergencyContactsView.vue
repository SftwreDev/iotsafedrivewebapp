<script setup>
import { storeToRefs } from 'pinia'
import { useAllTrustedContactsStore } from '@/stores/trusted_contacts.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'

const { trusted_contacts, loading } = storeToRefs(useAllTrustedContactsStore())
const { fetchAllTrustedContacts } = useAllTrustedContactsStore()

const columns = [
    { field: 'owner', title: 'OWNER' },
    { field: 'name', title: 'NAME' },
    { field: 'address', title: 'ADDRESS' },
    { field: 'contact', title: 'CONTACT' }
]

fetchAllTrustedContacts()
</script>

<template>
    <div v-if="!loading">
        <CustomDataTable
            :cols="columns"
            :isLoading="loading"
            :rows="trusted_contacts"
            title="User's Emergency Contacts"
        />
    </div>
</template>

<style scoped>

</style>