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


  drawSlingElasticBack(context, positionX, positionY) {
    context.beginPath();
    context.strokeStyle = 'black';

    context.moveTo(INITIAL_BIRD_X, INITIAL_BIRD_Y);
    context.lineTo(positionX - BIRD_RADIUS, positionY);
    context.stroke();
  }


  drawSlingElasticFront(context, positionX, positionY) {
    context.beginPath();
    context.strokeStyle = 'black';

    context.moveTo(INITIAL_BIRD_X - SLING_WIDTH / 2.2, INITIAL_BIRD_Y);
    context.lineTo(positionX - BIRD_RADIUS, positionY);
    context.stroke();
  }


  reachStretchLimit(
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

    if (this.travelledDistance >= BIRD_STRETCH_LIMIT) {
      return true
    } else {
      return false;
    }
  }


  calcStretchDistance(
    initialObjPositionX,
    initialObjPositionY,
    stretchedPositionX,
    stretchedPositionY
  ) {

    return getDistance(
      initialObjPositionX,
      initialObjPositionY,
      stretchedPositionX,
      stretchedPositionY
    );
  }

}
