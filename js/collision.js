/**
 * Checks if a circle collides with a rectangle.
 * @param {Object} circle - The circle object with position and radius.
 * @param {Object} rectangle - The rectangle object with vertices.
 * @returns {boolean} - True if the circle collides with the rectangle, false otherwise.
 */
function checkCircleToRectangleCollision(circle, rectangle) {
  if (
    circle.position.x + circle.radius >= rectangle.vertices.firstPoint.x &&
    circle.position.x - circle.radius <= rectangle.vertices.thirdPoint.x &&
    circle.position.y + circle.radius >= rectangle.vertices.firstPoint.y &&
    circle.position.y - circle.radius <= rectangle.vertices.fourthPoint.y
  ) {
    return true;
  }
  return false;
}

/**
 * Checks if two circles collide.
 * @param {Object} circle1 - The first circle object with position and radius.
 * @param {Object} circle2 - The second circle object with position and radius.
 * @returns {boolean} - True if the circles collide, false otherwise.
 */
function checkCircleToCircleCollision(circle1, circle2) {
  if (
    getDistance(
      circle1.position.x,
      circle1.position.y,
      circle2.position.x,
      circle2.position.y
    ) <=
    circle1.radius + circle2.radius
  ) {
    return true;
  }
  return false;
}

/**
 * Checks if two rectangles collide.
 * @param {Object} rectangle1 - The first rectangle object with vertices.
 * @param {Object} rectangle2 - The second rectangle object with vertices.
 * @returns {boolean} - True if the rectangles collide, false otherwise.
 */
function checkRectangleToRectangleCollision(rectangle1, rectangle2) {
  if (
    rectangle1.vertices.thirdPoint.x >= rectangle2.vertices.firstPoint.x &&
    rectangle1.vertices.firstPoint.x <= rectangle2.vertices.thirdPoint.x &&
    rectangle1.vertices.thirdPoint.y >= rectangle2.vertices.firstPoint.y &&
    rectangle1.vertices.firstPoint.y <= rectangle2.vertices.thirdPoint.y
  ) {
    return true;
  }
  return false;
}

/**
 * Checks if a vertical rectangle collides with another rectangle.
 * @param {Object} rectangle1 - The first rectangle object with vertices.
 * @param {Object} rectangle2 - The second rectangle object with vertices.
 * @returns {boolean} - True if the rectangles collide, false otherwise.
 */
function checkVerticalRectangleToRectangleCollision(rectangle1, rectangle2) {
  if (
    (isBetween(
      rectangle1.vertices.firstPoint.x,
      rectangle1.vertices.secondPoint.x,
      rectangle2.vertices.firstPoint.x
    ) ||
      isBetween(
        rectangle1.vertices.firstPoint.x,
        rectangle1.vertices.secondPoint.x,
        rectangle2.vertices.secondPoint.x
      )) &&
    rectangle1.vertices.fourthPoint.y > rectangle2.vertices.firstPoint.y
  ) {
    return true;
  }
  return false;
}
