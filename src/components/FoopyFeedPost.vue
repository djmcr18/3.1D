<template>
    <div class="news-item">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <audio v-if="post.type === 'audio'" controls :src="post.source"></audio>
        <img v-if="post.type === 'text'" :src="post.source" alt="Image post" />
        <video v-if="post.type === 'video'" controls :src="post.source"></video>
        <div v-if="post.type === 'youtube'" class="youtube-container">
            <iframe width="560" height="315" :src="post.source" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    </div>
</template>


<script setup>
import { ref, defineProps } from 'vue';

// Define the props
const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.news-item h2 {
    text-align: center;
}
</style>