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
  if ((inBetween(
    rectangle1.vertices.firstPoint.x,
    rectangle1.vertices.secondPoint.x,
    rectangle2.vertices.firstPoint.x) ||
    inBetween(
      rectangle1.vertices.firstPoint.x,
      rectangle1.vertices.secondPoint.x,
      rectangle2.vertices.secondPoint.x)) &&
    rectangle1.vertices.fourthPoint.y > rectangle2.vertices.firstPoint.y
  ) {
    return true;
  } else {
    return false;
  }
}

function handleVerticalRectangleToRectangleCollision(rectangle1, rectangle2) {
  if (!checkVerticalRectangleToRectangleCollision(rectangle1, rectangle2)) {
    while (rectangle1.positionY < rectangle2.positionY) {
      rectangle1.positionY += 2;
    }
  }
}

function handleBirdToObstacleCollision(bird, obstacle) {

  // Make the collided obstacle disappear
  // obstacles.splice(obstacles.indexOf(obstacle), 1);

  if (bird.collision) {
    bird.initProjectile();
    bird.handleCollision();
  }

  if (obstacle.collision) {
    obstacle.initProjectile(bird);
    obstacle.launch();
  }

  if (!bird.collision &&
    !obstacle.collision) {
    angryBirds.birdCollidedWithObstacle = false;
  }
}

function handleBirdToPigCollision(bird, pig) {
  if (pig.collision) {
    pig.initProjectile(bird);
    pig.launch();
    pig.update();
  }

  if (bird.collision) {
    bird.initProjectile();
    bird.handleCollision();
  }

  if (!pig.collision &&
    !bird.collision) {
    angryBirds.birdCollidedWithPig = false;
  }
}
// }


function handleBirdToGroundCollision(bird, ground) {
  if (checkCircleToRectangleCollision(bird, ground)) {
    // bounce effect
    // ground.reflectCollidingCircle(bird);
  }
}


function handlePigToObstacleCollision(pig, obstacle) {
  if (pig.initialVelocity &&
    obstacle.collision
  ) {
    obstacle.initProjectile(pig);
    obstacle.launch();
  }
}

function handleObstacleToObstacleCollision(obstacle1, obstacle2) {
  if (!checkRectangleToRectangleCollision(obstacle1, obstacle2)) {

    // obstacle1.posX -= 2;
  }
}
