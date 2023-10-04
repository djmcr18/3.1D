<template>
  <div id="app">
    <TopBar />
    
    <div id="page-content">
      <!-- Router View -->
          <router-view></router-view>
    </div>

    <!-- Footer -->
    <Footer />
  </div>

  <div id="modal-target"></div>
</template>

<script setup>
import TopBar from './components/TopBar.vue';
import Footer from './components/Footer.vue';
</script>


<style>

#page-content {
    flex: 1 0 auto; /* this allows the content div to expand and push the footer down */
}

#app {
    display: flex;
    flex-direction: column;
    height: 106.3%;
}
</style>
