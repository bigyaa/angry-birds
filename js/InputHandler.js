class InputHandler {
  constructor(bird, gameLoop) {

    document.addEventListener('keydown', function birdController(event) {
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
          document.removeEventListener('keydown', birdController(event));
          break;
      };
    });
  }
}
