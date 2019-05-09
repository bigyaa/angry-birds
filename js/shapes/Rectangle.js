class Rectangle {
  constructor(posX, posY, width, height, color = '#BF6') {
    this.height = height;
    this.width = width;
    this.position = {
      x: posX,
      y: posY,
    }
    this.color = color;

    /*
    (firstPoint)---------------(secondPoint)
            |                         |
            |                         |
            |                         |
            |                         |
    (fourthPoint)-------------(thirdPoint)
       */
    this.vertices;
    this.updateVertices();
  }

  show(context) {
    context.fillStyle = this.color;
    context.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  updateVertices(positionX = this.position.x, positionY = this.position.y) {
    this.vertices = {
      firstPoint: {
        x: positionX,
        y: positionY,
      },
      secondPoint: {
        x: positionX + this.width,
        y: positionY,
      },
      thirdPoint: {
        x: positionX + this.width,
        y: positionY + this.height,
      },
      fourthPoint: {
        x: positionX,
        y: positionY + this.height,
      },
    }
  }
}
