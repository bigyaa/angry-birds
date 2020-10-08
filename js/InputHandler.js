class InputHandler {

  constructor(bird) {

    this.bird = bird;

    this.birdSoundOnLaunch = document.getElementById("birdOnLaunch");

    document.addEventListener('keydown',
      (event) => {
        switch (event.keyCode) {

          case ARROW_LEFT:

            if (this.bird.listen) {
              this.bird.shiftLeft();
            }

            break;


          case ARROW_UP:

            if (this.bird.listen) {
              this.bird.shiftUp();
            }

            break;


          case ARROW_RIGHT:

            if (this.bird.listen) {
              this.bird.shiftRight();
            }

            break;


          case ARROW_DOWN:

            if (this.bird.listen) {
              this.bird.shiftDown();
            }

            break;


          case SPACEBAR:
            if (this.bird.listen &&
              !angryBirds.spaceBar &&
              ((this.bird.position.x != this.bird.initialPosition.x) ||
              (this.bird.position.y != this.bird.initialPosition.y))
            ) {
              this.bird.stopControls();
              this.bird.initProjectile();
              this.birdSoundOnLaunch.play();

              angryBirds.spaceBar = true;
            }

            break;
        };
      });
  }

  updateInputHandler(newBird) {
    this.bird = newBird;
  }
}

