class Ground extends Rectangle {
  constructor(posX, posY, width, height, color) {
    super(posX, posY, width, height, color);
    this.hit = 0;
  }

  reflectCollidingCircle(element) {
    this.projectile = new Projectile(
      element.newAngle,
      element.initialVelocity / 2
    );

    if (element instanceof Bird) {
      element.birdImage.src = "./images/bird-hit1.png";
    }

    // limit the frame of bounce effect
    while (this.hit < 50) {
      element.position.x += this.projectile.horizontalVelocity() * FRICTION;
      element.position.y += this.projectile.verticalVelocity() * FRICTION;

      this.hit++;
    }
  }
}
