let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let obstacles = [];
let pigs = [];
let initialBirdX = 250;
let initialBirdY = 360;
let ground = new Ground(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
let sling = new Sling(initialBirdX, initialBirdY);
let bird = new Bird(initialBirdX, initialBirdY, sling); // Position in terms of the centre of the bird
let inputHandler = new InputHandler(bird);
let sound = new Audio("./sounds/angry-birds.mp3");
let background = new Image();
background.src = "./images/background.png";

generateObstacles();
generatePigs();

// Main Execution
(function GameLoop() {
  // sound.play();

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);

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

    for (let obstacle of obstacles) {
      for (let n in obstacles) {
        if (obstacles[n] != obstacle) {
          checkRectangleToRectangleCollision(obstacle, obstacles[n]);
        }
      }
    }

    handleBirdToGroundCollision(bird, ground);
  }

  requestAnimationFrame(GameLoop);

})();

