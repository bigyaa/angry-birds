class Projectile {
  constructor(initialPosX, initialPosY, finalPosX, finalPosY) {
    this.initialPosition = {
      x: initialPosX,
      y: initialPosY,
    };
    this.position = {
      x: finalPosX,
      y: finalPosY,
    };
    this.angle = /* getTrajectoryAngle(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y) */Math.PI * 45 / 180;

    this.time = 0.2;
    this.initialVelocity = 2;
    this.maxHeightPos;

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.initialVelocity * Math.sin(this.angle)), 2) / (2 * GRAVITY);

    this.maxRange = Math.pow(this.initialVelocity, 2) * Math.sin(2 * this.angle) / GRAVITY;
  }


  changeDirection() {
    this.maxHeightPos = {
      x: this.maxRange / 2 + this.initialPosition.x,
      y: this.initialPosition.y - this.maxHeight,
    }

    if (this.position.x === this.maxHeightPos.x && this.position.y === this.maxHeightPos.y) {
      direction = 1;
    }
  }

  // y=usin0t+(1/2)gt2
  verticalDisplacement() {
    this.changeDirection();
    if (this.direction === 0) {
      return (this.initialVelocity * Math.sin(this.angle) * this.time) - (0.5 * GRAVITY * Math.pow(this.time, 2));
    } else {
      return (this.initialVelocity * Math.sin(this.angle) * this.time) + (0.5 * GRAVITY * Math.pow(this.time, 2));
    }
  }

  // x=ucos0t
  horizontalDisplacement() {
    return (this.initialVelocity * Math.cos(this.angle) * this.time);
  }
}




