class Obstacle extends Rectangle {
  /* imageType= "vertical" or "horizontal" or "stone" */
  constructor(posX, posY, imageType) {
    super(
      posX,
      posY,
      obstacleImageType[imageType]['width'],
      obstacleImageType[imageType]['height']
    );

    if (posY <= GROUND_Y) {
      this.posX = posX;
      this.posY = posY;
    }

    this.obstacleImage = new Image();
    this.obstacleImage.src = obstacleImageType[imageType].src;

    this.audioOnCollision = new Audio();
    this.audioOnCollision.src = './sounds/stone-hit.mp3';

    this.imagesAfterDamage = ['./images/stone2.png', './images/stone3.png'];

    this.width = obstacleImageType[imageType].width;
    this.height = obstacleImageType[imageType].height;

    this.damage = 0;
    this.velocityChangeFactor = 0.75;

    this.collision = false;
  }

  show(context) {
    (() => {
      context.drawImage(
        this.obstacleImage,
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
      this.posX +=
        direction * this.projectile.horizontalVelocity * TIME_DIFFERENCE;
      this.posY += this.projectile.verticalVelocity * TIME_DIFFERENCE;
    } else {
      this.damage++;
      this.collision = false;
    }

    // Update vertices after each movement
    this.updateVertices(this.posX, this.posY);
  }

  // direction = 1 if it moves to right, else -1
  handleObstacleCollision(someEntity, direction) {
    if (this.collision) {
      this.damage++;
      this.update();
    }
  }

  fall() {
    if (this.vertices.fourthPoint.y < GROUND_Y) {
      // Increase y-coordinate until it collides
      this.posY += GRAVITY;

      // Send updated values to draw on updates co-ordinates
      this.updateVertices(this.posX, this.posY);

      this.collision = false;
    }
  }

  update(damage = this.damage) {
    switch (damage) {
      case 1:
        angryBirds.score += 20;

        this.audioOnCollision.play();

        this.obstacleImage.src = this.imagesAfterDamage[damage - 1];

        break;

      case 2:
        angryBirds.score += 40;

        this.audioOnCollision.play();

        this.obstacleImage.src = this.imagesAfterDamage[damage - 1];

        break;

      case 3:
        angryBirds.score += 80;

        this.audioOnCollision.play();

        // this.fall();

        break;
    }
  }
}
