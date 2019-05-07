class Wood extends Rectangle {
  /* imageType= "vertical" or "horizontal" */
  constructor(posX, posY, imageType) {
    super(posX, posY, woodImageType[imageType]["width"], woodImageType[imageType]["height"]);

    this.posX = posX;
    this.posY = posY;

    this.woodImage = new Image();
    this.woodImage.src = woodImageType[imageType].src;
    this.width = woodImageType[imageType].width;
    this.height = woodImageType[imageType].height;
  }

  show(context) {
    (() => {
      context.drawImage(this.woodImage, this.posX, this.posY, this.width, this.height);
    })();
  }
}
