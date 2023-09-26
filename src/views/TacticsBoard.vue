<template>
    <div class="content-container">
      <div class="intro-section">
        <h1>Tactics Whiteboard 📋</h1>
        <br>
        <h3>Unleash your inner manager! Craft and plan your football strategies, set plays, and game-winning tactics on our interactive whiteboard. Perfect for enthusiasts and professional coaches alike.</h3>
      </div>

  
      <div class="news-item">
        <canvas ref="canvas" @mousedown="startDrawing" @mouseup="endDrawing" @mouseout="endDrawing" @mousemove="draw"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    name: "TacticsWhiteboard",
  
    setup() {
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
      canvas.value.width = 700; 
      canvas.value.height = 450;
      drawPitch();
    });

  
      const drawPitch = () => {
        const ctx = canvas.value.getContext("2d");
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
  
        // Boundary
        ctx.strokeRect(0, 0, canvas.value.width, canvas.value.height);
  
        // Mid line
        ctx.beginPath();
        ctx.moveTo(canvas.value.width / 2, 0);
        ctx.lineTo(canvas.value.width / 2, canvas.value.height);
        ctx.stroke();
  
        // Center circle
        ctx.beginPath();
        ctx.arc(canvas.value.width / 2, canvas.value.height / 2, 73, 0, 2 * Math.PI); 
        ctx.stroke();
  
        // Penalty areas
        ctx.strokeRect(76, (canvas.value.height - 293) / 2, 152, 293);
        ctx.strokeRect(canvas.value.width - 228, (canvas.value.height - 293) / 2, 152, 293);
  
        // Goal areas
        ctx.strokeRect(76, (canvas.value.height - 183) / 2, 50, 183);
        ctx.strokeRect(canvas.value.width - 126, (canvas.value.height - 183) / 2, 50, 183);
  
        // Penalty spots
        ctx.beginPath();
        ctx.arc(205, canvas.value.height / 2, 2, 0, 2 * Math.PI);
        ctx.fill();
  
        ctx.beginPath();
        ctx.arc(canvas.value.width - 205, canvas.value.height / 2, 2, 0, 2 * Math.PI);
        ctx.fill();
  
      };
  
      return {
        canvas,
        startDrawing,
        endDrawing,
        draw,
      };
    },
  };
  </script>
  
  <style scoped>
  .content-container {
      max-width: 100vw;
      margin: 40px auto;
      padding: 20px;
      background-color: var(--color-background-soft);
      border-radius: 15px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
  }
  
  .intro-section {
      text-align: center;
      padding: 20px;
      margin-bottom: 40px;
      border-bottom: 1px solid var(--color-border);
      width: 100%;
  }
  
  .news-item {
      margin: 40px 0;
      padding: 20px;
      background-color: var(--color-background);
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      width: 90%;
      position: relative;
      overflow: hidden;
  }
  
  canvas {
      display: block;
      background-color: #006400; /* Football pitch green */
      cursor: crosshair; /* Crosshair cursor */
  }
  </style>
  