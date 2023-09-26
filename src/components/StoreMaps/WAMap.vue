<template>
    <section>
        <div id="waMap" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in waStores" :key="store.name" class="store-item">
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