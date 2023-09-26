<template>
    <section>
        <div id="saMap" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in saStores" :key="store.name" class="store-item">
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