class Game {

  constructor(canvas) {

    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.background = new Image();
    this.background.src = "./images/background.png";

    this.audioGameOver = new Audio();
    this.audioGameOver.src = "./sounds/game-over.mp3"

    this.resetButton = document.getElementById('resetButton');

    this.obstacles = [];
    this.pigs = [];
    this.recordOfScores = [];

    this.birds;
    this.defeatedBirds;
    this.sling;
    this.birdInAir;
    this.score;
    this.gameOver;
    this.spaceBar;
    this.showSlingElastic;
    this.animation;
    this.InputHandler;

    this.reset = false;
  }


  startGame() {
    this.init();
    this.startGameLoop();
  }


  init() {
    this.score = 0;
    this.birdInAir = null;

    this.birds = [];
    this.defeatedBirds = [];

    this.gameOver = false;
    this.spaceBar = false
    this.showSlingElastic = true;

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

        this.birds[i].listen = true;

      } else {
        this.birds[i] = new Bird(
          INITIAL_BIRD_X - i * GAP_BETWEEN_BIRDS,
          INITIAL_BIRD_Y + HEIGHT_GAP_BETWEEN_BIRDS,
          this.sling
        );
      }
    }


    // Initiate input-handler
    this.inputHandler = new InputHandler(this.birds[0]);


    // Generate obstacles
    /* obstacleImageType [vertical, horizontal, stone][src, width, height] */
    for (let i = 0; i < OBSTACLE_POPULATION; i++) {
      this.obstacles[i] = new Obstacle(
        OBSTACLE_POSITION.x[0] + SPACE_BETWEEN_OBSTACLES * i,
        OBSTACLE_POSITION.y[i] - (
          obstacleImageType["stone"]["height"]
        ),
        "stone"
      );
    }

    // Generate pigs
    for (let i = 0; i < PIG_POPULATION; i++) {
      this.pigs[i] = new Pig(
        PIG_POSITION.x[0] + SPACE_BETWEEN_OBSTACLES * i,
        PIG_POSITION.y[i]);
    }
  }



  startGameLoop() {
    this.draw();

    if (this.spaceBar) {
      this.birds[0].launch();

      this.birds[0].listen = false;
    }

    this.handleCollisions();

    if (this.defeatedBirds.length === BIRD_POPULATION &&
      !this.birdInAir.collision) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      this.showGameOverScreen();
    } else {
      this.animation = requestAnimationFrame(() => this.startGameLoop());
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
    showText(
      this.context,
      "SCORE: " + this.score,
      "30px Signika",
      20,
      50,
      "white");

    if (this.reset) {
      showText(
        this.context,
        "HIGH SCORE: " + this.highScore,
        "30px Signika",
        GAME_WIDTH - 300,
        50,
        "white");
    }

    // Add shadow to elements
    this.context.shadowOffsetY = 2;
    this.context.shadowColor = "black";

    this.ground.show(this.context);

    if (this.showSlingElastic) {
      this.sling.drawSlingElasticBack(
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

    if (this.showSlingElastic) {
      this.sling.drawSlingElasticFront(
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

    /* Flag all the collided elements */

    // Condition to ensure all birds haven't been defeated
    if (this.birds.length != 0) {

      //  Check bird to pig collision
      for (let pig of this.pigs) {
        if (checkCircleToCircleCollision(this.birds[0], pig)) {
          pig.collision = true;
          this.birds[0].collision = true;
        }
      }

      // Check bird to obstacle collision
      for (let obstacle of this.obstacles) {
        if (checkCircleToRectangleCollision(this.birds[0], obstacle)) {
          obstacle.collision = true;
          this.birds[0].collision = true;
        }
      }

      // Check collision between the pigs and obstacles
      for (let pig of this.pigs) {
        for (let obstacle of this.obstacles) {
          if (checkCircleToRectangleCollision(this.birds[0], obstacle) &&
            !checkCircleToRectangleCollision(pig, obstacle)) {
            pig.fall(obstacle);
          }
        }
      }
    }

    // Change launching bird when bird touches the ground or when it collides or when it goes out of the game frame
    if (this.birds.length >= 1 &&
      (this.birds[0].position.y + this.birds[0].radius >= GROUND_Y ||
        this.birds[0].collision === true ||
        this.birds[0].position.y < 0 - this.birds[0].radius ||
        this.birds[0].position.x > GAME_WIDTH + this.birds[0].radius)
    ) {

      this.spaceBar = false;
      this.birds[0].listen = false;

      // Add defeated birds to new array
      this.defeatedBirds.push(this.birds.splice(0, 1)[0]);

      this.birdInAir = this.defeatedBirds[this.defeatedBirds.length - 1];

      // Reset bird attributes if it isn't empty
      if (this.birds.length > 0) {
        this.birds[0].resetAttributes();
        this.birds[0].listen = true;

        this.inputHandler.updateInputHandler(this.birds[0]);
      }
    }

    /*  Handle flagged collisions */

    for (let pig of this.pigs) {
      if (pig.collision) {
        pig.handlePigCollision(this.birdInAir, 1);
      }
    }

    for (let obstacle of this.obstacles) {
      if (obstacle.collision) {
        obstacle.handleObstacleCollision();
      }
    }

    if (this.birdInAir &&
      this.birdInAir.collision) {

      // @param: specifies direction; -1 if it is supposed to move to the left, else 1
      this.birdInAir.handleBirdCollision(-1);
    }
  }


  resetGame() {
    this.reset = true;

    this.resetButton.style.display = "none";

    this.updateScore();
    this.startGame();
  }


  updateScore() {
    this.recordOfScores.push(this.score);

    this.highScore = Math.max(this.recordOfScores);
  }


  showGameOverScreen() {
    this.audioGameOver.play();

    this.resetButton.style.display = "block";
    this.resetButton.addEventListener('mousedown',
      () => {
        this.resetGame();
      });

    showText(
      this.context,
      "GAME OVER",
      "80px Signika",
      550,
      500,
      "black"
    );
  }
}
