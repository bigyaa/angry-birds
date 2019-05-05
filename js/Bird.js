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

    this.finalPosition;

    this.initialVelocity = 9; //the lower the slower
    this.radius = radius;

    this.speed = {
      x: 2,
      y: 2,
    };

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

  shiftLeft() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.x -= this.speed.x;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1; //reset flag

    }
  }

  shiftRight() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.x += this.speed.x;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  shiftUp() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.y -= this.speed.y;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  shiftDown() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.y += this.speed.y;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  stopControls() {
    this.finalPosition = this.position;
    this.calcBirdStretch();

    this.speed = 0;
  }
}
