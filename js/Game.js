// Main Execution
class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');

    this.sound = new Audio("./sounds/angry-birds.mp3");
    this.background = new Image();
    this.background.src = "./images/background.png";

    this.obstacles = [];
    this.bird = [];
    this.pigs = [];
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

    this.sling = new Sling(
      initialBirdX,
      initialBirdY
    );

    // Position in terms of the centre of the bird
    for (let i = 0; i < BIRD_POPULATION; i++) {
      if (i === 0) {
        this.bird[i] = new Bird(
          initialBirdX,
          initialBirdY,
          this.sling
        );
      } else {
        this.bird[i] = new Bird(
          initialBirdX - i * 80,
          initialBirdY + 160,
          this.sling
        );
      }
    }

    this.inputHandler = new InputHandler(this.bird[0]);

    this.generateObstacles();
    this.generatePigs();

  }

  generateObstacles() {
    /* woodImageType [vertical, horizontal][src, width,height] */
    for (let i = 0; i < OBSTACLE_POPULATION; i++) {

      if (i < 4) {
        this.obstacles[i] = new Wood(
          OBSTACLE_POSITION.x[i],
          OBSTACLE_POSITION.y[0] - (woodImageType["vertical"]["height"]),
          "vertical"
        );

      } else {

        this.obstacles[i] = new Wood(
          OBSTACLE_POSITION.x[i - 4] + 0.5 * woodImageType["vertical"]["width"],
          OBSTACLE_POSITION.y[0] - (woodImageType["horizontal"]["height"] + woodImageType["vertical"]["height"]),
          "horizontal"
        );
      }
    }
  }

  generatePigs() {
    for (let i = 0; i < PIG_POPULATION; i++) {
      this.pigs[i] = new Pig(PIG_POSITION.x[i], PIG_POSITION.y[0]);
    }
  }

  main() {
    // this.sound.play();

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

    this.ground.show(this.context);

    for (let i = 0; i < BIRD_POPULATION; i++) {
      this.bird[i].show(this.context);
    }

    this.sling.showSling(this.context);

    for (let obstacle of this.obstacles) {
      obstacle.show(this.context);
      handleBirdToObstacleCollision(this.bird[0], obstacle);
    }

    for (let pig of this.pigs) {
      pig.show(this.context);
      handleBirdToPigCollision(this.bird[0], pig);
    }

    for (let pig of this.pigs) {
      for (let obstacle of this.obstacles) {
        handlePigToObstacleCollision(pig, obstacle);
      }
    }

    // handleBirdToGroundCollision(this.bird[0], ground);

    /*     for (let obstacle1 in this.obstacles) {
          for (let obstacle2 in this.obstacles) {
            if (this.obstacles[obstacle1] !== this.obstacles[obstacle2]) {

              // checkRectangleToRectangleCollision(obstacle, this.obstacles[n]);

              if (!checkVerticalRectangleToRectangleCollision(this.obstacles[obstacle1], this.obstacles[obstacle2])) {
                console.log("Condition met")
                // obstacle.fall();
                // this.obstacles[n].fall();
              }
            }
          }
        } */

    if (releaseBird) {
      this.bird[0].launch();
    }

    requestAnimationFrame(() => this.main());
  }
}
