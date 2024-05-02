<script setup>


</script>
<script>


export default {

    props: ['total_responded_accident', 'total_activity', 'total_sms_sent', 'total_false_alarm', 'total_sms_not_sent'],
    data() {
        return {
            stats: [
                { name: 'Total Activity', value: this.total_activity },
                { name: 'Total SMS Sent', value: this.total_sms_sent },
                { name: 'Total SMS Not Sent', value: this.total_sms_not_sent },
                {
                    name: 'Total False Alarm',
                    value: this.total_false_alarm
                },
                {
                    name: 'Total Responded Accident',
                    value: this.total_responded_accident
                }
            ]
        }
    },
    computed: {},
    methods: {}
}
</script>

<template>
    <dl class="grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-5 shadow">
        <div v-for="stat in stats" :key="stat.name"
             class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8">
            <dt class="text-base font-medium leading-6 text-gray-500">{{ stat.name }}</dt>

            <dd class="mt-2 w-full flex-none text-4xl font-medium leading-10 tracking-tight text-custom-bg-500">
                {{ stat.value
                }}
            </dd>
        </div>
    </dl>
</template>

<style scoped>

</style>