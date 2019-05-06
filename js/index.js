var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var obstacles = [];
var initialBirdX = 250;
var initialBirdY = 360;
var ground = new Rectangle(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
var sling = new Sling(initialBirdX, initialBirdY);
var bird = new Bird(initialBirdX, initialBirdY, sling);
var inputHandler = new InputHandler(bird);
var sound = new Audio("./sounds/angry-birds.mp3");
var background = new Image();
background.src = "./images/background.png";


// Generate obstacles
for (let i = 0; i < NUM_OF_OBSTACLES; i++) {
  obstacles[i] = new Wood(OBSTACLE_POSITION.x[i], OBSTACLE_POSITION.y/*  - i * OBSTACLE_HEIGHT */, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
}

// Main Execution
setInterval(function gameLoop() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);
  // sound.play();

  ground.show(context);

  for (let obstacle of obstacles) {
    obstacle.show(context);
    obstacle.checkBallCollision(bird);
  }

  bird.show(context);
  sling.showSling(context);

  if (spaceBar) {
    bird.launch();
  }

}, 1000 / 60);

