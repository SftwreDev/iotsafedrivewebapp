<script setup>
import { storeToRefs } from 'pinia'
import { useAllUserStore } from '@/stores/user.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import AddNewAccounts from '@/components/admin/AddNewAccounts.vue'
import CustomDataTableActionsUsers from '@/components/tables/CustomDataTableActionsUsers.vue'
import { onMounted } from 'vue'
import CustomSyncfusionTable from '@/components/tables/CustomSyncfusionTable.vue'

const { users, loading } = storeToRefs(useAllUserStore())
const { fetchAllUsers } = useAllUserStore()

const columns = [
    { field: 'date_joined', headerText: 'DATE JOINED' },
    { field: 'first_name', headerText: 'FIRST NAME' },
    { field: 'last_name', headerText: 'LAST NAME' },
    { field: 'email', headerText: 'EMAIL ADDRESS' },
    { field: 'address', headerText: 'ADDRESS' },
    { field: 'contact', headerText: 'CONTACT' },
    { field: 'device_id', headerText: 'DEVICE ID' },
    { field: 'role', headerText: 'ROLE' }
    // { field: 'actions', title: 'ACTION' }
]
onMounted(async () => {
    await fetchAllUsers()
})
</script>

<template>
    <div v-if="!loading">
        <CustomSyncfusionTable
            :cols="columns"
            :componentToRender="AddNewAccounts"
            :data="users"
            :isLoading="loading"
            title="User accounts"
        />
    </div>
</template>

<style scoped></style>
