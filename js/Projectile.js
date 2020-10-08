class Projectile {
  constructor(angle, initialVelocity) {
    this.initialVelocity = initialVelocity;
    this.time = 1;
    this.angle = angle;

    this.fixAngle();
  }

  fixAngle() {
    if (getAngleInDegree(this.angle) < 0) {
      this.angle += getAngleInRadian(180);
    }
  }

  // y=usin0
  get verticalDistance() {
    return this.initialVelocity * Math.sin(this.angle);
  }

  // x=ucos0
  get horizontalDistance() {
    return this.initialVelocity * Math.cos(this.angle);
  }

  // v=usin0t+(1/2)gt2
  get verticalVelocity() {
    return (
      this.verticalDistance * this.time + 0.5 * GRAVITY * this.time * this.time
    );
  }

  get horizontalVelocity() {
    return this.horizontalDistance * this.time;
  }

  updateData(angle) {
    this.angle = angle;
  }
}
