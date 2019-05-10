class Wood extends Rectangle {

  /* imageType= "vertical" or "horizontal" */
  constructor(posX, posY, imageType) {

    super(
      posX,
      posY,
      woodImageType[imageType]["width"],
      woodImageType[imageType]["height"]
    );

    if (posY <= GROUND_Y) {
      this.posX = posX;
      this.posY = posY;
    }

    this.woodImage = new Image();
    this.woodImage.src = woodImageType[imageType].src;

    this.width = woodImageType[imageType].width;
    this.height = woodImageType[imageType].height;

    this.hitCount = 0;

    this.velocityChangeFactor = 0.75;
  }


  show(context) {
    (() => {
      context.drawImage(
        this.woodImage,
        this.posX,
        this.posY,
        this.width,
        this.height
      );
    })();
  }


  initProjectile(circle, velocityChangeFactor = this.velocityChangeFactor) {
    this.projectile = new Projectile(
      circle.angle,
      circle.initialVelocity * velocityChangeFactor
    );

    circle.initialVelocity *= velocityChangeFactor;
  }


  launch() {
    this.posX += this.projectile.horizontalVelocity * TIME_DIFFERENCE;

    if (this.posY + this.height < GROUND_Y) {
      this.posY += this.projectile.verticalVelocity * TIME_DIFFERENCE;
    } else {
      this.hitCount++;
    }

    // Update vertices after each movement
    this.updateVertices(this.posX, this.posY);
  }


  fall() {
    if (this.vertices.fourthPoint.y < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.posY += GRAVITY;

      // Send updated values to draw on updates co-ordinates
      this.updateVertices(this.posX, this.posY)
    }
  }


  update(hitCount = this.hitCount) {

    switch (hitCount) {
      case 1:
        score += 200;

        break;

      case 2:
        score += 400;

        break;

      case 3:
        score += 800;

        break;
    }
  }
}
