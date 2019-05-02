var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ground = new Wood(0, GAME_HEIGHT - 20, GAME_WIDTH, GAME_HEIGHT - 20);
var obstacle = new Wood(1000, 545, 15, 80);
var projectile = new Projectile(initialBirdX, initialBirdY, 100, 590);
var bird = new Bird(initialBirdX, initialBirdY, 20, projectile);

new InputHandler(bird, gameLoop);

function game() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ground.show(context);
  obstacle.show(context);
  bird.show(context);
  bird.launch();
}

function gameLoop() {
  game();

  requestAnimationFrame(gameLoop);
}

game();


