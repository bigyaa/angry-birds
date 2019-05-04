class Slingshot {
  constructor(positionX, positionY, width = 100, height = 210) {

    this.height = height;
    this.width = width;

    // Relative to the bird's initial position
    this.position = {
      x: positionX - (this.width / 2),
      y: positionY - 30,
    };

    // this.stretchedDistance =
    this.slingShotImage = new Image();
    this.slingShotImage.src = "./images/sling.png";

    this.ballPoint = {
      x: this.position.x + (this.width / 2),
      y: this.position.y,
    };

    this.maxStretch = 10;

    this.showSlingShot = (context) => {
      context.drawImage(this.slingShotImage, this.position.x, this.position.y, this.width, this.height);
    }
  }
}
