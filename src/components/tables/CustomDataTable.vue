<script lang="ts" setup>
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
</script>

<script lang="ts">
export default {
    props: ['rows', 'cols', 'isLoading', 'title'],
    computed: {
        headings() {
            // Extracting keys from the first object in data array to use as table headings
            if (this.data.length > 0) {
                return Object.keys(this.data[0]).map(key => ({ key, label: this.capitalize(key) }))
            }
            return []
        }
    },
    methods: {
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
}
</script>

<template>
    <div class="mx-10 max-w-9xl my-20 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div class="flex items-center justify-between mb-5">
            <h2 class="text-3xl">{{ title }}</h2>
        </div>

        <vue3-datatable
            :columnFilter="true"
            :columns="cols"
            :loading="isLoading"
            :pageSize="10"
            :pageSizeOptions="[10, 15, 30, 50]"
            :rows="rows"
            :sortable="true"
        />
    </div>
</template>

<style>
.bh-datatable .bh-table-responsive {
    @apply min-h-[380px];
}
</style>