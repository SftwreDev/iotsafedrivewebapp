<script>

import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the grid
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3' // AG Grid Component

export default {
    props: ['rows', 'cols', 'isLoading', 'title'],
    name: 'App',
    components: {
        AgGridVue // Add AG Grid Vue3 component
    },
    data() {
        return {
            pagination: true,
            paginationPageSize: 50,
            paginationPageSizeSelector: [50, 100, 200, 500]

        }
    }
}
</script>

<template>
    <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
        <ag-grid-vue
            :columnDefs="cols"
            :pagination="pagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :rowData="rows"
            class="ag-theme-quartz"
            style="height: 90vh"
        >
        </ag-grid-vue>
    </div>
</template>

<style scoped>

</style>