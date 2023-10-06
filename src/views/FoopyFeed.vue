<template>
  <div class="content-container">
      <div class="intro-section">
          <h1>Foopy News Feed</h1>
          <h3>Stay updated with the latest football news and updates from our dedicated Foopy team.</h3>
      </div>
      
      <NewsFeedPost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NewsFeedPost from '../components/NewsFeedPost.vue';

// Components
const components = { NewsFeedPost };

// Data
let posts = ref([]);

// Lifecycle hooks
onMounted(async () => {
  try {
    const response = await fetch('/posts.json');
    posts.value = await response.json();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
});
</script>


<style scoped>
.content-container {
    display: flex; /* Add this line */
    flex-direction: column; /* Add this line */
    align-items: center; /* Add this line */
}

.intro-section {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 15px;
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

/* Responsive Styles */
@media (max-width: 768px) { /* Tablets and below */
.intro-section h1 {
    font-size: 24px; /* Slightly reduced for tablets */
}
.intro-section h3 {
    font-size: 16px; /* Further reduction for mobile */
}
}

@media (max-width: 500px) { /* Mobile devices */
.intro-section h1 {
    font-size: 22px; /* Further reduction for mobile */
}
.intro-section h3 {
    font-size: 15px; /* Further reduction for mobile */
}
}

</style>