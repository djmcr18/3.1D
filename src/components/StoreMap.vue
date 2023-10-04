<template>
    <section>
        <div :id="mapId" style="width: 100%; height: 400px;"></div>
        <ul class="store-list">
            <li v-for="store in stores" :key="store.name" class="store-item">
                <strong class="store-name">{{ store.name }}</strong>
                <p class="store-description">{{ store.description }}</p>
            </li>
        </ul>
    </section>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import storeLocations from '/public/storeLocations.json';

const { region } = defineProps({
    region: {
        type: String,
        required: true
    }
});

const mapId = ref(region + "Map");
const stores = storeLocations[region];

onMounted(() => {
    initMap();
});

const initMap = () => {
    let map = new google.maps.Map(document.getElementById(mapId.value), {
        zoom: 8
    });

    let bounds = new google.maps.LatLngBounds();

    stores.forEach(store => {
        let marker = new google.maps.Marker({
            position: { lat: store.lat, lng: store.lng },
            map: map,
            title: store.name
        });
        bounds.extend(marker.getPosition());
    });

    map.fitBounds(bounds);
};
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