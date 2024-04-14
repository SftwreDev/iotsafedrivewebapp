<script setup>
import { storeToRefs } from 'pinia'
import { useAllVehicleStore } from '@/stores/vehicle.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'

const { vehicle, loading } = storeToRefs(useAllVehicleStore())
const { fetchAllVehicle } = useAllVehicleStore()

const columns = [
    { field: 'owner', title: 'OWNER' },
    { field: 'brand', title: 'BRAND' },
    { field: 'model', title: 'MODEL' },
    { field: 'year_model', title: 'YEAR MODEL' },
    { field: 'plate_no', title: 'PLATE #' }
]

fetchAllVehicle()
</script>

<template>
    <div v-if="!loading">
        <CustomDataTable :cols="columns" :isLoading="loading" :rows="vehicle" title="Registered Vehicles" />
    </div>
</template>

<style scoped>

</style>