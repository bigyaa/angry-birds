const GAME_WIDTH = window.innerWidth - 20;
const GAME_HEIGHT = window.innerHeight - 20;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACEBAR = 32;

const GROUND_X = 0;
const GROUND_Y = GAME_HEIGHT - 130;
const BIRD_RADIUS = 30;

const OBSTACLE_HEIGHT = 90;
const OBSTACLE_WIDTH = 25;
const OBSTACLE_POPULATION = 4;
const OBSTACLE_POSITION = {
  x: [800, 850, 900, 950],
  y: [GROUND_Y - OBSTACLE_HEIGHT]
};

const PIG_RADIUS = 37.5;
const PIG_POPULATION = 2;
const PIG_POSITION = {
  x: [850, 1100],
  y: [GROUND_Y - 2 * PIG_RADIUS]
};
const PIG_SIZE = {
  width: 75,
  height: 75
}

const GRAVITY = 8;

