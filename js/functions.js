
function generateObstacles() {
  /* woodImageType [vertical, horizontal][src, width,height] */
  for (let i = 0; i < OBSTACLE_POPULATION; i++) {
    if (i < 4) {
      obstacles[i] = new Wood(
        OBSTACLE_POSITION.x[i],
        OBSTACLE_POSITION.y[0] - (woodImageType["vertical"]["height"]),
        "vertical"
      );
    } else {
      obstacles[i] = new Wood(
        OBSTACLE_POSITION.x[i - 4] + 0.5 * woodImageType["vertical"]["width"],
        OBSTACLE_POSITION.y[0] - (woodImageType["horizontal"]["height"] + woodImageType["vertical"]["height"]),
        "horizontal"
      );
    }
  }
}

function generatePigs() {
  for (let i = 0; i < PIG_POPULATION; i++) {
    pigs[i] = new Pig(PIG_POSITION.x[i], PIG_POSITION.y[0]);
  }
}

/* function pigAnimate(i) {
  let framesSrc = [
    "./images/pig_hit2-roll-1.png",
    "./images/pig_hit2-roll-1.png",
    "./images/pig_hit2-roll-1.png",
    "./images/pig_hit2-roll-1.png",
    "./images/pig_hit2-roll-1.png"
  ];

  return (framesSrc[i]);
} */
