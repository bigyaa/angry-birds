function getTrajectoryAngle(initialPosX, initialPosY, finalPosX, finalPosY) {
  let dX = finalPosX - initialPosX;
  let dY = finalPosY - initialPosY;

  return Math.atan(dY / dX);
}

function inBetween(min, max, inclusive) {
  (inclusive >= min && inclusive <= max) ? true : false;
}

function distance(x1, y1, x2, y2) {

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
