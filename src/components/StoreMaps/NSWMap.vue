<template>
    <section>
        <div id="nswMap" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in nswStores" :key="store.name" class="store-item">
                <strong class="store-name">{{ store.name }}</strong>
                <p class="store-description">{{ store.description }}</p>
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
.store-list {
    padding-left: 0; /* Remove padding since we're removing bullet points. */
    list-style-type: none; /* Remove bullet points. */
    margin-top: 20px; /* Add margin to separate from the map. Adjust this value as needed. */
}

.store-item {
    margin-bottom: 15px; /* Spacing between list items. Adjust as needed. */
    padding: 10px; /* Padding inside the container. */
    background-color: rgba(0, 0, 0, 0.03); /* A faint background color for the container. Adjust the rgba values for desired opacity and color. */
    border-radius: 5px; /* Gives rounded edges to the container. Adjust or remove as per your preference. */
}

.store-name {
    margin-right: 10px; /* Spacing between the store name and its description. */
    font-weight: bold;
}

.store-description {
    color: var(--color-text);
    margin: 0; /* Remove default margin of <p> tag to align properly with the line. */
}
</style>