class Projectile {
  constructor(initialPosX, initialPosY, finalPosX, finalPosY, initialVelocity) {
    this.initialPosition = {
      x: initialPosX,
      y: initialPosY,
    };

    this.finalPos = {
      x: finalPosX,
      y: finalPosY,
    };

    this.initialVelocity = initialVelocity;

    this.angle = getTrajectoryAngle(this.initialPosition.x, this.initialPosition.y, this.finalPos.x, this.finalPos.y) /* 20 * Math.PI / 180 */;

    // console.log(this.angle * 180 / Math.PI);

    this.time = 1;
  }

  // y=usin0
  verticalDistance() {
    return (this.initialVelocity * Math.sin(this.angle));
  }

  // x=ucos0
  horizontalDistance() {
    return (this.initialVelocity * Math.cos(this.angle));
  }

  // vy=u-at against gravity
  verticalVelocity() {
    return this.verticalDistance() - (GRAVITY * this.time);
  }

  horizontalVelocity() {
    return this.horizontalDistance();
  }
}




