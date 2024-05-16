<script lang="ts" setup>
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
</script>

<script lang="ts">

export default {
    props: ['rows', 'cols', 'isLoading', 'title', 'componentToRender'],
    computed: {
        headings() {
            // Extracting keys from the first object in data array to use as table headings
            if (this.data.length > 0) {
                return Object.keys(this.data[0]).map(key => ({ key, label: this.capitalize(key) }))
            }
            return []
        }
    },
    data() {
        return {
            params: {
                'current_page': 1,
                'pagesize': 10,
                'sort_column': 'id',
                'sort_direction': 'asc',
                'search': ''
            },

            user_id: '',
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            contact: '',
            device_id: '',
            role: ''
        }
    },
    methods: {
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        async saveAsPdf() {
            // Pass the element id here
            await this.$htmlToPaper('dataTable')
        },

        async updateAccount(data) {
            console.log(data)
        }
    }
}
</script>

<template>
    <header v-if="title"
            class="bg-white shadow lg:static lg:overflow-y-visible mb-10 py-5 border-b border-gray-300">
        <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div class="flex flex-shrink-0 items-center">
                        <p class="text-xl font-medium text-gray-800 ">
                            {{ title }}
                        </p>
                    </div>
                </div>
                <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">

                    </div>
                </div>
                <div class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">

                </div>
                <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

                    <component :is="componentToRender" />
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <nav aria-label="Global" class="lg:hidden">
            <div class="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
            </div>
            <div class="border-t border-gray-200 pb-3 pt-4">
            </div>
        </nav>
    </header>

    <div v-if="title" class="flex gap-x-5 mx-2">

        <button
            class="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button" @click="saveAsPdf">
            Export as PDF
        </button>

    </div>
    <div class="max-w-9xl mx-2 px-2 bg-white border border-gray-200 rounded-lg shadow-md mt-5">
        <div class="mb-5">
            <div class="relative mt-2 rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd"
                              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                              fill-rule="evenodd" />
                    </svg>

                </div>
                <input id="search"
                       v-model="params.search"
                       autocomplete="off"
                       class="block max-w-xs rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       name="search"
                       placeholder="Search ..."
                       type="text"
                >
            </div>
        </div>

        <vue3-datatable
            id="dataTable"
            :columns="cols"
            :loading="isLoading"
            :pageSize="10"
            :pageSizeOptions="[10, 15, 30, 50]"
            :rows="rows"
            :search="params.search"
            :sortColumn="params.sort_column"
            :sortDirection="params.sort_direction"
            :sortable="true"
        >
            <template #id="data">
                <strong>#{{ data.value.id }}</strong>
            </template>
            <template #actions="data">
                <div class="flex gap-4">
                    <button
                        class="rounded bg-custom-bg-500 px-5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-custom-bg-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-custom-bg-600"
                        type="button"
                        @click="updateAccount(data.value)"
                    >
                        Update
                    </button>
                </div>
            </template>
        </vue3-datatable>
    </div>

</template>

<style>
.bh-datatable .bh-table-responsive {
    @apply min-h-[380px];
    font-size: 12px;
}
</style>



