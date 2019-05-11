// Main Execution
class Game {

  constructor(canvas) {

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.background = new Image();
    this.background.src = "./images/background.png";

    this.obstacles = [];
    this.birds = [];
    this.pigs = [];
    this.defeatedBirds = [];
    this.damagedPigs = [];
    this.defeatedPigs = [];

    this.sling;

    this.birdCollidedWithPig = false;
    this.birdCollidedWithObstacle = false;
    this.pigCollidedWithObstacle = false;
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
    /* obstacleImageType [vertical, horizontal][src, width,height] */
    for (let i = 0; i < OBSTACLE_POPULATION; i++) {
      this.obstacles[i] = new Wood(
        OBSTACLE_POSITION.x[0] + SPACE_BETWEEN_OBSTACLES * i,
        OBSTACLE_POSITION.y[i] - (
          obstacleImageType["stone"]["height"]
        ),
        "stone"
      );
    }

    // Generate pigs
    for (let i = 0; i < PIG_POPULATION; i++) {
      this.pigs[i] = new Pig(PIG_POSITION.x[0] + SPACE_BETWEEN_OBSTACLES * i, PIG_POSITION.y[i]);
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

    // Show score points
    showText(this.context, "SCORE: " + score, "30px Signika", 20, 50, "white");

    // Add shadow to elements
    this.context.shadowOffsetY = 2;
    this.context.shadowColor = "black";

    this.ground.show(this.context);

    if (showSlingElastic) {
      drawSlingElasticBack(
        this.context,
        this.birds[0].position.x,
        this.birds[0].position.y
      );
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
      drawSlingElasticFront(
        this.context,
        this.birds[0].positionX,
        this.birds[0].positionY
      );
    }

    // Display obstacles
    for (let obstacle of this.obstacles) {
      obstacle.show(this.context);
    }

    // Display pigs
    for (let pig of this.pigs) {
      pig.show(this.context);
    }

    // Display defeated birds
    for (let defeatedBird of this.defeatedBirds) {
      defeatedBird.updateImage(3);

      defeatedBird.show(this.context);
    }

    this.sling.showSling(this.context);
  }

  handleCollisions() {
    for (let pig of this.pigs) {
      for (let obstacle of this.obstacles) {

        /* Flag all the collided elements */

        // Condition to ensure all birds haven't been defeated
        if (this.birds.length != 0) {
          if (checkCircleToCircleCollision(this.birds[0], pig)) {
            this.birdCollidedWithPig = true;
            this.birds[0].collision = true;
          }

          if (checkCircleToRectangleCollision(this.birds[0], obstacle)) {
            this.birdCollidedWithObstacle = true;
            this.birds[0].collision = true;
          }

          // if (checkCircleToRectangleCollision(pig, obstacle)) {
          //   this.pigCollidedWithObstacle = true;
          // }
        }

        // Change launching bird when bird touches the ground or when it collides
        if (this.birds.length >= 1 &&
          (this.birds[0].position.y + this.birds[0].radius >= GROUND_Y ||
            this.birds[0].collision === true)
        ) {
          releaseBird++;

          spaceBar = false;
          listen = true;

          // Add defeated birds to new array
          this.defeatedBirds.push(this.birds.splice(0, 1)[0]);

          // Reset bird attributes if it isn't empty
          if (this.birds.length > 0) {
            this.birds[0].resetAttributes();
            this.inputHandler.updateInputHandler(this.birds[0]);
          }
        }

        /*  Handle flagged collisions */

        if (this.birdCollidedWithPig) {
          pig.collision = true;
          this.defeatedBirds[this.defeatedBirds.length - 1].collision = true;

          handleBirdToPigCollision(this.defeatedBirds[this.defeatedBirds.length - 1], pig);
        }

        if (this.birdCollidedWithObstacle) {
          obstacle.collision = true;
          this.defeatedBirds[this.defeatedBirds.length - 1].collision = true;

          handleBirdToObstacleCollision(this.defeatedBirds[this.defeatedBirds.length - 1], obstacle);
        }

        // if (this.pigCollidedWithObstacle &&
        //   pig.initialVelocity ||
        //   obstacle.initialVelocity
        // ) {
        //   obstacle.collision = true;
        //   pig.collision = true;

        //   handlePigToObstacleCollision(pig, obstacle);
        // }

        // // Make pig fall due to gravity
        // if (!checkCircleToRectangleCollision(pig, obstacle) /* &&
        //   !checkCircleToCircleCollision(pig, this.defeatedBirds[defeatedBird]) */
        // ) {

        //   if (pig.position.y + pig.radius < GROUND_Y) {

        //     // Increase y-coordinate until it collides
        //     this.position.y += GRAVITY;
        //   }
        // }
      }
    }
  }


  startGameLoop() {

    this.draw();

    this.handleCollisions();

    if (this.defeatedBirds.length === BIRD_POPULATION &&
      !this.defeatedBirds[BIRD_POPULATION - 1].collision) {
      gameOver = true;
    }

    if (spaceBar) {
      this.birds[0].launch();

      listen = false;
    }

    if (!gameOver) {
      requestAnimationFrame(() => this.startGameLoop());

    } else {
      showText(this.context, "GAME OVER", "80px Signika", 550, GAME_HEIGHT / 2, "black");

      sound.pause();
    }
  }


  startGame(canvas) {
    this.init();
    this.startGameLoop(canvas);
  }
}
