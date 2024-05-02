<script>
// Import ApexCharts class
import VueApexCharts from 'vue-apexcharts'

export default {
    // Register apexchart component
    components: {
        apexcharts: VueApexCharts
    },
    props: ['rescuers', 'id'],
    data() {
        return {
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41]
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
                    categories: ['2018-09-19T00:00:00.000Z', '2018-09-19T01:30:00.000Z', '2018-09-19T02:30:00.000Z', '2018-09-19T03:30:00.000Z', '2018-09-19T04:30:00.000Z', '2018-09-19T05:30:00.000Z', '2018-09-19T06:30:00.000Z']
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
    <div id="chart">
        <!-- Use apexchart component -->
        <apexchart :options="chartOptions" :series="series" height="350" type="area"></apexchart>
    </div>
</template>

<style scoped>

</style>