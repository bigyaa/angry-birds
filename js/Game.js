// const GROUND_COLOR = 'rgb(188,212,56)';
// const GAME_WIDTH = 1200;
// const GAME_HEIGHT = 600;
// const GROUND_Y = GAME_HEIGHT - 20;
// const GRAVITY = 9.8;
import Bird from './Bird.js';
import { checkCircleToCircleCollision, checkCircleToRectangleCollision } from './collision.js';

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

    // Initialize ground and input handler
    this.ground = new Ground(0, GROUND_COLOR, GAME_WIDTH, GROUND_Y);
    this.sling = new Sling();
    this.addNewBird();

    this.inputHandler = new InputHandler(this.birds[0], this);
    this.startGameLoop();
  }

  /**
   * Adds a new bird to the game.
   */
  addNewBird() {
    const newBird = new Bird();
    this.birds.push(newBird);
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
      this.addNewBird();
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

class InputHandler {
  constructor(birdObject, game) {
    this.bird = birdObject;
    this.game = game;
    this.mouseIsDragging = false;

    document.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;
      this.mouseIsDragging = true;
    });

    document.addEventListener('mousemove', (event) => {
      if (this.mouseIsDragging) {
        this.handleMouseMove(event);
      }
    });

    document.addEventListener('mouseup', () => {
      this.mouseIsDragging = false;
    });
  }

  updateInputHandler(newBird) {
    this.bird = newBird;
  }

  handleMouseMove(event) {
    if (this.mouseIsDragging && this.bird.listen) {
      this.bird.position.x = event.pageX;
      this.bird.position.y = event.pageY;
    }
  }
}
