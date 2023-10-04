<template>
  <div class="content-container">
    <div class="intro-section">
      <h1>Foopy Forums</h1>
    </div>

    <!-- New Post Form -->
    <div class="new-post">
        <div @input="updateTitle($event)" contenteditable="true" :data-value="newPostTitle" placeholder="Title" class="post-title-input"></div>
        <div @input="updateContent($event)" contenteditable="true" :data-value="newPostContent" placeholder="What's on your mind?" class="post-input"></div>
        <button @click="submitPost" class="post-button">Post</button>
    </div>

    <div v-if="postStatus" class="post-status">{{ postStatus }}</div>

    <!-- List of Posts -->
    <div v-for="post in posts" :key="post.id" class="post-container">
      <div class="post-title">
        {{ post.title }} <small>by {{ post.username }}</small>
      </div>
      <div class="post-content">{{ post.content }}</div>
      <div v-if="auth.currentUser && auth.currentUser.uid === post.userId" class="post-actions">
          <button @click="editPost(post)">Edit</button>
          <button @click="deletePost(post.id)">Delete</button>
      </div>

      <div v-for="reply in post.replies" :key="reply.content" class="post-reply">
          <div class="reply-content-username-wrap">
              {{ reply.content }} <small>by {{ reply.username }}</small>
          </div>
          <div v-if="auth.currentUser && auth.currentUser.uid === reply.userId" class="reply-actions">
              <button @click="editReply(reply, post)">Edit</button>
              <button @click="deleteReply(reply, post)">Delete</button>
          </div>
      </div>

      <div class="action-buttons">
          <button @click="likePost(post.id)" class="like-button"><i class="fas fa-thumbs-up"></i> {{ post.likes }}</button>
          <div @input="updateReply($event, post)" contenteditable="true" :data-value="post.newReplyContent" :data-post-id="post.id" placeholder="Add a reply..." class="reply-input"></div>
          <button @click="submitReply(post)" class="reply-button">Reply</button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase.js';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
import { collection, getDocs, addDoc, doc, updateDoc, arrayUnion, increment, orderBy, query } from 'firebase/firestore';

const posts = ref([]);
const newPostContent = ref('');
const newPostTitle = ref(''); // A ref for the title of the new post.
const postStatus = ref('');

onMounted(async () => {
  const forumRef = collection(db, "forums");
  const forumQuery = query(forumRef, orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(forumQuery);
  posts.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const submitPost = async () => {
  if (newPostContent.value.trim() && newPostTitle.value.trim()) {
    const user = auth.currentUser;

    const post = {
      title: newPostTitle.value,
      content: newPostContent.value,
      likes: 0,
      replies: [],
      userId: user.uid,  // storing user's ID
      username: user.email ? user.email.split('@')[0] : "Anonymous",
      timestamp: new Date()
    };
    const docRef = await addDoc(collection(db, "forums"), post);
    posts.value.unshift({ id: docRef.id, ...post });
    postStatus.value = "Posted!";
    setTimeout(() => postStatus.value = '', 3000); 

    // Clear the contenteditable fields
    document.querySelector('.post-title-input').innerText = "";
    document.querySelector('.post-input').innerText = "";

    // Clear the model values
    newPostContent.value = "";
    newPostTitle.value = "";
  }
}

const likePost = async (postId) => {
  const postRef = doc(db, "forums", postId);
  await updateDoc(postRef, { likes: increment(1) });

  const post = posts.value.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
  }
}

const submitReply = async (post) => {
  if (post.newReplyContent && post.newReplyContent.trim()) {
    const user = auth.currentUser;

    const reply = {
      content: post.newReplyContent,
      userId: user.uid,
      username: user.email ? user.email.split('@')[0] : "Anonymous"
    };

    const postRef = doc(db, "forums", post.id);
    await updateDoc(postRef, { replies: arrayUnion(reply) });

    post.replies.push(reply);  // Update locally

    // Find the specific reply input for this post and clear it
    document.querySelector(`[data-post-id='${post.id}']`).innerText = "";

    // Clear the model value
    post.newReplyContent = "";
  }
}

const editPost = (post) => {
    const updatedTitle = prompt('Edit your post title:', post.title);
    const updatedContent = prompt('Edit your post content:', post.content);
    if (updatedTitle && updatedContent) {
        // Update locally
        post.title = updatedTitle;
        post.content = updatedContent;

        // Update on the server
        const postRef = doc(db, "forums", post.id);
        updateDoc(postRef, { title: updatedTitle, content: updatedContent });
    }
}

const deletePost = async (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
        // Delete from the server
        const postRef = doc(db, "forums", postId);
        await deleteDoc(postRef);
        
        // Update locally
        const postIndex = posts.value.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            posts.value.splice(postIndex, 1);
        }
    }
}

