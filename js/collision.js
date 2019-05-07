
function checkCircleToRectangleCollision(circle, rectangle) {
  if (circle.position.x + circle.radius >= rectangle.vertices.firstPoint.x &&
    circle.position.x - circle.radius < rectangle.vertices.thirdPoint.x &&
    circle.position.y + circle.radius >= rectangle.vertices.firstPoint.y &&
    circle.position.y + circle.radius <= rectangle.vertices.fourthPoint.y) {

    return true;
  } else {

    return false;
  }
}

function checkCircleToCircleCollision(bird, pig) {
  if (distance(bird.position.x, bird.position.y, pig.position.x, pig.position.y) <= (bird.radius + pig.radius)) {

    return true;
  } else {

    return false;
  }
}

function handleBirdToObstacleCollision(bird, obstacle) {
  if (checkCircleToRectangleCollision(bird, obstacle)) {

    // Make the collided obstacle disappear
    // obstacles.splice(obstacles.indexOf(obstacle), 1);

    obstacle.initProjectile(bird);
    obstacle.launch();
  }
}

function handleBirdToPigCollision(bird, pig) {
  if (checkCircleToCircleCollision(bird, pig)) {

    pig.initProjectile(bird);
    pig.launch();
    pig.pigImage.src = "./images/pig_hit-1.png";
  }
}
