class Bird {
  constructor() {
    this.position = { x: 100, y: 400 };
    this.radius = 20;
    this.listen = true;
  }

  show(context) {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
    context.closePath();
  }

  launch() {
    this.listen = false;
  }

  resetAttributes() {
    this.position = { x: 100, y: 400 };
    this.listen = true;
  }
}
