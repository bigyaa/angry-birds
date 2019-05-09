class InputHandler {
  constructor(bird) {

    this.bird = bird;
    this.initialPointerPosition = {
      x: 0,
      y: 0
    };

    this.finalPointerPosition = {
      x: 0,
      y: 0
    };

    // Controls for keyboard events
    document.addEventListener('keydown', (event) => {
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

    /*     // Controls for mouse events
        birdEvent.addEventListener('mousedown', (event) => {
          mouseEvent = true;

          this.initialPointerPosition.x = event.clientX;
          this.initialPointerPosition.y = event.clientY;
        });

        birdEvent.addEventListener('mouseup', (event) => {
          this.finalPointerPosition.x = event.clientX;
          this.finalPointerPosition.y = event.clientY;

          releaseBird = true;
        }); */

  }
}

