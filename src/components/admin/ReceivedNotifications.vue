<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
</script>

<template>
    <TabGroup>
        <TabList>
            <Tab>Accepted</Tab>
            <Tab>Rejected</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>Content 1</TabPanel>
            <TabPanel>Content 2</TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<style scoped>

</style>