class Projectile {

  constructor(angle, initialVelocity) {

    this.initialVelocity = initialVelocity;
    this.time = 1;
    this.angle = angle;
  }

  // y=usin0
  verticalDistance() {

    return (this.initialVelocity * Math.sin(this.angle));

  }

  // x=ucos0
  horizontalDistance() {

    return (this.initialVelocity * Math.cos(this.angle));

  }

  get verticalVelocity() {

    return this.verticalDistance() + (GRAVITY * this.time);

  }

  get horizontalVelocity() {

    return this.horizontalDistance();

  }

  updateData(angle) {
    this.angle = angle;
  }
}




