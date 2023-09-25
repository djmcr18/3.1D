<template>
    <section>
        <div id="saMap" style="width: 100%; height: 400px;"></div>
        <ul>
            <li v-for="store in saStores" :key="store.name">
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
            saStores: [
                { name: 'Smithfield', lat: -34.6904, lng: 138.6782, description: 'Experience Foopy at our Smithfield outlet in South Australia.' },
                { name: 'Adelaide CBD', lat: -34.9285, lng: 138.6007, description: 'Located at the center of Adelaide.' },
                { name: 'Port Adelaide', lat: -34.8447, lng: 138.5022, description: 'Our coastal store in Port Adelaide.' },
            ]
        };
    },
    mounted() {
        this.initSAMap();
    },
    methods: {
        initSAMap() {
            let saMap = new google.maps.Map(document.getElementById('saMap'), {
                zoom: 8
            });

            let bounds = new google.maps.LatLngBounds();
            
            this.saStores.forEach(store => {
                let marker = new google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: saMap,
                    title: store.name
                });
                bounds.extend(marker.getPosition());
            });
            
            saMap.fitBounds(bounds);
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
