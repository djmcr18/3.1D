<template>
    <div class="conveyor">
      <div class="conveyor-belt">
        <!-- Using two v-for loops to duplicate the images for a continuous effect -->
        <img v-for="img in images" :key="img" :src="img" alt="Banner Image" class="conveyor-image" />
        <img v-for="img in images" :key="'second' + img" :src="img" alt="Banner Image" class="conveyor-image" />
      </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        images: [
          'img/MoreliaNeo3.jpeg',
          'img/Jguard.jpeg',
          'img/ChampionsLeagueBall.jpeg',
          'img/AmoSockTape.png',
          'img/trusox.png',
          'img/FoamRoller.png',
          'img/SelectNeckWarmer.png',
          'img/GatoradeBottle.png',
        ],
      };
    },
};
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
}

@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-2380px);
    }
}

</style>