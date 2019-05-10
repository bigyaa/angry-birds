class InputHandler {

  constructor(bird) {

    this.bird = bird;

    // Controls for keyboard events
    document.addEventListener('keydown',
      (event) => {
        switch (event.keyCode) {
          case ARROW_LEFT:
            if (listen) {
              this.bird.shiftLeft();
            }
            break;


          case ARROW_UP:
            if (listen) {
              this.bird.shiftUp();
            }
            break;


          case ARROW_RIGHT:
            if (listen) {
              this.bird.shiftRight();
            }
            break;


          case ARROW_DOWN:
            if (listen) {
              this.bird.shiftDown();
            }
            break;


          case SPACEBAR:
            if (listen) {
              if (!spaceBar) {
                spaceBar = true;

                this.bird.stopControls();
                this.bird.initProjectile();
              }
            }

            break;
        };
      });
  }

  updateInputHandler(bird) {
    this.bird = bird;
  }
}

