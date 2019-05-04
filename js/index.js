var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ground = new Rectangle(GROUND_X, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - 20, 'rgb(188,212,56');
var obstacle = new Rectangle(1000, GAME_HEIGHT - 205, 15, 80, '#946');
var projectile = new Projectile(initialBirdX, initialBirdY, 100, 590);
var slingshot = new Slingshot(GAME_HEIGHT - 490, projectile);
var bird = new Bird(initialBirdX, initialBirdY, 20, projectile, slingshot);

new InputHandler(bird, gameLoop);

var background = new Image();
background.src = "./images/background.png";

function game() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(background, 0, 0, GAME_WIDTH, GROUND_Y);
  ground.show(context);
  obstacle.show(context);
  bird.show(context);
  ground.detectBirdCollision(bird);
  obstacle.detectBirdCollision(bird);
  // bird.launch();
}

var init = setInterval(game, 1000 / 60);

function gameLoop() {
  game();
  bird.launch();

  requestAnimationFrame(gameLoop);
}
