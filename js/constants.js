const GAME_WIDTH = window.innerWidth - 20;
const GAME_HEIGHT = window.innerHeight - 20;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const GRAVITY = 10;

var initialBirdX = 350;
var initialBirdY = 560;
var direction = 0;