const editReply = (reply, post) => {
    // This can be a modal or an inline editable field.
    // For simplicity, let's use a prompt for now.
    const updatedReply = prompt('Edit your reply:', reply.content);
    if (updatedReply) {
        // Find the index of the reply within the post's replies array.no
        const replyIndex = post.replies.findIndex(r => r.content === reply.content && r.userId === reply.userId);
        if (replyIndex !== -1) {
            // Update locally
            post.replies[replyIndex].content = updatedReply;
            // Update on the server
            const postRef = doc(db, "forums", post.id);
            updateDoc(postRef, { replies: post.replies });
        }
    }
}

const deleteReply = (reply, post) => {
    // Confirm before deleting
    if (confirm('Are you sure you want to delete this reply?')) {
        // Remove the reply from the post's replies array.
        const replyIndex = post.replies.findIndex(r => r.content === reply.content && r.userId === reply.userId);
        if (replyIndex !== -1) {
            // Update locally
            post.replies.splice(replyIndex, 1);
            // Update on the server
            const postRef = doc(db, "forums", post.id);
            updateDoc(postRef, { replies: post.replies });
        }
    }
}

const handleInput = (event) => {
  const target = event.target;
  target.dataset.value = target.innerText;
};

const updateContent = (event) => {
  newPostContent.value = event.target.innerText;
  handleInput(event);
};

const updateReply = (event, post) => {
  post.newReplyContent = event.target.innerText;
  handleInput(event);
};

const updateTitle = (event) => {
  newPostTitle.value = event.target.innerText;
  handleInput(event);
};

</script>

<style scoped>

.intro-section {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 20px;
    border-bottom: 2px solid #ddd;
    padding-bottom: 15px;
}

/* New Post Styles */
.new-post {
    background-color: #f9f9f9;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-button {
    display: block;
    margin: 20px auto 0;
    background-color: #3a8d40;
    color: white;
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.post-button:hover {
    background-color: #2a6d30;
}

/* Individual Post Styles */
.post-container {
    border: 1px solid #e1e1e1;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.post-title-input {
    margin-bottom: 10px; /* spacing between the title and content input */
}

.post-title {
    font-weight: bold;
    font-size: 26px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-content {
    margin-bottom: 15px;
    font-size: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #e1e1e1;
}

button {
    padding: 8px 15px;
    margin-right: 10px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
}

.like-button, .reply-button {
    background-color: #3a8d40;
    color: white;
}

.like-button:hover, .reply-button:hover {
    background-color: #2a6d30;
}

.post-reply {
    background-color: #f7f7f7;
    padding: 10px;
    border-radius: 4px;
    margin: 15px 0;
    font-size: 15px;
    border-left: 3px solid #3a8d40;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.reply-actions {
    display: flex;
    gap: 5px;
}

.reply-content-username-wrap {
    flex: 1; /* This makes it take up any available space, pushing the buttons to the right */
    display: flex;
    justify-content: space-between; /* This will push the content to the left and the username to the right */
    margin-right: 10px;
}

.post-input[contenteditable]:empty:before, .reply-input[contenteditable]:empty:before, .post-title-input[contenteditable]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #a9a9a9;
}

.post-input, .reply-input, .post-title-input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin-right: 10px;
    font-family: Arial, sans-serif;  /* Explicitly set font family to Arial */
    font-size: 16px;                 /* Set a uniform font size */
    word-wrap: break-word;           /* Breaks the words */
    overflow-wrap: break-word;       /* Prevents long words from overflowing */
    max-height: 150px;               /* Set a max height to avoid overflow */
    overflow-y: auto;                /* Allows scrolling for long content */
    resize: none;                    /* Disables user resizing */
    outline: none;                   /* Removes the default outline */
}

.action-buttons {
    display: flex;
    align-items: center;
    margin-top: 15px;
}

.like-button {
    margin-right: 10px;
}

.post-content {
    margin-bottom: 10px;  /* Adjusted for better spacing */
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e1e1;
}

.post-status {
    background-color: #3a8d40;
    color: white;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    margin-bottom: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) { /* Tablets and below */

    .post-container, .new-post {
        padding: 15px; /* Reduced padding for better screen use */
    }

    .intro-section h1, .post-title {
        font-size: 24px; /* Slightly reduced for tablets */
    }

    .post-content {
        font-size: 18px;
    }

    .post-reply {
        font-size: 14px;
    }

    .action-buttons .like-button, .action-buttons .reply-button {
        padding: 6px 12px; /* Reduced padding for buttons */
    }

    .post-input, .reply-input, .post-title-input {
        font-size: 14px; /* Smaller font size for contenteditable areas */
    }
}

@media (max-width: 500px) { /* Mobile devices */

    .intro-section h1, .post-title {
        font-size: 22px; /* Further reduction for mobile */
    }

    .post-content {
        font-size: 16px;
    }

    .post-reply {
        font-size: 13px;
    }

    .action-buttons .like-button, .action-buttons .reply-button {
        padding: 5px 10px; /* Further reduced padding for mobile */
    }

    .post-input, .reply-input, .post-title-input {
        font-size: 13px; /* Smaller font size for mobile */
    }
}
</style>