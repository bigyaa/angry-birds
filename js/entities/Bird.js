class Bird extends Circle {

  // Radius assigned based on actual image size
  constructor(posX, posY, sling, radius = BIRD_RADIUS) {

    super(posX, posY, radius);

    this.initialPosition = {
      x: posX,
      y: posY,
    };

    this.position = {
      x: posX,
      y: posY,
    };

    this.shiftingDistance = {
      x: 2,
      y: 2,
    };

    this.birdImage = new Image();
    this.imageSources = [
      "./images/red-bird.png",
      "./images/bird-flight.png",
      "./images/bird-hit1.png",
      "./images/bird-hit2.png"
    ];
    this.birdImage.src = this.imageSources[0];

    this.finalPosition = 0;
    this.initialVelocity = 2;
    this.radius = radius;
    this.sling = sling;
    this.hitCount = 0;

    this.updateFrame = () => {
      if (this.hitCount === 1) {
        this.birdImage.src = this.imageSources[2]
      }
      else if (this.hitCount === 2) {
        this.birdImage.src = this.imageSources[3]
      }
      else {
        // make bird disappear
      }
    }
  }


  calcBirdStretch() {

    /* The sling stretched distance determines the range and height of the projectile.
    The lower the value, the lower the range and vice-versa */
    this.birdStretch = (this.sling.calcStretchDistance(
      this.initialPosition.x,
      this.initialPosition.y,
      this.finalPosition.x,
      this.finalPosition.y)
    );

    /* Determines speed of the bird based on the stretched distance */
    this.initialVelocity *= this.birdStretch;
  }


  initProjectile() {
    this.angle = getTrajectoryAngle(
      this.initialPosition.x,
      this.initialPosition.y,
      this.finalPosition.x,
      this.finalPosition.y
    );

    this.projectile = new Projectile(this.angle, this.initialVelocity);

    // Maximum height the object will reach
    this.maxHeight = Math.floor((Math.pow(
      this.initialVelocity * Math.sin(this.projectile.angle)), 2) / (2 * GRAVITY)
    );

    // Maximum distance the object will travel
    this.maxRange = Math.floor(Math.abs(Math.pow(
      this.initialVelocity, 2) * Math.sin(2 * this.projectile.angle) / GRAVITY)
    );
  }


  launch() {
    this.birdImage.src = this.imageSources[1];

    if (this.position.y + this.radius <= GROUND_Y) {
      this.position.x += this.projectile.horizontalVelocity() * 0.025;

      // Check if the bird is moving against gravity
      if (this.position.x >= (this.maxRange / 2 + this.initialPosition.x - this.birdStretch)) {

        // Go upward
        this.position.y -= this.projectile.verticalVelocity() * AIR_RESISTANCE;
      } else {

        // Go downward
        this.position.y += this.projectile.verticalVelocity() * AIR_RESISTANCE;
      }
    }
  }


  show(context) {
    (() => {

      // Align image position with the circle
      context.drawImage(
        this.birdImage,
        this.position.x - this.radius,
        this.position.y - this.radius
      );
    })();
  }


  shiftLeft() {
    this.sling.checkStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    );

    if (!this.sling.maxStretch) {
      this.position.x -= this.shiftingDistance.x;
    } else {
      alert("Maximum Stretch Limit Reached");

      this.sling.maxStretch = -1; //reset flag
    }
  }


  shiftRight() {
    this.sling.checkStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    );

    if (!this.sling.maxStretch) {
      this.position.x += this.shiftingDistance.x;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }


  shiftUp() {
    this.sling.checkStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    );

    if (!this.sling.maxStretch) {
      this.position.y -= this.shiftingDistance.y;
    } else {
      alert("Maximum Stretch Limit Reached");
      this.sling.maxStretch = -1;
    }
  }


  shiftDown() {
    this.sling.checkStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    );

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
