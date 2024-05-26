<script setup>
import { storeToRefs } from 'pinia'
import { useRescuerStore } from '@/stores/rescuer.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import AddRescuer from '@/components/admin/AddRescuer.vue'
import { onMounted } from 'vue'
import CustomSyncfusionTable from '@/components/tables/CustomSyncfusionTable.vue'

const { rescuers, loading } = storeToRefs(useRescuerStore())
const { fetchRescuers } = useRescuerStore()

const columns = [
    { field: 'name', headerText: 'NAME' },
    { field: 'address', headerText: 'ADDRESS' },
    { field: 'contact', headerText: 'CONTACT' }
]

onMounted(async () => {
    await fetchRescuers()
})
</script>

<template>
    <div v-if="!loading">
        <CustomSyncfusionTable
            :cols="columns"
            :data="rescuers"
            :isLoading="loading"
            title="Rescuers Contacts"
        />
    </div>
</template>

<style scoped></style>
