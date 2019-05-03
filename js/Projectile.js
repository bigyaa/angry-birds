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

    this.angle = /* getTrajectoryAngle(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y) */Math.PI * 15 / 180;

    this.time = 0.2;
    this.initialVelocity = 9;
    this.maxHeightPos;

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.initialVelocity * Math.sin(this.angle)), 2) / (2 * GRAVITY);
    console.log(this.maxHeight);

    this.maxRange = Math.pow(this.initialVelocity, 2) * Math.sin(2 * this.angle) / GRAVITY;
    console.log(this.maxRange);

    this.maxHeightPos = {
      x: this.maxRange / 2 + this.position.x,
      y: this.position.y - this.maxHeight,
    }
    console.log(this.maxHeightPos);
  }


  changeDirection() {
    if (this.position.x >= this.maxHeightPos.x) { return true; } else { return false; }
  }

  // y=usin0t+(1/2)gt2
  verticalDisplacement() {
    if (this.changeDirection() == false) {
      return (this.initialVelocity * Math.sin(this.angle) * this.time) - (0.5 * GRAVITY * Math.pow(this.time, 2));
    } else {
      console.log(this.initialVelocity * Math.sin(this.angle) * this.time) + (0.5 * GRAVITY * Math.pow(this.time, 2));

      return (this.initialVelocity * Math.sin(this.angle) * this.time) + (0.5 * GRAVITY * Math.pow(this.time, 2) - 1);
    }
  }

  // x=ucos0t
  horizontalDisplacement() {
    // console.log(this.initialVelocity * Math.cos(this.angle) * this.time);
    return (this.initialVelocity * Math.cos(this.angle) * this.time);
  }
}




