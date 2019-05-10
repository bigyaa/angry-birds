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

    this.hitCount = 0;

    this.pigImage = new Image();
    this.pigImage.src = "./images/pig_initial.png";
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
    if (this.position.y + this.radius <= GROUND_Y) {
      this.position.x += this.projectile.horizontalVelocity * AIR_RESISTANCE;
      this.position.y += this.projectile.verticalVelocity * AIR_RESISTANCE;
    } else {
      this.hitCount++;
    }
  }


  fall() {
    if (this.position.y + this.radius < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.position.y += GRAVITY;
    }
  }

  updateImage(hitCount = this.hitCount) {

    switch (hitCount) {
      case 1:
        this.pigImage.src = "./images/pig_hit-1.png";
        break;

      case 2:
        this.pigImage.src = "./images/pig_hit-2.png";
        break;

      case 3:
        this.pigImage.src = "./images/pig_hit2-roll-1.png";
        break;

      case 4:
        pigVanishingImages[1];
        break;

    }
  }
}
