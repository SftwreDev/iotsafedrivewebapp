<template>
    <div id="map">
        <!--In the following div the HERE Map will render-->
        <div id="mapContainer" ref="hereMap" style="height:600px;width:100%"></div>
    </div>
</template>

<script>
var apikey = 'ryfRP-zH_4McbF3ercr7YEHv2J7NQYObmSyozW7-1YA'
export default {
    name: 'HereMap',
    props: {
        center: Object
        // center object { lat: 40.730610, lng: -73.935242 }
    },
    data() {
        return {
            platform: null,
            apikey: apikey
            // You can get the API KEY from developer.here.com
        }
    },
    async mounted() {
        // Initialize the platform object:
        const platform = new window.H.service.Platform({
            apikey: this.apikey
        })
        this.platform = platform
        this.initializeHereMap()
    },
    methods: {
        initializeHereMap() { // rendering map

            const mapContainer = this.$refs.hereMap
            const H = window.H
            // Obtain the default map types from the platform object
            var maptypes = this.platform.createDefaultLayers()

            // Instantiate (and display) a map object:
            var map = new H.Map(mapContainer, maptypes.vector.normal.map, {
                zoom: 10,
                center: this.center
            })

            addEventListener('resize', () => map.getViewPort().resize())

            // add behavior control
            new H.mapevents.Behavior(new H.mapevents.MapEvents(map))

            // add UI
            H.ui.UI.createDefault(map, maptypes)
            // End rendering the initial map

            var accidentLocation = new H.map.Marker(this.center)
            map.addObject(accidentLocation)
        }
    }
}
</script>

<style scoped>
#map {

    text-align: center;
    background-color: #ccc;
}
</style>