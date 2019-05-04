var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ground = new Rectangle(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
var obstacle = new Rectangle(1000, GAME_HEIGHT - 205, 15, 80, '#946');
var slingshot = new Slingshot(initialBirdX, initialBirdY);
var bird = new Bird(initialBirdX, initialBirdY, 20, slingshot);

var inputHandler = new InputHandler(bird);

var background = new Image();
background.src = "./images/background.png";

setInterval(function gameLoop() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);

  ground.show(context);
  obstacle.show(context);
  bird.show(context);
  slingshot.showSlingShot(context);

  ground.detectBirdCollision(bird);
  obstacle.detectBirdCollision(bird);

  if (inputHandler.spaceBar) {
    bird.launch();
  }

}, 1000 / 60);

