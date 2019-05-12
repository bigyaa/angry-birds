class InputHandler {

  constructor(bird) {

    this.bird = bird;

    this.birdSoundOnLaunch = document.getElementById("birdOnLaunch");

    document.addEventListener('keydown',
      (event) => {
        switch (event.keyCode) {

          case ARROW_LEFT:

            if (angryBirds.listen) {
              this.bird.shiftLeft();
            }

            break;


          case ARROW_UP:

            if (angryBirds.listen) {
              this.bird.shiftUp();
            }

            break;


          case ARROW_RIGHT:

            if (angryBirds.listen) {
              this.bird.shiftRight();
            }

            break;


          case ARROW_DOWN:

            if (angryBirds.listen) {
              this.bird.shiftDown();
            }

            break;


          case SPACEBAR:
            if (angryBirds.listen &&
              !angryBirds.spaceBar) {
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

