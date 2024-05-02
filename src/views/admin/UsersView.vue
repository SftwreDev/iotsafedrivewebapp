<script setup>
import { storeToRefs } from 'pinia'
import { useAllUserStore } from '@/stores/user.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import AddNewAccounts from '@/components/admin/AddNewAccounts.vue'

const { users, loading } = storeToRefs(useAllUserStore())
const { fetchAllUsers } = useAllUserStore()

const columns = [
    { field: 'first_name', title: 'FIRST NAME' },
    { field: 'last_name', title: 'LAST NAME' },
    { field: 'email', title: 'EMAIL ADDRESS' },
    { field: 'address', title: 'ADDRESS' },
    { field: 'contact', title: 'CONTACT' },
    { field: 'device_id', title: 'DEVICE ID' },
    { field: 'role', title: 'ROLE' },
    { field: 'date_joined', title: 'DATE JOINED' }
]

fetchAllUsers()
</script>

<template>
    <div v-if="!loading">
        <CustomDataTable :cols="columns" :componentToRender="AddNewAccounts" :isLoading="loading" :rows="users"
                         title="User accounts" />

    </div>
</template>

<style scoped>

</style>