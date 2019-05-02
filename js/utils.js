function getTrajectoryAngle(initialPosX, initialPosY, finalPosX, finalPosY) {
  let dX = finalPosX - initialPosX;
  let dY = finalPosY - initialPosY;

  return Math.atan(dY / dX);
}

