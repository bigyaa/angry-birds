/**
 * Calculates the angle in radians between two positions.
 * @param {number} initialPosX - The initial x-coordinate.
 * @param {number} initialPosY - The initial y-coordinate.
 * @param {number} finalPosX - The final x-coordinate.
 * @param {number} finalPosY - The final y-coordinate.
 * @returns {number} The angle in radians.
 */
function getTrajectoryAngle(initialPosX, initialPosY, finalPosX, finalPosY) {
  let dX = finalPosX - initialPosX;
  let dY = finalPosY - initialPosY;

  // Handle the case where dX is 0 to avoid division by zero
  if (dX === 0) {
    return dY > 0 ? Math.PI / 2 : -Math.PI / 2;
  }

  return Math.atan2(dY, dX); // atan2 handles all quadrants correctly
}

/**
 * Checks if a value is between a given range.
 * @param {number} min - The minimum bound.
 * @param {number} max - The maximum bound.
 * @param {number} value - The value to check.
 * @returns {boolean} True if the value is between min and max, false otherwise.
 */
function isBetween(min, max, value) {
  return value >= min && value <= max;
}

/**
 * Calculates the Euclidean distance between two points.
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Converts an angle from radians to degrees.
 * @param {number} angleInRadian - The angle in radians.
 * @returns {number} The angle in degrees.
 */
function getAngleInDegree(angleInRadian) {
  return (angleInRadian * 180) / Math.PI;
}

/**
 * Converts an angle from degrees to radians.
 * @param {number} angleInDegree - The angle in degrees.
 * @returns {number} The angle in radians.
 */
function getAngleInRadian(angleInDegree) {
  return (angleInDegree * Math.PI) / 180;
}

/**
 * Generates an array of integers between two values, inclusive.
 * @param {number} start - The starting value.
 * @param {number} end - The ending value.
 * @returns {number[]} An array of integers from start to end.
 */
function getRangeValues(start, end) {
  const ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Displays text on a given canvas context.
 * @param {CanvasRenderingContext2D} context - The canvas context.
 * @param {string} text - The text to display.
 * @param {string} font - The font style (e.g., '20px Arial').
 * @param {number} x - The x-coordinate where the text will be displayed.
 * @param {number} y - The y-coordinate where the text will be displayed.
 * @param {string} color - The color of the text.
 */
function showText(context, text, font, x, y, color) {
  context.fillStyle = color;
  context.font = font;
  context.fillText(text, x, y);
}
