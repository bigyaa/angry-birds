const GAME_WIDTH = window.innerWidth - 20;
const GAME_HEIGHT = window.innerHeight - 20;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACEBAR = 32;

const GROUND_X = 0;
const GROUND_Y = GAME_HEIGHT - 130;

const INITIAL_BIRD_X = 250;
const INITIAL_BIRD_Y = 365;
const INITIAL_BIRD_VELOCITY = 1.75;

const BIRD_RADIUS = 30;
const BIRD_POPULATION = 3;
const BIRD_STRETCH_LIMIT = 160;

const OBSTACLE_POPULATION = 7;
const OBSTACLE_POSITION = {
  x: [800, 900, 1000, 1100],
  y: [GROUND_Y]
};

const PIG_RADIUS = 37.5;
const PIG_POPULATION = 2;
const PIG_POSITION = {
  x: [862, 962],
  y: [GROUND_Y - PIG_RADIUS]
};
const PIG_SIZE = {
  width: 75,
  height: 75
}

const GRAVITY = 2;
const FRICTION = 0.02;
const AIR_RESISTANCE = 0.075;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let releaseBird = 0;

let woodImageType = {
  vertical: {
    src: "./images/wood-vertical.png",
    width: 25,
    height: 90
  },
  horizontal: {
    src: "./images/wood-horizontal.png",
    width: 100,
    height: 25
  }
}




