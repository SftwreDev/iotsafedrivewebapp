<script setup>
import {
    GridComponent as EjsGrid,
    ColumnsDirective as EColumns,
    ColumnDirective as EColumn
} from '@syncfusion/ej2-vue-grids'

const headerStyle = {
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#fff'
}
</script>

<script>
import {
    ColumnChooser,
    ExcelExport,
    Filter,
    Page,
    PdfExport,
    Sort,
    Toolbar
} from '@syncfusion/ej2-vue-grids'

export default {
    props: ['data', 'cols', 'isLoading', 'title', 'componentToRender'],
    name: 'App',
    components: {},
    data() {
        return {
            filterOptions: {
                type: 'Menu'
            },
            pageSettings: { pageSize: 10 },
            filterSettings: { type: 'Excel', enableInfiniteScrolling: true },
            toolbarOptions: ['Search', 'Print', 'PdfExport', 'ExcelExport', 'ColumnChooser'],

            date: new Date().toLocaleString()
        }
    },
    methods: {
        toolbarClick(args) {
            if (args.item.text === 'PDF Export') {
                let pdfExportProperties = {
                    exportType: 'CurrentPage',
                    fileName: `${this.title.toLowerCase()}-report-${this.date}.pdf`
                }
                this.$refs.grid.pdfExport(pdfExportProperties)
            } else if (args.item.text === 'Excel Export') {
                let excelExportProperties = {
                    fileName: `${this.title.toLowerCase()}-report-${this.date}.xlsx`
                }
                this.$refs.grid.excelExport(excelExportProperties)
            }
        }
    },
    provide: {
        grid: [Sort, Filter, Page, Toolbar, PdfExport, ExcelExport, ColumnChooser]
    }
}
</script>

<template>
    <a-layout class="shadow border border-gray-200">
        <a-layout-header :style="headerStyle">
            <div class="flex sm:flex sm:items-center sm:justify-between">
                <p class="text-gray-900 text-lg font-medium my-5 tracking-wider">{{ title }}</p>
                <component :is="componentToRender" class="sm:ml-4 sm:mt-0" />
            </div>
        </a-layout-header>
        <a-layout-content class="bg-white">
            <ejs-grid
                ref="grid"
                :allowExcelExport="true"
                :allowFiltering="true"
                :allowPaging="true"
                :allowPdfExport="true"
                :allowSorting="true"
                :dataSource="data"
                :filterSettings="filterSettings"
                :pageSettings="pageSettings"
                :showColumnChooser="true"
                :toolbar="toolbarOptions"
                :toolbarClick="toolbarClick"
                class="px-8"
                height="350px"
            >
                <e-columns>
                    <e-column
                        v-for="(field, idx) in cols"
                        :key="idx"
                        :field="field.field"
                        :headerText="field.headerText"
                        textAlign="right"
                        width="100"
                    ></e-column>
                </e-columns>
            </ejs-grid>
        </a-layout-content>
    </a-layout>
</template>

<style scoped></style>
