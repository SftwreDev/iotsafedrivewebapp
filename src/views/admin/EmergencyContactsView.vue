<script setup>
import { storeToRefs } from 'pinia'
import { useAllTrustedContactsStore } from '@/stores/trusted_contacts.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import { onMounted } from 'vue'
import CustomSyncfusionTable from '@/components/tables/CustomSyncfusionTable.vue'

const { trusted_contacts, loading } = storeToRefs(useAllTrustedContactsStore())
const { fetchAllTrustedContacts } = useAllTrustedContactsStore()

const columns = [
    { field: 'owner', headerText: 'OWNER' },
    { field: 'name', headerText: 'NAME' },
    { field: 'address', headerText: 'ADDRESS' },
    { field: 'contact', headerText: 'CONTACT' }
]
onMounted(async () => {
    await fetchAllTrustedContacts()
})
</script>

<template>
    <div v-if="!loading">
        <CustomSyncfusionTable
            :cols="columns"
            :data="trusted_contacts"
            :isLoading="loading"
            title="User's Emergency Contacts"
        />
    </div>
</template>

<style scoped></style>
