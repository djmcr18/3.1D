<template>
  <div class="content-container">
      <div class="intro-section">
          <h1>Welcome to Foopy.</h1>
          <h3>The best football news updates, the best football community forums, and the best online football store.</h3>
          <p>The only site you'll ever need for foopy!</p>
      </div>

      <div class="map-grid">
          <div class="map-box">
              <h4 class="map-title">Victoria Locations</h4>
              <br>
              <VICMap />
          </div>
          <div class="map-box">
              <h4 class="map-title">NSW Locations</h4>
              <br>
              <NSWMap />
          </div>
          <div class="map-box">
              <h4 class="map-title">Queensland Locations</h4>
              <br>
              <QLDMap />
          </div>
          <div class="map-box">
              <h4 class="map-title">South Australia Locations</h4>
              <br>
              <SAMap />
          </div>
          <div class="map-box">
              <h4 class="map-title">Western Australia Locations</h4>
              <br>
              <WAMap />
          </div>
      </div>
  </div>
</template>
  
<script>
  import VICMap from '@/components/StoreMaps/VICMap.vue';
  import NSWMap from '@/components/StoreMaps/NSWMap.vue';
  import QLDMap from '@/components/StoreMaps/QLDMap.vue';
  import SAMap from '@/components/StoreMaps/SAMap.vue';
  import WAMap from '@/components/StoreMaps/WAMap.vue';
  
  export default {
      components: {
          VICMap,
          NSWMap,
          QLDMap,
          SAMap,
          WAMap
      }
  }
</script>

<style scoped>
.content-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: var(--color-background-soft);
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.intro-section {
    text-align: center;
    padding: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid var(--color-border);
}

.map-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin: 40px 0;
    padding: 20px;
}

.map-box {
    background-color: var(--color-background);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.map-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.map-title {
    font-size: 20px;
    margin-bottom: 10px;
    color: var(--color-heading);
    text-align: center;
}

.map-description {
    font-size: 15px;
    margin-bottom: 20px;
    color: var(--color-text);
    text-align: center;
}

</style>