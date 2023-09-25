<template>
    <section>
        <div id="qldMap" style="width: 100%; height: 400px;"></div>
        <ul>
            <li v-for="store in qldStores" :key="store.name">
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
            qldStores: [
                { name: 'Brisbane CBD', lat: -27.4698, lng: 153.0251, description: 'Our primary store in Brisbane.' },
                { name: 'Gold Coast', lat: -28.0167, lng: 153.4000, description: 'Located near the beautiful beaches.' },
                // ... [Add two more QLD locations here]
            ]
        };
    },
    mounted() {
        this.initQLDMap();
    },
    methods: {
        initQLDMap() {
            let qldMap = new google.maps.Map(document.getElementById('qldMap'), {
                zoom: 8
            });

            let bounds = new google.maps.LatLngBounds();
            
            this.qldStores.forEach(store => {
                let marker = new google.maps.Marker({
                    position: { lat: store.lat, lng: store.lng },
                    map: qldMap,
                    title: store.name
                });
                bounds.extend(marker.getPosition());
            });
            
            qldMap.fitBounds(bounds);
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
