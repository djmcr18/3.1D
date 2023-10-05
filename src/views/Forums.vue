<template>
  <div class="content-container">
    <div class="intro-section">
      <h1>Foopy Forums</h1>
      <h3> Ask questions, vent about your matches, talk about anything footy related...</h3>
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
      <div v-if="!post.isEditing" class="post-title">
        {{ post.title }} <small>by {{ post.username }}</small>
      </div>
      <div v-if="post.isEditing" contenteditable="true" @input="updatePostTitle($event, post)" :data-value="post.title" class="editable-post">
          {{ post.title }}
      </div>

      <div v-if="!post.isEditing" class="post-content">{{ post.content }}</div>
            <div v-if="post.isEditing" contenteditable="true" @input="updatePostContent($event, post)" :data-value="post.content" class="editable-post">
          {{ post.content }}
      </div>

      <div v-if="auth.currentUser && auth.currentUser.uid === post.userId" class="post-actions">
        <button v-if="!post.isEditing" @click="editPost(post)">Edit</button>
        <button v-if="post.isEditing" @click="savePostEdit(post)">Save</button>
        <button v-if="post.isEditing" @click="cancelPostEdit(post, post.title, post.content)">Cancel</button>
        <button @click="deletePost(post.id)">Delete</button>
      </div>

      <div v-for="reply in post.replies" :key="reply.content" class="post-reply">
          <div v-if="!reply.isEditing" class="reply-content-username-wrap">
              {{ reply.content }} <small>by {{ reply.username }}</small>
          </div>

          <div v-if="reply.isEditing" class="reply-edit-container">
              <div contenteditable="true" @input="updateReplyContent($event, reply)" :data-value="reply.content" class="editable-reply">
                  {{ reply.content }}
              </div>

              <div class="reply-edit-actions">
                  <button @click="saveReplyEdit(reply, post)">Save</button>
                  <button @click="cancelReplyEdit(reply, reply.content)">Cancel</button>
              </div>
          </div>

          <button v-if="!reply.isEditing && auth.currentUser && auth.currentUser.uid === reply.userId" @click="editReply(reply)">Edit</button>
          <button v-if="auth.currentUser && auth.currentUser.uid === reply.userId" @click="deleteReply(reply, post)">Delete</button>
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

const updatePostTitle = (event, post) => {
    post.title = event.target.innerText;
};

const updatePostContent = (event, post) => {
    post.content = event.target.innerText;
};


const editPost = (post) => {
    post.originalTitle = post.title;  // Save the original title
    post.originalContent = post.content;  // Save the original content
    post.isEditing = true;  // Enable editing mode
}

const savePostEdit = (post) => {
    // Update on the server
    const postRef = doc(db, "forums", post.id);
    updateDoc(postRef, { title: post.title, content: post.content });
    post.isEditing = false; // Exit editing mode
}

const cancelPostEdit = (post) => {
    post.title = post.originalTitle;  // Revert to original title
    post.content = post.originalContent;  // Revert to original content
    post.isEditing = false;  // Exit editing mode
}

const editReply = (reply) => {
    reply.originalContent = reply.content;
    reply.currentEditingContent = reply.content; // New line
    reply.isEditing = true;
};

const updateReplyContent = (event, reply) => {
    reply.currentEditingContent = event.target.innerText;
};

const saveReplyEdit = (reply, post) => {
    reply.content = reply.currentEditingContent;
    // Update on the server
    const postRef = doc(db, "forums", post.id);
    updateDoc(postRef, { replies: post.replies });
    reply.isEditing = false;  // Exit editing mode
};

const cancelReplyEdit = (reply) => {
    reply.isEditing = false;
    delete reply.currentEditingContent;  // Clean up
};

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

/* Editable fields enhancements */
.editable-post:focus, 
.editable-reply:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0,123,255,0.5);  /* A subtle glow */
}

.editable-post, 
.editable-reply {
    background-color: #fdfdfd;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    flex: 1;  /* Make it take the available space */
    margin-right: 10px;  /* Space between the text area and buttons */
}

.reply-edit-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;  /* Make sure it takes up full width */
}

.reply-edit-actions {
    display: flex;  /* Line the buttons up in a row */
    gap: 10px;  /* Space between buttons */
}

/* Enhancements for buttons in Edit mode */
.post-actions button {
    background-color: #f1f1f1;
    color: #333;
    border: 1px solid #e1e1e1;
    margin-right: 5px;
}

.post-actions button:hover {
    background-color: #e1e1e1;
}

.post-actions button:active {
    background-color: #d1d1d1;
    transform: scale(0.98);  /* A slight size reduction for a "pressed" effect */
}

/* Consider adding a distinct style for Delete button for better UX */
.post-actions button:last-child {
    background-color: #d9534f;
    color: white;
}

.post-actions button:last-child:hover {
    background-color: #c43c3a;
}

.post-actions button:last-child:active {
    background-color: #b52a28;
}

/* Responsive Styles */
@media (max-width: 768px) { /* Tablets and below */

    .post-container, .new-post {
        padding: 15px; /* Reduced padding for better screen use */
    }

    .intro-section h1, .post-title {
        font-size: 24px; /* Slightly reduced for tablets */
    }

    .intro-section h3 {
      font-size: 16px;
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

    .reply-edit-container {
        flex-direction: column;
    }

    .editable-reply {
        margin-bottom: 10px; /* Add some space before the buttons */
        width: 85%;
    }

    .reply-edit-actions {
        justify-content: space-between; /* Spread buttons apart */
    }
}

@media (max-width: 500px) { /* Mobile devices */

    .intro-section h1, .post-title {
        font-size: 22px; /* Further reduction for mobile */
    }

    .intro-section h3 {
      font-size: 15px;
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
    
    .reply-edit-container {
        flex-direction: column;
    }

    .editable-reply {
        margin-bottom: 10px; /* Add some space before the buttons */
        width: 85%;
    }

    .reply-edit-actions {
        flex-wrap: wrap; /* Allow buttons to wrap to the next line if needed */
        gap: 5px; /* Provide a small gap between buttons */
    }
}
</style>