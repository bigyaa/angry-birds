class Sling {
  constructor(positionX, positionY, width = 100, height = 210) {

    this.height = height;
    this.width = width;

    // Relative to the bird's initial position
    this.position = {
      x: positionX - (this.width / 2),
      y: positionY - 30,
    };

    this.slingImage = new Image();
    this.slingImage.src = "./images/sling.png";

    this.ballPoint = {
      x: this.position.x + (this.width / 2),
      y: this.position.y,
    };

    this.maxStretch = 0;
  }

  showSling(context) {
    context.drawImage(this.slingImage, this.position.x, this.position.y, this.width, this.height);
  }

  checkStretchLimit(initialObjPositionX, initialObjPositionY, stretchedPositionX, stretchedPositionY) {
    this.travelledDistance = this.calcStretchDistance(initialObjPositionX, initialObjPositionY, stretchedPositionX, stretchedPositionY);

    if (this.travelledDistance > 80) { this.maxStretch += 1; }
  }

  calcStretchDistance(initialObjPositionX, initialObjPositionY, stretchedPositionX, stretchedPositionY) {

    return distance(initialObjPositionX, initialObjPositionY, stretchedPositionX, stretchedPositionY);
  }

}
