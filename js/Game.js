class Game {
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

    // Initialize ground and input handler
    this.ground = new Ground(GROUND_X, GROUND_COLOR, GAME_WIDTH, GAME_HEIGHT - 20);
    this.inputHandler = new InputHandler(null, this);
    this.startGameLoop();
  }

  /**
   * Starts the main game loop.
   */
  startGameLoop() {
    this.draw();

    // Launch the bird if the spacebar is pressed and no bird is in the air
    if (this.spaceBarPressed && this.birdInAir === null && this.birds.length > 0) {
      this.birdInAir = this.birds.shift();
      this.birdInAir.launch();
      this.inputHandler.updateInputHandler(this.birdInAir, this);
    }

    // Handle collisions
    this.handleCollisions();

    // Check if the game is over
    if (this.birds.length === 0 && this.defeatedBirds.length === BIRD_POPULATION) {
      this.gameOver = true;
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

    this.obstacles.forEach(obstacle => obstacle.show(this.context));
    this.pigs.forEach(pig => pig.show(this.context));
    this.defeatedBirds.forEach(bird => bird.show(this.context));

    this.sling.showSling(this.context);
  }

  /**
   * Handles collisions between birds, pigs, and obstacles.
   */
  handleCollisions() {
    if (this.birdInAir) {
      // Check collision with pigs
      for (let pig of this.pigs) {
        if (checkCircleToCircleCollision(this.birdInAir, pig)) {
          pig.collision = true;
          this.score += 10;
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

      // Check collision with obstacles
      for (let obstacle of this.obstacles) {
        if (checkCircleToRectangleCollision(this.birdInAir, obstacle)) {
          this.defeatedBirds.push(this.birdInAir);
          this.birdInAir = null;
          break;
        }
      }

      // Check if bird hits the ground or goes out of bounds
      if (
        this.birdInAir.position.y + this.birdInAir.radius >= GROUND_Y ||
        this.birdInAir.position.y < 0 - this.birdInAir.radius ||
        this.birdInAir.position.x > GAME_WIDTH + this.birdInAir.radius
      ) {
        this.defeatedBirds.push(this.birdInAir);
        this.birdInAir = null;
      }
    }
  }

  /**
   * Resets the game.
   */
  resetGame() {
    this.reset = true;
    this.resetButton.style.display = 'none';
    this.updateScore();
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
    this.resetButton.onclick = () => this.resetGame();
  }
}