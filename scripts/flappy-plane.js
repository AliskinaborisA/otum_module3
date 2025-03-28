const exitButton = document.querySelector('.exitButton');
const canvas = document.querySelector('.gameCanvas');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;
const ctx = canvas.getContext('2d');

const airplaneImg = new Image();
airplaneImg.src = 'assets/plane.png';

const buildingBlackImg = new Image();
buildingBlackImg.src = 'assets/blackBuilding.png';

const buildingWhiteImg = new Image();
buildingWhiteImg.src = 'assets/whiteBuilding.png';

const cloudsImg = new Image();
cloudsImg.src = 'assets/groupedClouds.png';
cloudsImg.height = canvas.height / 2;

exitButton.addEventListener('click', () => {
    threeDoorsScreen.classList.add('active');
    flappyPlaneScreen.classList.remove('active');
});

const gravity = 0.5;
const jumpStrength = -8;
const obstacleSpeed = 2;
const gapHeight = 150;
const obstacleWidth = 60;
const obstacleInterval = 1500;

let airplane = {
  x: 50,
  y: canvas.height / 2,
  width: 40,
  height: 30,
  velocity: 0
};

let obstacles = [];
let lastObstacleTime = Date.now();
let score = 0;
let gameOver = false;
let obstacleCount = 0;

function updateScoreBoard() {
  document.querySelector('.scoreBoard').innerText = "Score: " + score;
}

function createObstacle() {
  const minGapY = 50;
  const maxGapY = canvas.height - gapHeight - 50;
  const gapY = Math.floor(Math.random() * (maxGapY - minGapY + 1)) + minGapY;
  const colorType = obstacleCount % 2;
  
  obstacles.push({
    x: canvas.width,
    width: obstacleWidth,
    gapY: gapY,
    colorType: colorType
  });
  obstacleCount++;
}

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

function update() {
  if (gameOver) return;

  airplane.velocity += gravity;
  airplane.y += airplane.velocity;

  if (Date.now() - lastObstacleTime > obstacleInterval) {
    createObstacle();
    lastObstacleTime = Date.now();
  }

  obstacles.forEach(obs => {
    obs.x -= obstacleSpeed;

    let topRect = {
      x: obs.x,
      y: 0,
      width: obs.width,
      height: obs.gapY
    };
    let bottomRect = {
      x: obs.x,
      y: obs.gapY + gapHeight,
      width: obs.width,
      height: canvas.height - (obs.gapY + gapHeight)
    };

    if (checkCollision(airplane, topRect) || checkCollision(airplane, bottomRect)) {
      gameOver = true;
    }

    if (!obs.passed && obs.x + obs.width < airplane.x) {
      score++;
      obs.passed = true;
    }
  });

  obstacles = obstacles.filter(obs => obs.x + obs.width > 0);

  if (airplane.y < 0 || airplane.y + airplane.height > canvas.height) {
    gameOver = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#70c5ce";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (cloudsImg.complete) {
    let cloudsHeight = cloudsImg.height;
    ctx.drawImage(cloudsImg, 0, canvas.height - cloudsHeight, canvas.width, cloudsHeight);
  }

  obstacles.forEach(obs => {
    const buildingImg = (obs.colorType === 0) ? buildingBlackImg : buildingWhiteImg;
    ctx.drawImage(buildingImg, obs.x, 0, obs.width, obs.gapY);
    ctx.drawImage(buildingImg, obs.x, obs.gapY + gapHeight, obs.width, canvas.height - (obs.gapY + gapHeight));
  });

  ctx.drawImage(airplaneImg, airplane.x, airplane.y, airplane.width, airplane.height);

  if (gameOver) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.font = "48px Simpsonfont";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    ctx.font = "24px Simpsonfont";
    ctx.fillText("Click to Restart", canvas.width / 2, canvas.height / 2 + 40);
  }
}

function gameLoop() {
  update();
  updateScoreBoard();
  draw();
  if (!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}

function jump() {
  if (gameOver) {
    restartGame();
  } else {
    airplane.velocity = jumpStrength;
  }
}

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" || e.code === "ArrowUp") {
    jump();
  }
});
document.addEventListener("click", function() {
  jump();
});

function restartGame() {
  airplane = {
    x: 50,
    y: canvas.height / 2,
    width: 40,
    height: 30,
    velocity: 0
  };
  obstacles = [];
  score = 0;
  gameOver = false;
  obstacleCount = 0;
  lastObstacleTime = Date.now();
  gameLoop();
}

gameLoop();
