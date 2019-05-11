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

    this.damage = 0;

    this.pigImage = new Image();
    this.pigImage.src = "./images/pig_initial.png";

    this.initialVelocity = 0;
    this.velocityAdjustment = 0.75;

    this.collision = false;
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
    this.initialVelocity = circle.initialVelocity * this.velocityAdjustment;

    this.projectile = new Projectile(
      circle.angle,
      this.initialVelocity
    );
  }


  launch() {
    if (this.position.y + this.radius <= GROUND_Y) {
      this.position.x += this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      this.position.y += this.projectile.verticalVelocity * TIME_DIFFERENCE;
    } else {
      this.damage++;
      this.collision = false;
    }
  }


  fall() {
    if (this.position.y + this.radius < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.position.y += GRAVITY;
    }
  }

  update(damage = this.damage) {

    switch (damage) {
      case 1:
        score += 500;

        this.pigImage.src = "./images/pig_hit-1.png";
        break;

      case 2:
        score += 1000;

        this.pigImage.src = "./images/pig_hit-2.png";
        break;

      case 3:
        score += 1500;

        this.pigImage.src = "./images/pig_hit2-roll-1.png";
        break;
    }
  }
}
