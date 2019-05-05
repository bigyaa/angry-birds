class Wood extends Rectangle {
  constructor(posX, posY, width = WOOD_WIDTH, height = WOOD_HEIGHT) {
    super(posX, posY, width, height);

    this.woodImage = new Image();
    this.woodImage.src = "./images/column.png";

    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;

  }

  show(context) {
    (() => {
      context.drawImage(this.woodImage, this.posX, this.posY, this.width, this.height);
    })();
  }
}
