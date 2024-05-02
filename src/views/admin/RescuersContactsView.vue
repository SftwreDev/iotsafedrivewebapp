<script setup>

import { storeToRefs } from 'pinia'
import { useRescuerStore } from '@/stores/rescuer.js'
import CustomDataTable from '@/components/tables/CustomDataTable.vue'
import AddRescuer from '@/components/admin/AddRescuer.vue'

const { rescuers, loading } = storeToRefs(useRescuerStore())
const { fetchRescuers } = useRescuerStore()

const columns = [
    { field: 'name', title: 'NAME' },
    { field: 'address', title: 'ADDRESS' },
    { field: 'contact', title: 'CONTACT' }
]

fetchRescuers()


</script>

<template>
    <div v-if="!loading">
        <CustomDataTable :cols="columns" :isLoading="loading" :rows="rescuers"
                         title="Rescuers Contacts" />
    </div>


</template>

<style scoped>

</style>