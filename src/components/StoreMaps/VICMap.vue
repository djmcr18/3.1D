<template>
    <section>
        <div id="vicMap" style="width: 100%; height: 400px;"></div>
        <ul>
            <li v-for="store in vicStores" :key="store.name">
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
            vicStores: [
                { name: 'Melbourne CBD', lat: -37.814, lng: 144.96332, description: 'Our flagship store in Melbourne.' },
                { name: 'Geelong', lat: -38.14711, lng: 144.36069, description: 'Located in the heart of Geelong.' },
                { name: 'Ballarat', lat: -37.5622, lng: 143.8503, description: 'Discover our store in the historic city of Ballarat.' },
                { name: 'Dandenong', lat: -37.9876, lng: 145.2140, description: 'Explore our store in the vibrant heart of Dandenong.' },
            ]
        };
    },
    mounted() {
        this.initVICMap();
    },
    methods: {
        initVICMap() {
            let vicMap = new google.maps.Map(document.getElementById('vicMap'), {
                zoom: 8
            });

            let bounds = new google.maps.LatLngBounds();
            
            this.vicStores.forEach(store => {
                let marker = new google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: vicMap,
                    title: store.name
                });
                bounds.extend(marker.getPosition());
            });
            
            vicMap.fitBounds(bounds);
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
