<script>
// Import ApexCharts class
import VueApexCharts from 'vue-apexcharts'

export default {
    // Register apexchart component
    components: {
        apexcharts: VueApexCharts
    },
    props: ['smsVsFalseTimestamps', 'totalSmsSentData', 'totalFalseAlarmData', 'totalSmsNotSentData'],
    data() {
        return {
            series: [{
                name: 'SMS Sent',
                data: this.totalSmsSentData
            }, {
                name: 'False Alarm',
                data: this.totalFalseAlarmData
            }, {
                name: 'SMS Not Sent',
                data: this.totalSmsNotSentData
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories: this.smsVsFalseTimestamps
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    }
                }
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<template>
    <div id="chart" class="shadow">
        <!-- Use apexchart component -->
        <apexchart :options="chartOptions" :series="series" height="350" type="area"></apexchart>
    </div>
</template>

<style scoped>

</style>