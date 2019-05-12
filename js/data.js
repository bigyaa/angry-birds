const GAME_WIDTH = window.innerWidth - 10;
const GAME_HEIGHT = window.innerHeight - 10;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const SPACEBAR = 32;
const ENTER = 13;

const GROUND_X = 0;
const GROUND_Y = GAME_HEIGHT - 130;

const SLING_WIDTH = 100;
const SLING_HEIGHT = 210;

const BIRD_RADIUS = 30;
const BIRD_POPULATION = 4;
const BIRD_STRETCH_LIMIT = 160;

const INITIAL_BIRD_X = 250;
const INITIAL_BIRD_Y = GROUND_Y - SLING_HEIGHT + BIRD_RADIUS;
const INITIAL_BIRD_VELOCITY = 1.75;

const PIG_RADIUS = 35;
const PIG_POPULATION = 4;
const PIG_POSITION = {
  x: [600],
  y: [
    GROUND_Y - PIG_RADIUS - 200,
    GROUND_Y - PIG_RADIUS - 400,
    GROUND_Y - PIG_RADIUS - 200,
    GROUND_Y - PIG_RADIUS - 300,
    GROUND_Y - PIG_RADIUS - 500]
};
const PIG_SIZE = {
  width: 75,
  height: 75
}

const OBSTACLE_POPULATION = PIG_POPULATION;

const OBSTACLE_POSITION = {
  x: [PIG_POSITION.x - 45],
  y: [
    GROUND_Y + PIG_RADIUS - 200,
    GROUND_Y + PIG_RADIUS - 400,
    GROUND_Y + PIG_RADIUS - 200,
    GROUND_Y + PIG_RADIUS - 300,
    GROUND_Y + PIG_RADIUS - 500]
};

const SPACE_BETWEEN_OBSTACLES = 150;

const GRAVITY = 2;
const FRICTION = 0.02;
const TIME_DIFFERENCE = 0.075;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let obstacleImageType = {
  vertical: {
    src: "./images/wood-vertical.png",
    width: 25,
    height: 90
  },
  horizontal: {
    src: "./images/wood-horizontal.png",
    width: 100,
    height: 25
  },
  stone: {
    src: "./images/stone1.png",
    width: 100,
    height: 30
  }
};

let pigVanishingImages = [
  "./images/cloud-cushy-dark.png",
  "./images/cloud-dark.png",
  "./images/cloud-dark-vanish.png"
];




