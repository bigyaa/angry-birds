class InputHandler {

  constructor(bird) {

    this.bird = bird;

    // Controls for keyboard events
    document.addEventListener('keydown',
      (event) => {
        switch (event.keyCode) {
          case ARROW_LEFT:
            this.bird.shiftLeft();

            break;

          case ARROW_UP:
            this.bird.shiftUp();

            break;

          case ARROW_RIGHT:
            this.bird.shiftRight();

            break;

          case ARROW_DOWN:
            this.bird.shiftDown();

            break;

          case SPACEBAR:
            if (!spaceBar) {
              spaceBar = true;

              this.bird.stopControls();
              this.bird.initProjectile();
            }

            break;
        };
      });
  }

  updateInputHandler(bird) {
    this.bird = bird;
  }
}

