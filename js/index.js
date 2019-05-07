var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var obstacles = [];
var pigs = [];
var initialBirdX = 250;
var initialBirdY = 360;
var ground = new Rectangle(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
var sling = new Sling(initialBirdX, initialBirdY);
var bird = new Bird(initialBirdX, initialBirdY, sling); // Position in terms of the centre of the bird
var inputHandler = new InputHandler(bird);
var sound = new Audio("./sounds/angry-birds.mp3");
var background = new Image();
background.src = "./images/background.png";

/* // Generate obstacles
for (let i = 0; i < OBSTACLE_POPULATION; i++) {
  obstacles[i] = new Wood(OBSTACLE_POSITION.x[i], OBSTACLE_POSITION.y[0] - i * OBSTACLE_HEIGHT, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
} */

generateObstacles();

// Generate pigs
for (let i = 0; i < PIG_POPULATION; i++) {
  pigs[i] = new Pig(PIG_POSITION.x[i], PIG_POSITION.y[0]);
}

// Main Execution
setInterval(function gameLoop() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);
  // sound.play();

  ground.show(context);

  for (let obstacle of obstacles) {
    obstacle.show(context);
    handleBirdToObstacleCollision(bird, obstacle);
  }

  for (let pig of pigs) {
    pig.show(context);
    handleBirdToPigCollision(bird, pig);
  }

  bird.show(context);
  sling.showSling(context);

  if (spaceBar) {
    bird.launch();
  }

}, 1000 / 60);

