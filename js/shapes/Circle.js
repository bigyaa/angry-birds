class Circle {
  constructor(posX, posY, radius = 45) {

    this.initialPosition = {
      x: posX,
      y: posY,
    };

    this.position = {
      x: posX,
      y: posY,
    };

    this.finalPosition;
    this.color = '#FF1';
    this.radius = radius;
    this.speed = 2;

  }

  show(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }

  shiftLeft() {
    this.position.x -= this.speed;
  }

  shiftRight() {
    this.position.x += this.speed;
  }

  shiftUp() {
    this.position.y -= this.speed;
  }

  shiftDown() {
    this.position.y += this.speed;
  }

  stopControls() {
    this.finalPosition = this.position;

    this.speed = 0;
  }

  bounce(angle, initialVelocity) {
    if (this.position.y >= GROUND_Y) {
      this.bounceProjectile = new Projectile(angle, initialVelocity);

      this.position.x += this.bounceProjectile.horizontalVelocity() * 0.025; //offset to slow the speed
      this.position.y -= this.bounceProjectile.verticalVelocity() * 0.075;
    }
  }
}
