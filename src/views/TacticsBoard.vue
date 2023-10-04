<template>
    <div class="content-container">
      <div class="intro-section">
        <h1>Tactics Whiteboard 📋</h1>
        <h3>Unleash your inner manager! Craft and plan your football strategies, set plays, and game-winning tactics on our interactive whiteboard. Perfect for enthusiasts and professional coaches alike.</h3>
      </div>

  
      <div class="news-item">
        <canvas 
          ref="canvas" 
          style="width: 100%; max-width: 700px; height: auto;"
          @mousedown="startDrawing" 
          @mouseup="endDrawing" 
          @mouseout="endDrawing" 
          @mousemove="draw"
        ></canvas>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { onBeforeUnmount } from "vue";
  
  const canvas = ref(null);
  let drawing = false;
  
  const startDrawing = (event) => {
    drawing = true;
    const context = canvas.value.getContext("2d");
    context.beginPath();
  };
  
  const endDrawing = () => {
    drawing = false;
  };
  
  const draw = (event) => {
    if (!drawing) return;
    const context = canvas.value.getContext("2d");
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "red";
  
    const rect = canvas.value.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };
  
  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    drawPitch();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  const handleResize = () => {
    const containerWidth = canvas.value.parentElement.offsetWidth;
    canvas.value.width = containerWidth;
    canvas.value.height = containerWidth * 450 / 700;
    drawPitch();
  };

  const drawPitch = () => {
    const ctx = canvas.value.getContext("2d");
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;

    const w = canvas.value.width;
    const h = canvas.value.height;

    // Boundary
    ctx.strokeRect(0, 0, w, h);

    // Mid line
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, w * 0.104, 0, 2 * Math.PI); // 73/700 ≈ 0.104
    ctx.stroke();

    // Penalty areas
    ctx.strokeRect(w * 0.108, h * 0.175, w * 0.217, h * 0.65); // 76/700 ≈ 0.108, 152/700 ≈ 0.217
    ctx.strokeRect(w * 0.675, h * 0.175, w * 0.217, h * 0.65);

    // Goal areas
    ctx.strokeRect(w * 0.108, h * 0.295, w * 0.071, h * 0.41); // 50/700 ≈ 0.071
    ctx.strokeRect(w * 0.821, h * 0.295, w * 0.071, h * 0.41);

    // Penalty spots
    ctx.beginPath();
    ctx.arc(w * 0.293, h / 2, w * 0.0028, 0, 2 * Math.PI); // 2/700 ≈ 0.0028
    ctx.fill();

    ctx.beginPath();
    ctx.arc(w * 0.707, h / 2, w * 0.0028, 0, 2 * Math.PI);
    ctx.fill();
};

  </script>
  
  <style scoped>
  .content-container {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .intro-section {
    border-bottom: 2px solid #ddd;
    padding-bottom: 15px;
  }
  
  .news-item {
      margin: 2rem 0; /* Using rem units for margins */
      padding: 1rem; /* Using rem for padding */
      background-color: var(--color-background);
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      width: 90%; /* Reducing the width to 90% to make it a bit smaller */
      max-width: 650px; /* Reducing max-width to 650px from 700px */
      position: relative;
      overflow: hidden;
  }
  
  canvas {
      display: block;
      width: 100%;
      height: auto;
      background-color: #006400;
      cursor: crosshair;
  }
  
  /* Media queries for smaller screens */
  @media (max-width: 800px) { /* Reduced the breakpoint for adjustments */
      .news-item {
          margin: 1rem 0;
          padding: 0.5rem;
      }
  }

  @media (max-width: 600px) { /* Mobile devices */
    .intro-section h1 {
        font-size: 24px; /* Reduced size for the main title */
    }

    .intro-section h3 {
        font-size: 16px; /* Reduced size for the description */
    }
}

/* The next one is just for very narrow screens */
@media (max-width: 400px) {
    .news-item {
        margin: 0.5rem 0;
        padding: 0.25rem;
    }

    canvas {
        /* Ensure the canvas doesn't get too small */
        min-height: 200px;
    }
}
  </style>
  