
let ground = new Ground(
  GROUND_X,
  GROUND_Y,
  GAME_WIDTH,
  GAME_HEIGHT - 20,
  'rgb(188,212,56)'
);

let sling = new Sling(
  initialBirdX,
  initialBirdY
);

// Position in terms of the centre of the bird
for (let i = 0; i < BIRD_POPULATION; i++) {
  if (i === 0) {
    bird[i] = new Bird(
      initialBirdX,
      initialBirdY,
      sling
    );
  } else {
    bird[i] = new Bird(
      initialBirdX - i * 80,
      initialBirdY + 160,
      sling
    );
  }

}

let inputHandler = new InputHandler(bird[0]);
let sound = new Audio("./sounds/angry-birds.mp3");
let background = new Image();
background.src = "./images/background.png";

generateObstacles();
generatePigs();


// Main Execution
(function GameLoop() {
  // sound.play();

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(
    background,
    0,
    0,
    GAME_WIDTH,
    GROUND_Y
  );

  ground.show(context);

  for (let i = 0; i < BIRD_POPULATION; i++) {
    bird[i].show(context);
  }

  sling.showSling(context);

  for (let obstacle of obstacles) {
    obstacle.show(context);
    handleBirdToObstacleCollision(bird[0], obstacle);
  }

  for (let pig of pigs) {
    pig.show(context);
    handleBirdToPigCollision(bird[0], pig);
  }

  for (let pig of pigs) {
    for (let obstacle of obstacles) {
      handlePigToObstacleCollision(pig, obstacle);
    }
  }

  handleBirdToGroundCollision(bird[0], ground);

  for (let obstacle of obstacles) {
    for (let n = 0; n < obstacles.length; n++) {
      if (obstacles[n] != obstacle) {
        checkRectangleToRectangleCollision(obstacle, obstacles[n]);
      }
    }
  }

  if (spaceBar) {
    bird[0].launch();
  }

  requestAnimationFrame(GameLoop);

})();

