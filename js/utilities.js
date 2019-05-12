function getTrajectoryAngle(
  initialPosX,
  initialPosY,
  finalPosX,
  finalPosY
) {
  let dX = finalPosX - initialPosX;
  let dY = finalPosY - initialPosY;

  return Math.atan(dY / dX);

}


function isBetween(min, max, inclusive) {
  (inclusive >= min && inclusive < max) ?
    true :
    false;
}


function getDistance(x1, y1, x2, y2) {

  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
  );

}


function getAngleInDegree(angleInRadian) {

  return (180 / Math.PI) * angleInRadian;

}


function getAngleInRadian(angleInDegree) {

  return (Math.PI / 180) * angleInDegree;

}


function getRangeValues(start, end) {
  var ans = [];

  for (let i = start; i <= end; i++) {
    ans.push(i);
  }

  return ans;

}


function getRandomInt(min, max) {

  return Math.floor(Math.random() * (max - min) + min);

}


function showText(context, text, font, x, y, color) {
  context.fillStyle = color;
  context.font = font;
  context.fillText(text, x, y);
}
