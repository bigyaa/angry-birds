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
            if (listen) {
              this.slingStretchedSound.play();

              this.bird.shiftLeft();
            }
            break;


          case ARROW_UP:
            if (listen) {
              this.slingStretchedSound.play();

              this.bird.shiftUp();
            }
            break;


          case ARROW_RIGHT:
            if (listen) {
              this.slingStretchedSound.play();

              this.bird.shiftRight();
            }
            break;


          case ARROW_DOWN:
            if (listen) {
              this.slingStretchedSound.play();

              this.bird.shiftDown();
            }
            break;


          case SPACEBAR:
            if (listen) {
              if (!spaceBar) {
                spaceBar = true;

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

