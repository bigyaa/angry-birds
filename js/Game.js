import InputHandler from "./InputHandler.js";
export default class Game {
  static resetButton = document.getElementById('resetButton');

  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.background = new Image();
    this.background.src = './images/background.png';
    this.audioGameOver = new Audio('./sounds/game-over.mp3');
    this.resetButton = Game.resetButton;

    this.obstacles = [];
    this.pigs = [];
    this.birds = [];
    this.defeatedBirds = [];
    this.sling = null;
    this.birdInAir = null;
    this.score = 0;
    this.highScore = 0;
    this.gameOver = false;
    this.spaceBarPressed = false;
    this.reset = false;
    this.animation = null;

    this.init();
  }

  /**
   * Initializes the game state and sets up the environment.
   */
  init() {
    this.resetButton.style.display = 'none';
    this.score = 0;
    this.birdInAir = null;
    this.birds = [];
    this.defeatedBirds = [];
    this.obstacles = [];
    this.pigs = [];
    this.gameOver = false;
    this.spaceBarPressed = false;

    // Initialize ground and sling
    this.ground = new Ground(0, GROUND_COLOR, GAME_WIDTH, GROUND_Y);
    this.sling = new Sling();

    this.createObstaclesAndPigs();
    this.addNewBird();

    this.inputHandler = new InputHandler(this.birds[0], this);
    this.startGameLoop();
  }

  /**
   * Adds a new bird to the game.
   */
  addNewBird() {
    const newBird = new Bird(this.sling);
    this.birds.push(newBird);
  }

  /**
   * Creates obstacles and places pigs on top of them.
   */
  createObstaclesAndPigs() {
    const numPigs = 3; // Number of pigs to create
    for (let i = 0; i < numPigs; i++) {
      const obstaclePosX = getRandomInt(100, GAME_WIDTH - 200);
      const obstaclePosY = GROUND_Y - 350;

      const obstacle = new Obstacle(obstaclePosX, obstaclePosY, 'stone');
      this.obstacles.push(obstacle);

      // Place a pig on top of the obstacle
      const pigPosX = obstaclePosX + obstacle.width / 2;
      const pigPosY = obstaclePosY - PIG_RADIUS;
      const pig = new Pig(pigPosX, pigPosY);
      this.pigs.push(pig);
    }
  }

  /**
   * Starts the main game loop.
   */
  startGameLoop() {
    this.draw();

    // Handle bird launch if space bar is pressed
    if (this.spaceBarPressed && !this.birdInAir && this.birds.length > 0) {
      this.birdInAir = this.birds.shift();
      this.birdInAir.launch();
      this.inputHandler.updateInputHandler(this.birdInAir);
      this.addNewBird(); // Add a new bird immediately after launching
    }

    this.handleCollisions();

    if (this.gameOver) {
      this.showGameOverScreen();
    } else {
      this.animation = requestAnimationFrame(() => this.startGameLoop());
    }
  }

  /**
   * Draws all game elements on the canvas.
   */
  draw() {
    this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    this.context.drawImage(this.background, 0, 0, GAME_WIDTH, GROUND_Y);

    showText(
      this.context,
      `SCORE: ${this.score}`,
      '30px Signika',
      20,
      50,
      'white'
    );
    showText(
      this.context,
      `HIGH SCORE: ${this.highScore}`,
      '30px Signika',
      GAME_WIDTH - 300,
      50,
      'white'
    );

    this.ground.show(this.context);

    if (this.birdInAir) {
      this.sling.drawSlingElasticBack(
        this.context,
        this.birdInAir.position.x,
        this.birdInAir.position.y
      );
      this.birdInAir.show(this.context);
      this.sling.drawSlingElasticFront(
        this.context,
        this.birdInAir.position.x,
        this.birdInAir.position.y
      );
    }

    this.obstacles.forEach((obstacle) => obstacle.show(this.context));
    this.pigs.forEach((pig) => pig.show(this.context));
    this.defeatedBirds.forEach((bird) => bird.show(this.context));

    this.sling.showSling(this.context);
  }

  /**
   * Handles collisions between birds, pigs, and obstacles.
   */
  handleCollisions() {
    if (this.birdInAir) {
      // Check collision with pigs
      for (let pig of this.pigs) {
        if (checkCircleToCircleCollision(this.birdInAir, pig) && !pig.collision) {
          pig.handlePigCollision(this.birdInAir, 1);
          this.score += 50;
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

      // Check collision with obstacles
      for (let obstacle of this.obstacles) {
        if (checkCircleToRectangleCollision(this.birdInAir, obstacle)) {
          obstacle.handleObstacleCollision(this.birdInAir, 1);
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

      // Check if bird hits the ground or goes out of bounds
      if (
        this.birdInAir.position.y + this.birdInAir.radius >= GROUND_Y ||
        this.birdInAir.position.y < 0 ||
        this.birdInAir.position.x > GAME_WIDTH
      ) {
        this.defeatedBirds.push(this.birdInAir);
        this.birdInAir = null;
      }
    }
  }

  /**
   * Resets the game and updates the score.
   */
  resetGame() {
    this.updateScore();
    this.resetButton.style.display = 'none';
    this.init();
  }

  /**
   * Updates the high score.
   */
  updateScore() {
    this.highScore = Math.max(this.highScore, this.score);
  }

  /**
   * Displays the game over screen.
   */
  showGameOverScreen() {
    this.audioGameOver.play();
    showText(this.context, 'GAME OVER', '80px Signika', 550, 500, 'black');
    this.resetButton.style.display = 'block';
    this.resetButton.onclick = () => {
      this.resetGame();
    };
  }
}
