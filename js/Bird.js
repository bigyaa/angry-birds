class Bird {
  constructor(posX, posY, radius, projectile, slingshot) {
    this.initialPosition = {
      x: posX,
      y: posY,
    };

    this.position = {
      x: posX,
      y: posY,
    };

    this.finalPosition = {
      x: 0,
      y: 0,
    };

    this.color = '#FF1';
    this.radius = radius;
    this.projectile = projectile;
    this.slingshot = slingshot;
    this.maxHeightPos;
    this.slingshot.stretchedDistance = 8;

    this.speed = 2;

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.projectile.initialVelocity * Math.sin(this.projectile.angle)), 2) / (2 * GRAVITY);

    this.maxRange = Math.pow(this.projectile.initialVelocity, 2) * Math.sin(2 * this.projectile.angle) / GRAVITY;

    this.maxHeightPos = {
      x: this.maxRange / 2 + this.projectile.finalPosition.x * this.slingshot.stretchedDistance,
      y: this.projectile.finalPosition.y - this.maxHeight - this.slingshot.height,
    };
  }

  launch() {
    if (this.position.y + this.radius < GROUND_Y) {
      this.position.x += this.projectile.horizontalDisplacement();
      if (this.position.x >= this.maxHeightPos.x) {
        this.position.y += this.projectile.downwardVerticalDisplacement();
      } else {
        this.position.y += this.projectile.upwardVerticalDisplacement();
      }
    }
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
    console.log(this.finalPosition);

    this.speed = 0;
  }
}
