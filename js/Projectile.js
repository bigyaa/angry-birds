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


  // v=usin0t+(1/2)gt2
  get verticalVelocity() {

    return (this.verticalDistance() * this.time) + (0.5 * GRAVITY * this.time * this.time);

  }


  get horizontalVelocity() {

    return this.horizontalDistance() * this.time;

  }


  updateData(angle) {
    this.angle = angle;
  }
}




