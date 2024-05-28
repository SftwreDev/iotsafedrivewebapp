<script setup>
import { storeToRefs } from 'pinia'
import { useAllVehicleStore } from '@/stores/vehicle.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import { onMounted } from 'vue'
import CustomSyncfusionTable from '@/components/tables/CustomSyncfusionTable.vue'

const { vehicle, loading } = storeToRefs(useAllVehicleStore())
const { fetchAllVehicle } = useAllVehicleStore()

const columns = [
    { field: 'owner', headerText: 'OWNER' },
    { field: 'brand', headerText: 'BRAND' },
    { field: 'model', headerText: 'MODEL' },
    { field: 'year_model', headerText: 'YEAR MODEL' },
    { field: 'plate_no', headerText: 'PLATE #' }
]
// onMounted(async () => {
//     await fetchAllVehicle()
// })
fetchAllVehicle()
</script>

<template>
    <div v-if="!loading">
        <CustomSyncfusionTable
            :cols="columns"
            :data="vehicle"
            :isLoading="loading"
            title="User's Registered Vehicles"
        />
    </div>
</template>

<style scoped></style>
