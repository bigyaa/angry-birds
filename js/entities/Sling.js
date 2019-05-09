class Sling {

  constructor(
    positionX,
    positionY,
    width = SLING_WIDTH,
    height = SLING_HEIGHT
  ) {

    this.height = height;
    this.width = width;

    // Relative to the bird's initial position
    this.position = {
      x: positionX - (this.width / 2),
      y: positionY - BIRD_RADIUS,
    };

    this.slingImage = new Image();
    this.slingImage.src = "./images/sling.png";

    this.ballPoint = {
      x: this.position.x + (this.width / 2),
      y: this.position.y,
    };

    // flag for stretch limit
    this.maxStretch = 0;
  }


  showSling(context) {
    context.drawImage(
      this.slingImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }


  checkStretchLimit(
    initialObjPositionX,
    initialObjPositionY,
    stretchedPositionX,
    stretchedPositionY
  ) {
    this.travelledDistance = this.calcStretchDistance(
      initialObjPositionX,
      initialObjPositionY,
      stretchedPositionX,
      stretchedPositionY
    );

    if (this.travelledDistance > BIRD_STRETCH_LIMIT
    ) {
      this.maxStretch = 1;
    }
  }


  calcStretchDistance(
    initialObjPositionX,
    initialObjPositionY,
    stretchedPositionX,
    stretchedPositionY
  ) {

    return distance(
      initialObjPositionX,
      initialObjPositionY,
      stretchedPositionX,
      stretchedPositionY
    );
  }

}
