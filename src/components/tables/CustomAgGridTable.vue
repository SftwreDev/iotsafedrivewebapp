<script>
import 'ag-grid-enterprise'
import { AgGridVue } from 'ag-grid-vue3' // AG Grid Component
import { LicenseManager } from 'ag-grid-enterprise'

LicenseManager.setLicenseKey(
    'For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-24_March_2022_[v2]_MTY0ODA4MDAwMDAwMA==4fdbe0ea0253c80baac39c002db1f00f'
)

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
            paginationPageSizeSelector: [50, 100, 200, 500],

            defaultColDef: {
                flex: 1,
                minWidth: 100,
                // allow every column to be aggregated
                enableValue: true,
                // allow every column to be grouped
                enableRowGroup: true,
                // allow every column to be pivoted
                enablePivot: true,
                filter: true
            }
        }
    }
}
</script>

<template>
    <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
        <ag-grid-vue
            :columnDefs="cols"
            :defaultColDef="defaultColDef"
            :pagination="pagination"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :rowData="rows"
            class="ag-theme-custom"
            style="height: 90vh; width: 100%"
        >
        </ag-grid-vue>
    </div>
</template>

<style scoped></style>
