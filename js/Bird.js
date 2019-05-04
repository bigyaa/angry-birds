class Bird {
  constructor(posX, posY, slingshot, radius = 45) {

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
    this.color = '#FF1';
    this.radius = radius;
    this.speed = 2;

    this.slingshot = slingshot;
    this.slingshot.stretchedDistance = 8; /* distance(this.initialPosition.x,this.initialPosition.y,this.finalPosition.x,this.finalPosition.y); */

    this.maxHeightPos;

    this.birdImage = new Image();
    this.birdImage.src = "./images/red-bird.png";
  }

  initProjectile() {
    this.projectile = new Projectile(this.initialPosition.x, this.initialPosition.y, this.finalPosition.x, this.finalPosition.y, this.initialVelocity);

    // H=(usin0)2/(2g)
    this.maxHeight = (Math.pow(this.initialVelocity * Math.sin(this.projectile.angle)), 2) / (2 * GRAVITY);
    console.log(this.maxHeight);

    this.maxRange = Math.pow(this.initialVelocity, 2) * Math.sin(2 * this.projectile.angle) / GRAVITY;

    this.maxHeightPos = {
      x: this.maxRange / 2 + this.finalPosition.x * this.slingshot.stretchedDistance,
      y: this.finalPosition.y - this.maxHeight - this.slingshot.height,
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
    // context.beginPath();
    // context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    // context.fill();
    // context.closePath();

    (() => {
      context.drawImage(this.birdImage, this.position.x - this.radius, this.position.y - this.radius);
    })();

  }

  shiftLeft() {
    this.position.x -= this.speed;
  }

  shiftRight() {
    this.position.x += this.speed;
  }

  shiftUp() {
    this.position.y -= this.speed;
  }

  shiftDown() {
    this.position.y += this.speed;
  }

  stopControls() {
    this.finalPosition = this.position;
    console.log(this.finalPosition);

    this.speed = 0;
  }
}
