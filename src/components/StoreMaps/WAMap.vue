<template>
    <section>
        <div id="waMap" style="width: 100%; height: 400px;"></div>
        <ul>
            <li v-for="store in waStores" :key="store.name">
                <strong>{{ store.name }}</strong>
                <p>{{ store.description }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            waStores: [
                { name: 'Perth CBD', lat: -31.9505, lng: 115.8605, description: 'Our flagship store in Perth.' },
                { name: 'Broome', lat: -17.9614, lng: 122.2359, description: 'A tropical experience at our Broome branch.' },
                { name: 'Fremantle', lat: -32.0569, lng: 115.7439, description: 'Enjoy the sea breeze at our Fremantle branch.' },
            ]
        };
    },
    mounted() {
        this.initWAMap();
    },
    methods: {
        initWAMap() {
            let waMap = new google.maps.Map(document.getElementById('waMap'), {
                zoom: 8
            });

            let bounds = new google.maps.LatLngBounds();
            
            this.waStores.forEach(store => {
                let marker = new google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: waMap,
                    title: store.name
                });
                bounds.extend(marker.getPosition());
            });
            
            waMap.fitBounds(bounds);
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
