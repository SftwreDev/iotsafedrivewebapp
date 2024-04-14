<script setup>
import { storeToRefs } from 'pinia'

import { usePendingActivityHistoriesStore } from '@/stores/history.js'
import CustomDataTableActions from '@/components/tables/CustomDataTableActions.vue'

const { histories, loading } = storeToRefs(usePendingActivityHistoriesStore())
const { fetchPendingActivityHistories } = usePendingActivityHistoriesStore()


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

fetchPendingActivityHistories()


</script>

<template>
    <div v-if="!loading">

        <CustomDataTableActions :cols="columns" :isLoading="loading"
                                :rows="histories"
                                title="Dashboard" />
    </div>
</template>

<style scoped>

</style>