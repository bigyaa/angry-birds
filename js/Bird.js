class Bird {
  constructor(posX, posY, radius, projectile) {
    this.initialPosition = {
      x: posX,
      y: posY,
    };
    this.position = {
      x: posX,
      y: posY,
    };
    this.color = '#FF1';
    this.radius = radius;
    this.projectile = projectile;
  }

  show(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.fill();
  }

  shiftLeft() {
    this.position.x -= 2;
  }

  shiftRight() {
    this.position.x += 2;
  }

  shiftUp() {
    this.position.y -= 2;
  }

  shiftDown() {
    this.position.y += 2;
  }

  launch() {
    this.position.x += projectile.horizontalDisplacement();
    this.position.y += projectile.verticalDisplacement();
  }
}
