class Bird extends Circle {
  constructor(posX, posY, sling, radius = 45) {

    super(posX, posY, radius);

    this.initialPosition = {
      x: posX,
      y: posY,
    };

    this.position = {
      x: posX,
      y: posY,
    };

    this.maxStretch = 0;

    this.finalPosition;

    this.initialVelocity = 9; //the lower the slower
    this.radius = radius;

    this.sling = sling;

    this.maxHeightPos;

    this.birdImage = new Image();
    this.birdImage.src = "./images/red-bird.png";
  }

  calcBirdStretch() {

    /* The sling stretched distance determines the range and height of the projectile.
    The lower the value, the lower the range and vice-versa */

    this.birdStretch = (this.sling.calcStretchDistance(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y));

    /* Determines speed of the bird based on the stretched distance */
    this.initialVelocity *= this.birdStretch;
  }

  initProjectile() {
    this.projectile = new Projectile(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y, this.initialVelocity);

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.initialVelocity * Math.sin(this.projectile.angle)), 2) / (2 * GRAVITY);

    this.maxRange = Math.pow(this.initialVelocity, 2) * Math.sin(2 * this.projectile.angle) / GRAVITY;

    this.maxHeightPos = {
      x: this.maxRange / 2 + this.finalPosition.x * this.birdStretch,
      y: this.finalPosition.y - this.maxHeight - this.sling.height,
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
    (() => {
      context.drawImage(this.birdImage, this.position.x - this.radius, this.position.y - this.radius);
    })();

  }

  checkStretchLimit() {
    this.travelledDistance = distance(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);

    if (this.travelledDistance > 80) { this.maxStretch = 1; }
  }

  shiftLeft() {
    this.checkStretchLimit();
    if (!this.maxStretch) {
      this.position.x -= this.speed;
    } else {
      this.stopControls();
    }
  }

  shiftRight() {
    this.checkStretchLimit();
    if (!this.maxStretch) {
      this.position.x += this.speed;
    } else {
      this.stopControls();
    }
  }

  shiftUp() {
    this.checkStretchLimit();
    if (!this.maxStretch) {
      this.position.y -= this.speed;
    } else {
      this.stopControls();
    }
  }

  shiftDown() {
    this.checkStretchLimit();
    if (!this.maxStretch) {
      this.position.y += this.speed;
    } else {
      this.stopControls();
    }
  }

  stopControls() {
    this.finalPosition = this.position;
    this.calcBirdStretch();

    this.speed = 0;
  }
}
