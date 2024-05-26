<script setup>
import { storeToRefs } from 'pinia'
import { useAllActivityHistoriesStore } from '@/stores/history.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import CustomDataTableActions from '@/components/tables/CustomDataTableActions.vue'
import { onMounted } from 'vue'
import CustomSyncfusionTable from '@/components/tables/CustomSyncfusionTable.vue'

const { histories, loading } = storeToRefs(useAllActivityHistoriesStore())
const { fetchAllActivityHistories } = useAllActivityHistoriesStore()

const columns = [
    { field: 'time_stamps', headerText: 'TIME STAMPS' },
    { field: 'owner', headerText: 'USER' },
    { field: 'location', headerText: 'LOCATION' },
    { field: 'latitude', headerText: 'LATITUDE' },
    { field: 'longitude', headerText: 'LONGITUDE' },
    { field: 'status_report', headerText: 'STATUS REPORT' },
    { field: 'status', headerText: 'STATUS' },
    { field: 'actions', headerText: 'ACTIONS' }
]

onMounted(async () => {
    await fetchAllActivityHistories()
})
</script>

<template>
    <div v-if="!loading">
        <CustomSyncfusionTable
            :cols="columns"
            :data="histories"
            :isLoading="loading"
            title="Activity Histories"
        />
    </div>
</template>

<style scoped></style>
