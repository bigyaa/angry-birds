class Pig extends Circle {
  constructor(posX, posY, radius = PIG_RADIUS) {
    super(posX, posY, radius);

    this.initialPosition = {
      x: posX,
      y: posY
    };

    this.position = {
      x: posX,
      y: posY
    };

    this.radius = radius;
    this.pigImage = new Image();
    this.pigImage.src = "./images/pig_initial.png";
  }

  show(context) {
    (() => {
      context.drawImage(this.pigImage, this.position.x - this.radius, this.position.y - this.radius, PIG_SIZE.width, PIG_SIZE.height);
    })();
  }

  initProjectile(bird) {
    this.projectile = new Projectile(bird.angle, bird.initialVelocity / 2);
  }

  launch() {
    this.position.x += this.projectile.horizontalVelocity() * 0.025; //offset to slow the speed
    this.position.y -= this.projectile.verticalVelocity() * 0.075; //offset to slow the speed
  }
}
