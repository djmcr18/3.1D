<template>
    <div class="news-item">
        <h2>🌟 Reflecting on the Magic of Maradona 🌟</h2>
        <p>Diego Maradona - a name synonymous with footballing genius. From the slums of Buenos Aires to the world's grandest stages, Maradona showcased a masterclass of skill, vision, and passion. A player who wore his heart on his sleeve, his footballing prowess left fans and foes alike in awe. His legacy remains unparalleled.</p>
        <div class="image-container">
            <img src="/img/MaradonaPost.jpeg" alt="Diego Maradona in action" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImagePost'
}
</script>

<style scoped>
.image-container {
    margin-top: 20px;
    text-align: center;
}

.image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
