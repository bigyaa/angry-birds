function checkCircleToRectangleCollision(circle, rectangle) {
  if (circle.position.x + circle.radius >= rectangle.vertices.firstPoint.x &&
    circle.position.x - circle.radius <= rectangle.vertices.thirdPoint.x &&
    circle.position.y + circle.radius >= rectangle.vertices.firstPoint.y &&
    circle.position.y + circle.radius <= rectangle.vertices.fourthPoint.y) {

    return true;
  } else {

    return false;
  }
}


function checkCircleToCircleCollision(circle1, circle2) {
  if (distance(
    circle1.position.x,
    circle1.position.y,
    circle2.position.x,
    circle2.position.y) <= (circle1.radius + circle2.radius)
  ) {

    return true;
  } else {

    return false;
  }
}


function checkRectangleToRectangleCollision(rectangle1, rectangle2) {
  if (rectangle1.vertices.thirdPoint.x >= rectangle2.vertices.firstPoint.x &&
    rectangle1.vertices.firstPoint.x <= rectangle2.vertices.thirdPoint.x &&
    rectangle1.vertices.thirdPoint.y >= rectangle2.vertices.firstPoint.y &&
    rectangle1.vertices.firstPoint.y <= rectangle2.vertices.thirdPoint.y) {
    return true;
  } else {
    return false;
  }
}


function checkVerticalRectangleToRectangleCollision(rectangle1, rectangle2) {
  if (
    rectangle1.vertices.fourthPoint.y >= rectangle2.vertices.firstPoint.y
  ) {
    return true;
  } else {
    return false;
  }
}


function handleBirdToObstacleCollision(bird, obstacle) {
  if (checkCircleToRectangleCollision(bird, obstacle)) {

    // Make the collided obstacle disappear
    // obstacles.splice(obstacles.indexOf(obstacle), 1);

    // obstacle.hitCount++;
    obstacle.initProjectile(bird);
    obstacle.launch();
  }
}


function handleBirdToPigCollision(bird, pig) {
  if (checkCircleToCircleCollision(bird, pig)) {
    pig.hitCount++;
    pig.initProjectile(bird);
    pig.launch();
    pig.pigImage.src = "./images/pig_hit-1.png";
  }
}


function handleBirdToGroundCollision(bird, ground) {
  if (checkCircleToRectangleCollision(bird, ground)) {
    // bounce effect
    // ground.reflectCollidingCircle(bird);
  }
}


function handlePigToObstacleCollision(pig, obstacle) {
  if (pig.initialVelocity &&
    checkCircleToRectangleCollision(pig, obstacle)
  ) {
    obstacle.hitCount++;
    obstacle.initProjectile(pig);
    obstacle.launch();
  }
}
