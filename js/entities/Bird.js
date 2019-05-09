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

    this.birdFrame = 0;
    this.birdImage = new Image();
    this.imageSources = [
      "./images/red-bird.png",
      "./images/bird-flight.png",
      "./images/bird-hit1.png",
      "./images/bird-hit2.png"
    ];
    this.birdImage.src = this.imageSources[this.birdFrame];

    this.finalPosition = 0;
    this.initialVelocity = 1.75;
    this.radius = radius;
    this.sling = sling;

    // this.birdID
    // this.hitCount = 0;

    /*     this.updateFrame = () => {
          if (this.hitCount === 1) {
            this.birdImage.src = this.imageSources[2]
          }
          else if (this.hitCount === 2) {
            this.birdImage.src = this.imageSources[3]
          }
          else {
            // make bird disappear
          }
        } */
  }

  updateImage(birdFrame = this.birdFrame) {
    this.birdImage.src = this.imageSources[birdFrame];
  }

  calcBirdStretch() {

    /* The sling stretched distance determines the range and height of the projectile.
    The lower the value, the lower the range and vice-versa */
    this.birdStretch = (this.sling.calcStretchDistance(
      this.initialPosition.x,
      this.initialPosition.y,
      this.finalPosition.x,
      this.finalPosition.y
    ));

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
  }


  launch() {
    // this.birdImage.src = this.imageSources[1];
    this.birdFrame = 1;
    this.updateImage();

    if (this.position.y + this.radius < GROUND_Y) {
      let newHorizontalVelocity = this.projectile.horizontalVelocity() * AIR_RESISTANCE;
      let newVerticalVelocity = this.projectile.verticalVelocity() * AIR_RESISTANCE;

      this.position.x += newHorizontalVelocity;
      this.position.y += newVerticalVelocity;

      // Calculate angle of projection at each frame
      let newAngle = Math.atan(newVerticalVelocity / newHorizontalVelocity);

      this.angle = newAngle;
      this.projectile.updateData(this.angle);
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


  resetAttributes() {
    this.initialPosition.x = initialBirdX;
    this.initialPosition.y = initialBirdY;

    this.position = this.initialPosition;

    this.birdFrame = 0;
  }

  fall() {
    if (this.position.y + this.radius < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.position.y += GRAVITY;
    }
  }
}

