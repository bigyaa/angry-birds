// Main Execution
class Game {

  constructor(canvas) {

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.sound = new Audio("./sounds/angry-birds.mp3");

    this.background = new Image();
    this.background.src = "./images/background.png";

    this.obstacles = [];
    this.birds = [];
    this.pigs = [];
    this.defeatedBirds = [];

    this.sling;
  }


  init() {

    this.ground = new Ground(
      GROUND_X,
      GROUND_Y,
      GAME_WIDTH,
      GAME_HEIGHT - 20,
      'rgb(188,212,56)'
    );

    // Positioning of sling relative to the bird's initial position
    this.sling = new Sling(
      INITIAL_BIRD_X,
      INITIAL_BIRD_Y
    );

    // Generate birds
    // Position in terms of the centre of the bird
    for (let i = 0; i < BIRD_POPULATION; i++) {
      if (i === 0) {
        this.birds[i] = new Bird(
          INITIAL_BIRD_X,
          INITIAL_BIRD_Y,
          this.sling
        );
      } else {

        this.birds[i] = new Bird(
          INITIAL_BIRD_X - i * 70,
          INITIAL_BIRD_Y + 160,
          this.sling
        );
      }
    }

    // Initiate input-handler
    this.inputHandler = new InputHandler(this.birds[0]);

    // Generate obstacles
    /* woodImageType [vertical, horizontal][src, width,height] */
    for (let i = 0; i < OBSTACLE_POPULATION; i++) {
      if (i < 4) {
        this.obstacles[i] = new Wood(
          OBSTACLE_POSITION.x[i],
          OBSTACLE_POSITION.y[0] - (
            woodImageType["vertical"]["height"]
          ),
          "vertical"
        );

      } else {

        this.obstacles[i] = new Wood(
          OBSTACLE_POSITION.x[i - 4] + 0.5 * woodImageType["vertical"]["width"],
          OBSTACLE_POSITION.y[0] - (
            woodImageType["horizontal"]["height"] + woodImageType["vertical"]["height"]
          ),
          "horizontal"
        );
      }
    }

    // Generate pigs
    for (let i = 0; i < PIG_POPULATION; i++) {
      this.pigs[i] = new Pig(PIG_POSITION.x[i], PIG_POSITION.y[0]);
    }
  }


  draw() {

    this.context.clearRect(
      0,
      0,
      GAME_WIDTH,
      GAME_HEIGHT
    );

    this.context.drawImage(
      this.background,
      0,
      0,
      GAME_WIDTH,
      GROUND_Y
    );

    this.context.shadowOffsetY = 2;
    this.context.shadowColor = "black";

    this.ground.show(this.context);

    if (showSlingElastic) {
      drawSlingElasticBack(this.context, this.birds[0].positionX, this.birds[0].positionY);
    }

    // Display birds
    for (
      let i = 0;
      i < BIRD_POPULATION - this.defeatedBirds.length;
      i++
    ) {
      this.birds[i].show(this.context);
    }

    if (showSlingElastic) {
      drawSlingElasticFront(this.context, this.birds[0].positionX, this.birds[0].positionY);
    }

    // Display obstacles and handle bird to obstacle collision
    for (let obstacle of this.obstacles) {
      obstacle.show(this.context);

      if (this.birds.length != 0) {
        handleBirdToObstacleCollision(this.birds[0], obstacle);
      }
    }

    // Display pigs and handle bird to pig collision
    for (let pig of this.pigs) {
      pig.show(this.context);

      if (this.birds.length != 0) {
        handleBirdToPigCollision(this.birds[0], pig);
      }
    }

    // Handle pig to obstacle collision
    for (let pig of this.pigs) {
      for (let obstacle of this.obstacles) {
        handlePigToObstacleCollision(pig, obstacle);

        // Make pig fall due to gravity
        if (!checkCircleToRectangleCollision(pig, obstacle) &&
          !checkCircleToRectangleCollision(pig, this.ground)) {

          pig.fall();
        }
      }
    }

    // Display defeated birds
    for (let defeatedBird of this.defeatedBirds) {
      defeatedBird.updateImage(3);

      defeatedBird.show(this.context);
    }

    this.sling.showSling(this.context);
  }


  mainLoop() {

    // this.sound.play();
    this.draw();

    if (spaceBar) {
      this.birds[0].launch();
    }

    // Change launching bird when bird touches the ground
    if (this.birds.length >= 1 &&
      this.birds[0].position.y + this.birds[0].radius >= GROUND_Y
    ) {

      releaseBird++;

      spaceBar = false;

      // Add defeated birds to new array
      this.defeatedBirds.push(this.birds.splice(0, 1)[0]);

      // Reset bird attributes if it isn't empty
      if (this.birds.length > 0) {
        this.birds[0].resetAttributes();
        this.inputHandler.updateInputHandler(this.birds[0]);
      }
    }

    // Make obstacles fall when base is misaligned
    for (let obstacle1 of this.obstacles) {
      for (let obstacle2 of this.obstacles) {
        if (obstacle1 !== obstacle2) {

          if (!checkVerticalRectangleToRectangleCollision(obstacle1, obstacle2)) {

            obstacle1.fall();
          }
        }
      }
    }

    requestAnimationFrame(() => this.mainLoop());
  }
}
