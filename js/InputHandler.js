class InputHandler {
  constructor(bird) {
    this.spaceBar = false;

    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case ARROW_LEFT:
          bird.shiftLeft();
          break;

        case ARROW_UP:
          bird.shiftUp();
          break;

        case ARROW_RIGHT:
          bird.shiftRight();
          break;

        case ARROW_DOWN:
          bird.shiftDown();
          break;

        case SPACEBAR:
          bird.stopControls();
          bird.initProjectile();
          this.spaceBar = true;

          break;
      };
    });
  }
}
