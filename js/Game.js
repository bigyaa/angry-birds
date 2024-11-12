import InputHandler from './InputHandler.js';

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
    this.ground = new Ground(GROUND_X, GROUND_COLOR, GAME_WIDTH, GROUND_Y);
    this.sling = new Sling(INITIAL_BIRD_X, INITIAL_BIRD_Y);

    // Add birds, pigs, and obstacles
    this.addBirds();
    this.addPigsAndObstacles();

    this.inputHandler = new InputHandler(this.birds[0], this);
    this.startGameLoop();
  }

  /**
   * Adds birds to the game.
   */
  addBirds() {
    for (let i = 0; i < BIRD_POPULATION; i++) {
      const bird = new Bird(INITIAL_BIRD_X, INITIAL_BIRD_Y, this.sling);
      this.birds.push(bird);
    }
  }

  /**
   * Adds pigs and obstacles to the game.
   */
  addPigsAndObstacles() {
    for (let i = 0; i < PIG_POPULATION; i++) {
      // Add pigs
      const pigX = PIG_POSITION.x[0];
      const pigY = PIG_POSITION.y[i];
      const pig = new Pig(pigX, pigY);
      this.pigs.push(pig);

      // Add corresponding obstacles below the pig
      const obstacleX = OBSTACLE_POSITION.x[0];
      const obstacleY = OBSTACLE_POSITION.y[i];
      const obstacle = new Obstacle(obstacleX, obstacleY, 'stone');
      this.obstacles.push(obstacle);
    }
  }

  /**
   * Starts the main game loop.
   */
  startGameLoop() {
    this.draw();

    if (this.spaceBarPressed && !this.birdInAir && this.birds.length > 0) {
      this.birdInAir = this.birds.shift();
      this.birdInAir.launch();
      this.inputHandler.updateInputHandler(this.birdInAir);
    }

    this.handleCollisions();

    if (this.birds.length === 0 && this.birdInAir === null) {
      this.addBirds();
    }

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

    showText(this.context, `SCORE: ${this.score}`, '30px Signika', 20, 50, 'white');
    showText(this.context, `HIGH SCORE: ${this.highScore}`, '30px Signika', GAME_WIDTH - 300, 50, 'white');

    this.ground.show(this.context);

    if (this.birdInAir) {
      this.sling.drawSlingElasticBack(this.context, this.birdInAir.position.x, this.birdInAir.position.y);
      this.birdInAir.show(this.context);
      this.sling.drawSlingElasticFront(this.context, this.birdInAir.position.x, this.birdInAir.position.y);
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
      for (let pig of this.pigs) {
        if (checkCircleToCircleCollision(this.birdInAir, pig)) {
          pig.collision = true;
          this.score += 10;
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

      for (let obstacle of this.obstacles) {
        if (checkCircleToRectangleCollision(this.birdInAir, obstacle)) {
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

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