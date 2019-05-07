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
    this.vertices = {
      firstPoint: {
        x: this.position.x,
        y: this.position.y,
      },
      secondPoint: {
        x: this.position.x + this.width,
        y: this.position.y,
      },
      thirdPoint: {
        x: this.position.x + this.width,
        y: this.position.y + this.height,
      },
      fourthPoint: {
        x: this.position.x,
        y: this.position.y + this.height,
      },
    }

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
}
