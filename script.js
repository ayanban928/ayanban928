// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Snake Game
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("snakeScore");
const currentLengthDisplay = document.getElementById("currentLength");
const bestScoreDisplay = document.getElementById("bestScore");

// Game variables
let snake = [];
let direction = { x: 1, y: 0 };
let apple = { x: 0, y: 0 };
let gridSize = 20;
let tileCount = 30;
let gameLoop = null;
let applesEaten = 0;
let gameRunning = false;
let bestScore = 0;

// Game boundary settings
let gameArea = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  cols: 0,
  rows: 0
};

// Load best score from localStorage
if (localStorage.getItem("snakeBestScore")) {
  bestScore = parseInt(localStorage.getItem("snakeBestScore"));
  if (bestScoreDisplay) {
    bestScoreDisplay.textContent = bestScore;
  }
}

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Define game boundary (centered on screen with padding)
  const padding = 40;
  const maxWidth = Math.min(canvas.width - padding * 2, 800);
  const maxHeight = Math.min(canvas.height - padding * 2, 600);
  
  gameArea.cols = Math.floor(maxWidth / gridSize);
  gameArea.rows = Math.floor(maxHeight / gridSize);
  gameArea.width = gameArea.cols * gridSize;
  gameArea.height = gameArea.rows * gridSize;
  gameArea.x = (canvas.width - gameArea.width) / 2;
  gameArea.y = (canvas.height - gameArea.height) / 2;
  
  tileCount = gameArea.cols;
}

// Initialize game
function initGame() {
  resizeCanvas();
  snake = [
    { x: Math.floor(gameArea.cols / 2), y: Math.floor(gameArea.rows / 2) }
  ];
  direction = { x: 1, y: 0 };
  applesEaten = 0;
  placeApple();
}

// Place apple at random position within game boundary
function placeApple() {
  apple.x = Math.floor(Math.random() * gameArea.cols);
  apple.y = Math.floor(Math.random() * gameArea.rows);
}

// Draw the snake and apple
function draw() {
  // Clear canvas with dark grayish background for trail effect
  ctx.fillStyle = "rgba(13, 13, 13, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw game boundary with Apple-style glow
  ctx.strokeStyle = "rgba(10, 132, 255, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(gameArea.x, gameArea.y, gameArea.width, gameArea.height);
  
  // Draw subtle grid pattern inside boundary
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= gameArea.cols; i++) {
    ctx.beginPath();
    ctx.moveTo(gameArea.x + i * gridSize, gameArea.y);
    ctx.lineTo(gameArea.x + i * gridSize, gameArea.y + gameArea.height);
    ctx.stroke();
  }
  for (let i = 0; i <= gameArea.rows; i++) {
    ctx.beginPath();
    ctx.moveTo(gameArea.x, gameArea.y + i * gridSize);
    ctx.lineTo(gameArea.x + gameArea.width, gameArea.y + i * gridSize);
    ctx.stroke();
  }

  // Draw snake (offset by game area position)
  snake.forEach((segment, index) => {
    // Gradient effect for sleek Apple-style look
    const opacity = 1 - (index / snake.length) * 0.4;
    ctx.fillStyle = `rgba(10, 132, 255, ${opacity})`;
    ctx.fillRect(
      gameArea.x + segment.x * gridSize + 1,
      gameArea.y + segment.y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );
    
    // Subtle glow effect
    ctx.strokeStyle = `rgba(10, 132, 255, ${opacity * 0.6})`;
    ctx.lineWidth = 1;
    ctx.strokeRect(
      gameArea.x + segment.x * gridSize + 1,
      gameArea.y + segment.y * gridSize + 1,
      gridSize - 2,
      gridSize - 2
    );
  });

  // Draw apple with Apple-style design (offset by game area position)
  ctx.fillStyle = "#ff3b30";
  ctx.fillRect(
    gameArea.x + apple.x * gridSize + 2,
    gameArea.y + apple.y * gridSize + 2,
    gridSize - 4,
    gridSize - 4
  );
  ctx.strokeStyle = "rgba(255, 59, 48, 0.6)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(
    gameArea.x + apple.x * gridSize + 2,
    gameArea.y + apple.y * gridSize + 2,
    gridSize - 4,
    gridSize - 4
  );
}

// Update game state
function update() {
  if (!gameRunning) return;

  // Move snake
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Wrap around game boundary edges
  if (head.x < 0) head.x = gameArea.cols - 1;
  if (head.x >= gameArea.cols) head.x = 0;
  if (head.y < 0) head.y = gameArea.rows - 1;
  if (head.y >= gameArea.rows) head.y = 0;

  // Check collision with self
  for (let i = 0; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // Game over - snake ran into itself
      gameOver();
      return;
    }
  }

  snake.unshift(head);

  // Check if apple is eaten
  if (head.x === apple.x && head.y === apple.y) {
    applesEaten++;
    placeApple();
  } else {
    snake.pop();
  }

  // Update current length display
  updateScore();
  draw();
}

// Update score display
function updateScore() {
  if (currentLengthDisplay) {
    currentLengthDisplay.textContent = snake.length;
  }
  
  // Update best score if current length is greater
  if (snake.length > bestScore) {
    bestScore = snake.length;
    if (bestScoreDisplay) {
      bestScoreDisplay.textContent = bestScore;
    }
    // Save to localStorage
    localStorage.setItem("snakeBestScore", bestScore);
  }
}

// Game over function
function gameOver() {
  gameRunning = false;
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  
  // Flash effect to indicate game over
  ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Return to original page after a brief delay
  setTimeout(() => {
    canvas.style.display = "none";
    scoreDisplay.classList.remove("show");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 800);
}

// Start the game
function startGame() {
  if (gameRunning) {
    // If game is running, restart it
    stopGame();
  }
  
  canvas.style.display = "block";
  scoreDisplay.classList.add("show");
  gameRunning = true;
  initGame();
  updateScore();
  
  if (gameLoop) {
    clearInterval(gameLoop);
  }
  
  gameLoop = setInterval(update, 100);
}

// Stop the game
function stopGame() {
  gameRunning = false;
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
  
  // Fade out effect
  setTimeout(() => {
    canvas.style.display = "none";
    scoreDisplay.classList.remove("show");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 500);
}

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Start game when clicking on name
const mainName = document.getElementById("mainName");

if (mainName) {
  mainName.addEventListener("click", () => {
    startGame();
  });
}

// Resize canvas when window is resized
window.addEventListener("resize", () => {
  if (gameRunning) {
    resizeCanvas();
  }
});

// Initialize canvas (hidden)
canvas.style.display = "none";

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking a link
      navLinks.classList.remove("active");
    }
  });
});

// Form submission handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Add scroll-based animations
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
