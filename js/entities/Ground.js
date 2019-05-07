class Ground extends Rectangle {
  constructor(posX, posY, width, height, color) {
    super(posX, posY, width, height, color);
    this.hit = 0;
  }

  reflectCollidingCircle(element) {
    this.projectile = new Projectile(element.angle, element.initialVelocity / 2);

    // limit the frame of bounce effect
    while (this.hit < 50) {
      element.position.x += this.projectile.horizontalVelocity() * FRICTION; //offset to slow the speed
      element.position.y -= this.projectile.verticalVelocity() * FRICTION;

      /*       if (element instanceof Bird) {
              element.birdImage.src = element.imageSources[2];
            } */

      this.hit++;
    }
  }
}
