class Projectile {
  constructor(initialPosX, initialPosY, finalPosX, finalPosY, initialVelocity = 19) {
    this.initialPosition = {
      x: initialPosX,
      y: initialPosY,
    };

    this.finalPosition = {
      x: finalPosX,
      y: finalPosY,
    };

    this.initialVelocity = initialVelocity;

    this.angle = getTrajectoryAngle(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y) /* 20 * Math.PI / 180 */;
    console.log(this.angle);

    this.time = 0.3;
  }

  // y=usin0t-(1/2)gt2
  upwardVerticalDisplacement() {
    return (this.initialVelocity * Math.sin(this.angle) * this.time) - (0.5 * GRAVITY * Math.pow(this.time, 2)); /* +3 */
  }

  // y=usin0t+(1/2)gt2
  downwardVerticalDisplacement() {
    return (this.initialVelocity * Math.sin(this.angle) * this.time) + (0.5 * GRAVITY * Math.pow(this.time, 2)); /* -4.25 */
  }

  // x=ucos0t
  horizontalDisplacement() {
    return (this.initialVelocity * Math.cos(this.angle) * this.time);
  }
}




