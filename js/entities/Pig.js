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
    this.hitCount = 0;
  }

  show(context) {
    (() => {
      context.drawImage(
        this.pigImage,
        this.position.x - this.radius,
        this.position.y - this.radius,
        PIG_SIZE.width,
        PIG_SIZE.height
      );
    })();
  }

  initProjectile(circle) {
    this.projectile = new Projectile(
      circle.angle,
      circle.initialVelocity * 0.75
    );

    circle.initialVelocity *= 0.75;
  }

  launch() {
    this.position.x += this.projectile.horizontalVelocity() * 0.025;
    this.position.y -= this.projectile.verticalVelocity() * AIR_RESISTANCE;
  }
}
