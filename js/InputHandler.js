class InputHandler {
  constructor(bird, gameLoop) {

    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 37:
          bird.shiftLeft();
          break;

        case 38:
          bird.shiftUp();
          break;

        case 39:
          bird.shiftRight();
          break;

        case 40:
          bird.shiftDown();
          break;

        case 32:
          bird.launch();
          break;
      };
    });

    // document.addEventListener('keyup', event => {
    //   switch (event.keyCode) {
    //     case 37:
    //       bird.shiftLeft();
    //       break;

    //     case 38:
    //       bird.shiftUp();
    //       break;

    //     case 39:
    //       bird.shiftRight();
    //       break;

    //     case 40:
    //       bird.shiftDown();
    //       break;

    //     case 32:
    //       gameLoop();
    //       break;
    //   };
    // });
  }
}
