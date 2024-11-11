class Bird {
  constructor(sling, radius = BIRD_RADIUS) {
    this.initialPosition = { x: posX, y: posY };
    this.position = {
      x: posX,
      y: posY,
    };
    this.radius = radius;
    this.collision = false;
    this.finalPosition = { x: 0, y: 0 };

    this.randomPositionOnGround = getRandomInt(GROUND_Y, GROUND_Y + 150);
    this.birdFrame = 0;
    this.birdImage = new Image();

    this.imageSources = [
      './images/red-bird.png',
      './images/bird-flight.png',
      './images/bird-hit1.png',
      './images/bird-hit2.png'
    ];

    this.shiftingDistance = { x: 2, y: 2 };
    this.birdImage.src = this.imageSources[this.birdFrame];

    this.audioOnCollision = new Audio('./sounds/on-collision.mp3');
    this.slingStretchedSound = document.getElementById('slingStretched');

    this.initialVelocity = INITIAL_BIRD_VELOCITY;
    this.angle = 0;
    this.sling = sling;

    this.collision = false;
    this.listen = false;
    this.birdStretch = 1;
  }

  updateImage(birdFrame = this.birdFrame) {
    if (birdFrame >= 0 && birdFrame < this.imageSources.length) {
      this.birdImage.src = this.imageSources[birdFrame];
    }
  }

  calcBirdStretch() {
    this.birdStretch = this.sling.calcStretchDistance(
      this.initialPosition.x,
      this.initialPosition.y,
      this.finalPosition.x,
      this.finalPosition.y
    );
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
    if (!this.projectile) this.initProjectile();
    this.birdFrame = 1;
    this.updateImage();

    if (this.position.y + this.radius < GROUND_Y) {
      const dx = this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      const dy = this.projectile.verticalVelocity * TIME_DIFFERENCE;

      this.position.x += dx;
      this.position.y += dy;

      if (this.position.y + this.radius >= GROUND_Y) {
        this.collision = true;
        this.handleBirdCollision(1);
      }
    }
  }

  handleBirdCollision(direction) {
    if (this.collision) {
      this.audioOnCollision.play();
      this.initProjectile();

      if (this.position.y + this.radius < this.randomPositionOnGround) {
        this.position.x += direction * this.projectile.horizontalVelocity * TIME_DIFFERENCE;
        this.position.y += this.projectile.verticalVelocity * TIME_DIFFERENCE;
      } else {
        this.collision = false;
      }
    }
  }

  show(context) {
    context.drawImage(
      this.birdImage,
      this.position.x - this.radius,
      this.position.y - this.radius
    );
  }

  shiftLeft() {
    if (!this.sling.reachStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y)) {
      this.slingStretchedSound.play();
      this.position.x -= this.shiftingDistance.x;
    }
  }

  shiftRight() {
    if (!this.sling.reachStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y)) {
      this.slingStretchedSound.play();
      this.position.x += this.shiftingDistance.x;
    }
  }

  shiftUp() {
    if (!this.sling.reachStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y)) {
      this.slingStretchedSound.play();
      this.position.y -= this.shiftingDistance.y;
    }
  }

  shiftDown() {
    if (!this.sling.reachStretchLimit(this.initialPosition.x, this.initialPosition.y, this.position.x, this.position.y)) {
      this.slingStretchedSound.play();
      this.position.y += this.shiftingDistance.y;
    }
  }

  stopControls() {
    this.finalPosition = { ...this.position };
    this.calcBirdStretch();
    this.shiftingDistance = { x: 0, y: 0 };
  }

  resetAttributes() {
    this.position = { ...this.initialPosition };
    this.finalPosition = { x: 0, y: 0 };
    this.initialVelocity = INITIAL_BIRD_VELOCITY;
    this.angle = 0;
    this.birdFrame = 0;
    this.collision = false;
    this.updateImage();
  }

  fall() {
    if (this.position.y + this.radius < GROUND_Y) {
      this.position.y += GRAVITY;
    }
  }
}
