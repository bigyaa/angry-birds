const GAME_WIDTH = window.innerWidth - 20;
const GAME_HEIGHT = window.innerHeight - 20;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACEBAR = 32;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const GRAVITY = 10;

var initialBirdX = 350;
var initialBirdY = 360;

const GROUND_X = 0;
const GROUND_Y = GAME_HEIGHT - 130;
