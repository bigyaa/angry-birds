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

    this.midPoint = {
      x: this.width / 2,
      y: this.height / 2,
    };
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

  fall() {
    if (this.vertices.fourthPoint < GROUND_Y) {
      this.position.y += 2;
      this.updateVertices(this.position.x, this.position.y)
    }
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
