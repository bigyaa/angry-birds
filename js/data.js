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

const SLING_WIDTH = 100;
const SLING_HEIGHT = 210;

const OBSTACLE_POPULATION = 7;
NUM_OF_VERTICAL_OBSTACLES = 4;

const OBSTACLE_POSITION = {
  x: [800, 900, 1000, 1100, 1200],
  y: [GROUND_Y, GROUND_Y, GROUND_Y, GROUND_Y, GROUND_Y - 170]
};

const PIG_RADIUS = 37.5;
const PIG_POPULATION = 3;
const PIG_POSITION = {
  x: [862, 962, 1062],
  y: [GROUND_Y - PIG_RADIUS]
};
const PIG_SIZE = {
  width: 75,
  height: 75
}

const GRAVITY = 2;
const FRICTION = 0.02;
const TIME_DIFFERENCE = 0.075;

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
};

let pigVanishingImages = [
  "./images/cloud-cushy-dark.png",
  "./images/cloud-dark.png",
  "./images/cloud-dark-vanish.png"
];

let birdVanishingImages = [
  ".images/cloud-white.png",
  ".images/cloud-white-another.png",
  ".images/cloud-white-vanish.png"
];

let score = 0;



