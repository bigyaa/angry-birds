class Wood extends Rectangle {
  /* imageType= "vertical" or "horizontal" */
  constructor(posX, posY, imageType) {
    super(posX,
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

  initProjectile(circle) {
    this.projectile = new Projectile(
      circle.angle,
      circle.initialVelocity * 0.75
    );

    circle.initialVelocity *= 0.75;
  }

  launch() {
    this.posX += this.projectile.horizontalVelocity() * AIR_RESISTANCE;
    this.posY += this.projectile.verticalVelocity() * AIR_RESISTANCE;
  }
}
