<template>
  <div class="content-container">
    <div class="intro-section">
      <h1>Foopy News Feed</h1><br><br>
      <h3>Stay updated with the latest football news and updates.</h3>
    </div>
    
    <!-- Posts -->
    <VideoPost />
    <AudioPost />
    <MaradonaPost />
    <YoutubePost />

    <!-- ... Add more posts as needed -->

  </div>
</template>

<script>
import VideoPost from '@/components/NewsFeedPosts/VideoPost.vue';
import AudioPost from '@/components/NewsFeedPosts/AudioPost.vue';
import YoutubePost from '@/components/NewsFeedPosts/YoutubePost.vue';
import MaradonaPost from '../components/NewsFeedPosts/MaradonaPost.vue';

export default {
  components: {
    VideoPost,
    AudioPost,
    YoutubePost,
    MaradonaPost
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
    display: flex; /* Add this line */
    flex-direction: column; /* Add this line */
    align-items: center; /* Add this line */
}

.intro-section {
    text-align: center;
    padding: 20px;
    margin-bottom: -10px;
    border-bottom: 1px solid var(--color-border);
    width: 100%; /* Ensure the intro section takes full width */
}

.news-item {
    margin: 40px 0;
    padding: 20px;
    background-color: var(--color-background);
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    width: 90%; /* Set a fixed width, can adjust this value as per requirement */
}

.news-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

</style>