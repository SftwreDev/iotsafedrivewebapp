<script setup>
import DetailAccidentAlert from '@/components/admin/DetailAccidentAlert.vue'
import { storeToRefs } from 'pinia'
import { useDetailedActivityHistoriesStore } from '@/stores/history.js'
import { useRoute } from 'vue-router'
import { useRescuerStore } from '@/stores/rescuer.js'
import { onMounted } from 'vue'

const route = useRoute()

const { histories, loading, center } = storeToRefs(useDetailedActivityHistoriesStore())
const { fetchDetailedActivityHistories } = useDetailedActivityHistoriesStore()

const { rescuers } = storeToRefs(useRescuerStore())
const { fetchRescuers } = useRescuerStore()

const id = route.params.id

onMounted(async () => {
    await fetchDetailedActivityHistories(id)
    await fetchRescuers()
})
</script>

<template>
    <DetailAccidentAlert
        :id="id"
        :center="center"
        :histories="histories"
        :loading="loading"
        :rescuers="rescuers"
    />
</template>

<style scoped></style>
