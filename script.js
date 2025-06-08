let secretNumber;
let maxNumber = 100;
let attempts;
let maxAttempts = 10;
const message = document.getElementById("message");
const attemptsLeft = document.getElementById("attemptsLeft");
const guessInput = document.getElementById("guessInput");
const difficulty = document.getElementById("difficulty");
const restartBtn = document.getElementById("restartBtn");

const confettiCanvas = document.getElementById('confetti-canvas');
const confetti = confettiCanvas.getContext('2d');

let confettiAnimationId; // Store animation frame ID to stop confetti

// Start new game
function startGame() {
  const level = difficulty.value;
  if (level === "easy") {
    maxNumber = 50;
    maxAttempts = 15;
  } else if (level === "medium") {
    maxNumber = 100;
    maxAttempts = 10;
  } else {
    maxNumber = 200;
    maxAttempts = 5;
  }

  secretNumber = Math.floor(Math.random() * maxNumber) + 1;
  attempts = 0;
  message.textContent = "🕹️ Game started! Good luck!";
  attemptsLeft.textContent = `Attempts left: ${maxAttempts}`;
  guessInput.disabled = false;
  guessInput.value = "";
  clearCanvas();
  restartBtn.style.display = "none"; // hide restart button
}

function checkGuess() {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > maxNumber) {
    message.textContent = `❗ Please enter a valid number between 1 and ${maxNumber}`;
    return;
  }

  attempts++;

  if (guess === secretNumber) {
    message.innerHTML = `🎉 Correct! The number was ${secretNumber} 😄`;
    showConfetti();
    guessInput.disabled = true;
    restartBtn.style.display = "inline-block";
  } else if (attempts >= maxAttempts) {
    message.innerHTML = `💀 Game Over! The number was ${secretNumber} 😢`;
    guessInput.disabled = true;
    restartBtn.style.display = "inline-block";
  } else if (guess < secretNumber) {
    message.innerHTML = `🔼 Too low! Try again 😐`;
  } else if (guess > secretNumber) {
    message.innerHTML = `🔽 Too high! Try again 😐`;
  }

  attemptsLeft.textContent = `Attempts left: ${maxAttempts - attempts}`;
}

difficulty.addEventListener("change", startGame);
window.onload = startGame;

// Confetti animation functions
function showConfetti() {
  let pieces = [];
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 5 + 2,
      d: Math.random() * 10 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    });
  }

  function draw() {
    confetti.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let p of pieces) {
      confetti.beginPath();
      confetti.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      confetti.fillStyle = p.color;
      confetti.fill();
      p.y += p.d;
      if (p.y > window.innerHeight) p.y = 0;
    }
    confettiAnimationId = requestAnimationFrame(draw);
  }

  draw();
}

function clearCanvas() {
  confetti.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }
}
