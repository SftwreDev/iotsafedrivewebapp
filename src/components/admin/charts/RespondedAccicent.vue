<script>
// Import ApexCharts class
import VueApexCharts from 'vue-apexcharts'

export default {
    // Register apexchart component
    components: {
        apexcharts: VueApexCharts
    },
    props: ['rescuedAccidentTimestamps', 'totalRescuedAccident'],
    data() {
        return {
            label: '',
            series: [{
                name: 'Rescued Accident',
                data: this.totalRescuedAccident
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'bar'

                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top' // top, center, bottom
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function(val) {
                        return val
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ['#304758']
                    }
                },

                xaxis: {
                    categories: this.rescuedAccidentTimestamps,
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: true
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5
                            }
                        }
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        show: false,
                        formatter: function(val) {
                            return val
                        }
                    }

                },
                title: {
                    text: `Total number of rescued accident`,
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#444'
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
        <apexchart :options="chartOptions" :series="series" height="350" type="bar"></apexchart>
    </div>
</template>

<style scoped>

</style>