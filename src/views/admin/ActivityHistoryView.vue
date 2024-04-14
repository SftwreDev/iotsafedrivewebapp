<script setup>
import { storeToRefs } from 'pinia'
import { useAllActivityHistoriesStore } from '@/stores/history.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import CustomDataTableActions from '@/components/tables/CustomDataTableActions.vue'

const { histories, loading } = storeToRefs(useAllActivityHistoriesStore())
const { fetchAllActivityHistories } = useAllActivityHistoriesStore()

const columns = [
    { field: 'time_stamps', title: 'TIME STAMPS' },
    { field: 'owner', title: 'USER' },
    { field: 'location', title: 'LOCATION' },
    { field: 'latitude', title: 'LATITUDE' },
    { field: 'longitude', title: 'LONGITUDE' },
    { field: 'status_report', title: 'STATUS REPORT' },
    { field: 'status', title: 'STATUS' },
    { field: 'actions', title: 'ACTIONS' }
]

fetchAllActivityHistories()


</script>

<template>
    <div v-if="!loading">
        <CustomDataTableActions :cols="columns" :isLoading="loading" :rows="histories" title="Activity Histories" />
    </div>
</template>

<style scoped>

</style>