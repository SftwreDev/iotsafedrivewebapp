<script>
// Import ApexCharts class
import VueApexCharts from 'vue-apexcharts'

export default {
    // Register apexchart component
    components: {
        apexcharts: VueApexCharts
    },
    props: ['closed_percentage', 'on_going_percentage', 'pending_percentage'],
    data() {
        return {
            series: [this.pending_percentage, this.on_going_percentage, this.closed_percentage],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'pie'
                },
                labels: ['Pending', 'On-Going', 'Closed'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
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
        <apexchart :options="chartOptions" :series="series" height="350" type="pie"></apexchart>
    </div>
</template>

<style scoped>

</style>