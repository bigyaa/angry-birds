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
    this.initialVelocity = 3;
    this.radius = radius;
    this.sling = sling;
    this.newAngle;

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

  updateImage() {
    this.birdImage.src = this.imageSources[this.birdFrame];
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
  }


  launch() {
    // this.birdImage.src = this.imageSources[1];
    this.birdFrame = 1;
    this.updateImage();

    if (this.position.y + this.radius < GROUND_Y) {
      let newHorizontalVelocity = this.projectile.horizontalVelocity() * 0.075;
      let newVerticalVelocity = this.projectile.verticalVelocity() * AIR_RESISTANCE;

      this.position.x += newHorizontalVelocity;
      this.position.y += newVerticalVelocity;

      // Calculate angle of projection at each frame
      this.newAngle = Math.atan(newVerticalVelocity / (this.projectile.horizontalVelocity() * 0.075));
      this.projectile.updateData(this.newAngle);
    } else {

      // change bird image when it touches the ground
      this.birdFrame = 3;
      this.updateImage();
    }

    /*     if (this.position.y + this.radius >= GROUND_Y) {
          birdFrame++;

          birdID++;
          defeatedBird.append(this);
        } */
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

  resetBirdFrame() {
    birdFrame = 0;
  }
}

