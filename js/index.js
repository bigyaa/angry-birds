var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var ground = new Rectangle(0, GAME_HEIGHT - 135, GAME_WIDTH, GAME_HEIGHT - 20, '#32CD32');
var obstacle = new Rectangle(1000, GAME_HEIGHT - 205, 15, 80, '#946');
var projectile = new Projectile(initialBirdX, initialBirdY, 100, 590);
var bird = new Bird(initialBirdX, initialBirdY, 20, projectile);

new InputHandler(bird, gameLoop);

var background = new Image();
background.src = "./images/background.png";

function gameLoop() {
  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  context.drawImage(background, 0, 0, GAME_WIDTH, GAME_HEIGHT);
  ground.show(context);
  obstacle.show(context);
  bird.show(context);
  // bird.launch();

  requestAnimationFrame(gameLoop);
}

gameLoop();

