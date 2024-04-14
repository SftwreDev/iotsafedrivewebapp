<script setup>
import { storeToRefs } from 'pinia'
import { useAllUserStore } from '@/stores/user.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'

const { users, loading } = storeToRefs(useAllUserStore())
const { fetchAllUsers } = useAllUserStore()

const columns = [
    { field: 'first_name', title: 'FIRST NAME' },
    { field: 'last_name', title: 'LAST NAME' },
    { field: 'email', title: 'EMAIL ADDRESS' },
    { field: 'address', title: 'ADDRESS' },
    { field: 'contact', title: 'CONTACT' },
    { field: 'device_id', title: 'DEVICE ID' },
    { field: 'date_joined', title: 'DATE JOINED' }
]

fetchAllUsers()
</script>

<template>
    <div v-if="!loading">
        <CustomDataTable :cols="columns" :isLoading="loading" :rows="users" title="Registered Users" />
    </div>
</template>

<style scoped>

</style>