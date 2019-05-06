const GAME_WIDTH = window.innerWidth - 20;
const GAME_HEIGHT = window.innerHeight - 20;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACEBAR = 32;

const GROUND_X = 0;
const GROUND_Y = GAME_HEIGHT - 130;

const OBSTACLE_HEIGHT = 90;
const OBSTACLE_WIDTH = 25;
const NUM_OF_OBSTACLES = 4;
const OBSTACLE_POSITION = {
  x: [1200, 1240, 1280, 2200],
  y: [GROUND_Y - OBSTACLE_HEIGHT]
};

const GRAVITY = 8;

