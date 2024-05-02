<script setup>

import Analytics from '@/components/admin/Analytics.vue'
</script>

<template>
    <header class="bg-white shadow lg:static lg:overflow-y-visible mb-10 py-5 border-b border-gray-300">
        <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                    <div class="flex flex-shrink-0 items-center">
                        <p class="text-xl font-medium text-gray-800 ">
                            Analytics
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

    <div>
        <Analytics />
    </div>
</template>

<style scoped>

</style>