<template>
  <transition name="fade" appear>
    <div class="conveyor">
      <div class="conveyor-belt">
        <!-- Using two v-for loops to duplicate the images for a continuous effect -->
        <img v-for="img in images" :key="img" :src="img" alt="Banner Image" class="conveyor-image" />
        <img v-for="img in images" :key="'second' + img" :src="img" alt="Banner Image" class="conveyor-image" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

// Data
const images = ref([
  'img/Jguard.jpeg',
  'img/AmoSockTape.png',
  'img/trusox.png',
  'img/FoamRoller.png',
  'img/SelectNeckWarmer.png',
  'img/GatoradeBottle.png',
]);
</script>

<style scoped>
.conveyor {
    overflow: hidden;
    height: 180px;
    margin-top: 30px;
    margin-bottom: 30px;
    position: relative;
}

.conveyor-belt {
    display: flex;
    /* Adjust the animation duration based on total width of one set of images for a smoother effect */
    animation: scroll 35s linear infinite;
}

.conveyor-image {
    flex-shrink: 0;
    width: 280px;
    height: 170px;
    object-fit: contain;
    margin-right: 20px;  /* Reduced gap between images */
    transition: transform 0.3s, filter 0.3s;
}

.conveyor-image:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
}

.conveyor-image:active {
    transform: scale(0.95);
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-2380px);
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}

</style>