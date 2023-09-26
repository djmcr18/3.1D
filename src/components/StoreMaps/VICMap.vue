<template>
    <section>
        <div id="vicMap" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in vicStores" :key="store.name" class="store-item">
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