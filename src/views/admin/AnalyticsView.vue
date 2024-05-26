<script setup>
import Analytics from '@/components/admin/Analytics.vue'

const headerStyle = {
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#fff'
}
</script>

<template>
    <a-layout class="shadow border border-gray-200">
        <a-layout-header :style="headerStyle">
            <p class="text-gray-900 text-lg font-medium my-5 tracking-wider">Analytics</p>
        </a-layout-header>
        <a-layout-content>
            <Analytics />
        </a-layout-content>
    </a-layout>
</template>

<style scoped></style>
