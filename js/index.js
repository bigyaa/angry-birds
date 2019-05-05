var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ground = new Rectangle(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
var obstacle1 = new Wood(1200, GROUND_Y - WOOD_HEIGHT);
var obstacle2 = new Wood(1230, GROUND_Y - WOOD_HEIGHT);
var obstacle3 = new Wood(1260, GROUND_Y - WOOD_HEIGHT);

var sling = new Sling(initialBirdX, initialBirdY);
var bird = new Bird(initialBirdX, initialBirdY, sling);

var inputHandler = new InputHandler(bird);

var background = new Image();
background.src = "./images/background.png";

var sound = new Audio("./sounds/angry-birds.mp3");

setInterval(function gameLoop() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);
  // sound.play();

  ground.show(context);
  obstacle1.show(context);
  obstacle2.show(context);
  obstacle3.show(context);
  bird.show(context);
  sling.showSling(context);

  if (inputHandler.spaceBar) {
    bird.launch();
  }

}, 1000 / 60);

