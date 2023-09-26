<template>
    <section>
        <div id="qldMap" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in qldStores" :key="store.name" class="store-item">
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
            qldStores: [
                { name: 'Brisbane CBD', lat: -27.4698, lng: 153.0251, description: 'Our primary store in Brisbane.' },
                { name: 'Gold Coast', lat: -28.0167, lng: 153.4000, description: 'Located near the beautiful beaches.' },
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