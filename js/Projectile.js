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

  // vy=u-at against gravity
  verticalVelocity() {

    return this.verticalDistance() - (GRAVITY * this.time);

  }

  horizontalVelocity() {

    return this.horizontalDistance();

  }

  resetProjectile() {
    this.verticalVelocity = 0;
    this.horizontalVelocity = 0;
  }
}




