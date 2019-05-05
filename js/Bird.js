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

    this.initialVelocity = 1; //minimum initial velocity
    this.radius = radius;

    this.shiftingDistance = {
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
    this.initialVelocity = this.birdStretch;
  }

  initProjectile() {
    this.projectile = new Projectile(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y, this.initialVelocity);

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.initialVelocity * Math.sin(this.projectile.angle)), 2) / (2 * GRAVITY);

    this.maxRange = Math.abs(Math.pow(this.initialVelocity, 2) * Math.sin(2 * this.projectile.angle) / GRAVITY);

    // When the bird reaches it's maximum height based on it's projectile motion
    this.maxHeightPos = {
      x: this.maxRange / 2 + this.finalPosition.x,
      y: this.finalPosition.y - this.maxHeight - this.sling.height,
    };
  }

  launch() {
    if (this.position.y + this.radius < GROUND_Y) {
      this.position.x += this.projectile.horizontalVelocity();

      // Check if the bird is moving against gravity
      if (this.position.x >= this.maxHeightPos.x) {
        this.position.y += this.projectile.downwardVerticalVelocity();
      } else {
        this.position.y += this.projectile.upwardVerticalVelocity();
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
      this.position.x -= this.shiftingDistance.x;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1; //reset flag

    }
  }

  shiftRight() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.x += this.shiftingDistance.x;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  shiftUp() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.y -= this.shiftingDistance.y;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  shiftDown() {
    this.sling.checkStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y);
    if (!this.sling.maxStretch) {
      this.position.y += this.shiftingDistance.y;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }

  stopControls() {
    this.finalPosition = this.position;
    this.calcBirdStretch();

    this.shiftingDistance = 0;
  }
}
