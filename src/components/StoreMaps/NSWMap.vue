<template>
    <section>
        <div id="nswMap" style="width: 100%; height: 400px;"></div>
        <ul>
            <li v-for="store in nswStores" :key="store.name">
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
            nswStores: [
            { name: 'Canberra', lat: -35.2809, lng: 149.1300, description: "Our flagship store in the nation's capital, Canberra." },
                { name: 'Sydney CBD', lat: -33.8688, lng: 151.2093, description: 'Our main store in Sydney.' },
                { name: 'Newcastle', lat: -32.9283, lng: 151.7817, description: 'Situated in the bustling city of Newcastle.' },
                { name: 'Parramatta', lat: -33.8132, lng: 151.0034, description: 'Located in the thriving city of Parramatta.' },
                { name: 'Wollongong', lat: -34.4278, lng: 150.8931, description: 'Visit us in the coastal city of Wollongong.' },
            ]
        };
    },
    mounted() {
        this.initNSWMap();
    },
    methods: {
        initNSWMap() {
            let nswMap = new google.maps.Map(document.getElementById('nswMap'), {
                center: {lat: -33.3983, lng: 151.4445}, // Updated to a point between Sydney and Newcastle
                zoom: 8
            });

            let bounds = new google.maps.LatLngBounds();
            
            this.nswStores.forEach(store => {
                let marker = new google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: nswMap,
                    title: store.name
                });
                bounds.extend(marker.getPosition()); // Extend the bounds to include each marker's position.
            });
            
            nswMap.fitBounds(bounds);  // Adjust map's zoom and center based on markers.
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
