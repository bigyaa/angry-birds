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

    this.audioOnPigHit = new Audio();
    this.audioOnPigHit.src = "./sounds/pig-hit.mp3";

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


  // direction = 1 if it moves to right, else -1
  launch(direction) {
    if (this.position.y + this.radius <= GROUND_Y &&
      this.damage === 2
    ) {
      this.position.x += direction * this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      this.position.y += this.projectile.verticalVelocity * this.fallInterval;
    } else {
      this.damage += 2;
      this.collision = false;
    }
  }


  handlePigCollision(someEntity, direction) {
    if (this.collision) {
      this.audioOnPigHit.play();

      this.fallInterval = 6;

      this.initProjectile(someEntity);
      this.launch(direction);
      this.update();
    }
  }


  fall(obstacle) {
    if (this.position.y + this.radius < GROUND_Y &&
      this.position.y + this.radius < obstacle.posY
    ) {
      // Increase y-coordinate until it collides
      this.position.y += GRAVITY;
    }
  }


  update(damage = this.damage) {

    switch (damage) {

      case 1:
        angryBirds.score += 50;

        this.pigImage.src = "./images/pig_hit-1.png";

        break;

      case 2:
        angryBirds.score += 500;

        this.pigImage.src = "./images/pig_hit-2.png";

        break;

      case 4:
        angryBirds.score += 750;

        this.pigImage.src = "./images/pig_hit2-roll-1.png";

        break;
    }
  }
}
