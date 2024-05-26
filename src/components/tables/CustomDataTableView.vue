<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
</script>
<script lang="ts">
export default {
    props: ['columns', 'data', 'isLoading', 'title', 'componentToRender'],

    data() {
        return {
            params: {
                current_page: 1,
                pagesize: 10,
                sort_column: 'id',
                sort_direction: 'asc',
                search: ''
            }
        }
    },
    methods: {}
}
</script>
<template>
    <DataTable :value="data" tableStyle="min-width: 100%">
        <Column
            v-for="(field, idx) in columns"
            :key="idx"
            :field="field.field"
            :header="field.header"
        ></Column>
    </DataTable>
</template>

<style scoped></style>
