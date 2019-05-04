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

    var that = this;

    this.showSlingShot = (context) => {
      context.drawImage(that.slingShotImage, that.position.x, that.position.y, that.width, that.height);
    }
  }
}
