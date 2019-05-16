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

    this.finalPosition = 0;

    this.randomPositionOnGround = getRandomInt(GROUND_Y, GROUND_Y + 150);

    this.birdFrame = 0;
    this.birdImage = new Image();

    this.imageSources = [
      "./images/red-bird.png",
      "./images/bird-flight.png",
      "./images/bird-hit1.png",
      "./images/bird-hit2.png",
      "./images/cloud-white.png",
      "./images/cloud-white-another.png",
      "./images/cloud-white-vanish.png"
    ];

    this.shiftingDistance = {
      x: 2,
      y: 2
    };

    this.birdImage.src = this.imageSources[this.birdFrame];

    this.audioOnCollision = new Audio();
    this.audioOnCollision.loop = false;
    this.audioOnCollision.src = "./sounds/on-collision.mp3";

    this.slingStretchedSound = document.getElementById("slingStretched");

    this.initialVelocity = INITIAL_BIRD_VELOCITY;

    this.radius = radius;
    this.sling = sling;

    this.stretchFix = 10;

    this.collision = false;
    this.listen = false;
  }


  get positionX() {
    return this.position.x;
  }


  get positionY() {
    return this.position.y;
  }


  updateImage(birdFrame = this.birdFrame) {
    this.birdImage.src = this.imageSources[birdFrame];
  }


  calcBirdStretch() {

    /* The sling stretched distance determines the range and height of the projectile.
    The lower the value, the lower the range and vice-versa */
    this.birdStretch = (
      this.sling.calcStretchDistance(
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

    this.projectile = new Projectile(
      this.angle,
      this.initialVelocity);
  }


  launch() {
    angryBirds.showSlingElastic = false;

    this.birdFrame = 1;
    this.updateImage(this.birdFrame);

    if (this.position.y + this.radius < GROUND_Y) {
      let dx = this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      let dy = this.projectile.verticalVelocity * TIME_DIFFERENCE;

      this.position.x += dx;
      this.position.y += dy;

      // Calculate angle of projection at each frame
      let newAngle = Math.atan(dy / dx);

      this.angle = newAngle;
      this.projectile.updateData(this.angle);
    }
  }

  // direction = 1 if it moves to right, else -1
  handleBirdCollision(direction) {
    if (this.collision) {
      this.audioOnCollision.play();

      this.fallInterval = 8;
      this.initialVelocity = 2;

      this.initProjectile();

      if (this.position.y + this.radius < this.randomPositionOnGround) {
        this.position.x += direction * this.projectile.horizontalVelocity * TIME_DIFFERENCE;
        this.position.y += this.projectile.verticalVelocity * this.fallInterval;
      } else {
        this.collision = false;
      }
    }
  }


  show(context) {
    (() => {
      this.birdImage.onload =
        // Align image position with the circle
        context.drawImage(
          this.birdImage,
          this.position.x - this.radius,
          this.position.y - this.radius
        );
    })();
  }


  shiftLeft() {
    // To shift position if max stretch limit is not reached at current position
    if (!this.sling.reachStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    )) {
      this.slingStretchedSound.play();

      this.position.x -= this.shiftingDistance.x;
    } else {
      this.position.x += this.stretchFix;
    }
  }


  shiftRight() {
    // To shift position if max stretch limit is not reached at current position
    if (!this.sling.reachStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    ) &&
      this.position.x <= INITIAL_BIRD_X
    ) {
      this.slingStretchedSound.play();

      this.position.x += this.shiftingDistance.x;
    }
  }


  shiftUp() {
    // To shift position if max stretch limit is not reached at current position
    if (!this.sling.reachStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    )) {
      this.slingStretchedSound.play();

      this.position.y -= this.shiftingDistance.y;
    }
  }


  shiftDown() {
    // To shift position if max stretch limit is not reached at current position
    if (!this.sling.reachStretchLimit(
      this.initialPosition.x,
      this.initialPosition.y,
      this.position.x,
      this.position.y
    )) {
      this.slingStretchedSound.play();

      this.position.y += this.shiftingDistance.y;
    }
  }


  stopControls() {
    this.finalPosition = this.position;

    this.calcBirdStretch();

    this.shiftingDistance = 0;
  }


  resetAttributes() {
    this.initialPosition.x = INITIAL_BIRD_X;
    this.initialPosition.y = INITIAL_BIRD_Y;

    this.finalPosition = 0;

    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;

    this.initialVelocity = INITIAL_BIRD_VELOCITY;

    this.angle = 0;
    this.birdFrame = 0;

    this.collision = false;
    angryBirds.showSlingElastic = true;
  }


  fall() {
    if (this.position.y + this.radius < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.position.y += GRAVITY;
    }
  }
}

