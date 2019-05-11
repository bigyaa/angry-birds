class Wood extends Rectangle {

  /* imageType= "vertical" or "horizontal" or "stone" */
  constructor(posX, posY, imageType) {

    super(
      posX,
      posY,
      obstacleImageType[imageType]["width"],
      obstacleImageType[imageType]["height"]
    );

    if (posY <= GROUND_Y) {
      this.posX = posX;
      this.posY = posY;
    }

    this.woodImage = new Image();
    this.woodImage.src = obstacleImageType[imageType].src;

    this.width = obstacleImageType[imageType].width;
    this.height = obstacleImageType[imageType].height;

    this.damage = 0;

    this.collision = false;

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


  launch(direction) {
    if (this.posY + this.height < GROUND_Y) {
      this.posX += direction * this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      this.posY += this.projectile.verticalVelocity * TIME_DIFFERENCE;
    } else {
      this.damage++;
      this.collision = false;
    }

    // Update vertices after each movement
    this.updateVertices(this.posX, this.posY);
  }


  // direction = 1 if it moves to right, else -1
  handleObstacleCollision(someEntity) {
    if (this.collision) {
      this.initProjectile(someEntity);
      this.launch(direction);
    }
  }

  fall() {
    if (this.vertices.fourthPoint.y < GROUND_Y) {

      // Increase y-coordinate until it collides
      this.posY += GRAVITY;

      // Send updated values to draw on updates co-ordinates
      this.updateVertices(this.posX, this.posY)
    }
  }


  update(damage = this.damage) {

    switch (damage) {
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
