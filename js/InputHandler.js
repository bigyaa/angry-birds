class InputHandler {

  constructor(bird) {

    this.bird = bird;
    this.birdSoundOnLaunch = document.getElementById("birdOnLaunch");
    this.slingStretchedSound = document.getElementById("slingStretched");

    // Controls for keyboard events
    document.addEventListener('keydown',
      (event) => {
        switch (event.keyCode) {
          case ARROW_LEFT:
            if (angryBirds.listen) {
              this.slingStretchedSound.play();

              this.bird.shiftLeft();
            }
            break;


          case ARROW_UP:
            if (angryBirds.listen) {
              this.slingStretchedSound.play();

              this.bird.shiftUp();
            }
            break;


          case ARROW_RIGHT:
            if (angryBirds.listen) {
              this.slingStretchedSound.play();

              this.bird.shiftRight();
            }
            break;


          case ARROW_DOWN:
            if (angryBirds.listen) {
              this.slingStretchedSound.play();

              this.bird.shiftDown();
            }
            break;


          case SPACEBAR:
            if (angryBirds.listen) {
              if (!angryBirds.spaceBar) {
                angryBirds.spaceBar = true;

                this.birdSoundOnLaunch.play();
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

