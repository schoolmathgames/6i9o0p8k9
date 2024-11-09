// Basic movement variables
let player = document.getElementById("player");
let gameContainer = document.getElementById("game-container");
let enemy1 = document.getElementById("enemy1");
let positionX = 50;
let positionY = 330;
let speed = 5;
let isJumping = false;
let jumpHeight = 100;
let gravity = 5;
let lives = 3;

// Math Challenge variables
let mathProblem = document.getElementById("math-problem");
let problemText = document.getElementById("problem-text");
let answerInput = document.getElementById("answer");

// Math Challenge Function
function showMathChallenge() {
  problemText.textContent = "Solve: 7 + 5 = ?";
  mathProblem.classList.remove("hidden");
}

function checkAnswer() {
  let answer = parseInt(answerInput.value);
  if (answer === 12) {
    alert("Correct! You unlocked the door!");
    mathProblem.classList.add("hidden");
    // Logic to "unlock" the door can be added here
  } else {
    alert("Incorrect, try again!");
  }
}

// Basic keyboard controls and jump mechanic
document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowRight") {
    positionX += speed;
  } else if (event.key === "ArrowLeft") {
    positionX -= speed;
  } else if (event.key === " " && !isJumping) { // Jumping
    isJumping = true;
    positionY -= jumpHeight;
  }
  updatePlayerPosition();
});

// Gravity effect
function applyGravity() {
  if (positionY < 330 && !isJumping) {
    positionY += gravity;
  } else if (positionY >= 330) {
    positionY = 330;
    isJumping = false;
  }
  updatePlayerPosition();
}

setInterval(applyGravity, 20);

// Update player position and handle collision with boundaries
function updatePlayerPosition() {
  // Boundaries
  positionX = Math.max(0, Math.min(positionX, gameContainer.offsetWidth - player.offsetWidth));
  positionY = Math.max(0, Math.min(positionY, gameContainer.offsetHeight - player.offsetHeight));

  player.style.left = positionX + "px";
  player.style.top = positionY + "px";
  checkCollisionWithEnemy();
}

// Collision detection
function checkCollisionWithEnemy() {
  let playerRect = player.getBoundingClientRect();
  let enemy1Rect = enemy1.getBoundingClientRect();

  if (
    playerRect.x < enemy1Rect.x + enemy1Rect.width &&
    playerRect.x + playerRect.width > enemy1Rect.x &&
    playerRect.y < enemy1Rect.y + enemy1Rect.height &&
    playerRect.y + playerRect.height > enemy1Rect.y
  ) {
    alert("Game Over! You hit an enemy!");
    resetGame();
  }
}

function resetGame() {
  positionX = 50;
  positionY = 330;
  lives--;
  if (lives <= 0) {
    alert("No lives left! Game over.");
    lives = 3; // Reset lives for a new game
  }
  updatePlayerPosition();
}
