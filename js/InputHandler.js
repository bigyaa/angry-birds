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
              !angryBirds.spaceBar
            ) {
              this.bird.stopControls();
              this.bird.initProjectile();
              this.birdSoundOnLaunch.play();

              angryBirds.spaceBar = true;
            }

            break;
        };
      }
    );

    let mouseStartX;
    let mouseStartY;
    let mouseIsDragging = false;

    document.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return
      }

      mouseStartX = event.pageX
      mouseStartY = event.pageY
      mouseIsDragging = true
    })

    document.addEventListener('mousemove', (event) => {
      if (mouseIsDragging) {
        const diffX = event.pageX - this.bird.position.x;
        if (diffX > this.bird.shiftingDistance.x) {
          this.bird.shiftRight()
        } else if (-diffX > this.bird.shiftingDistance.x) {
          this.bird.shiftLeft()
        }

        const diffY = event.pageY - this.bird.position.y;
        if (diffY > this.bird.shiftingDistance.y) {
          this.bird.shiftDown()
        } else if (-diffY > this.bird.shiftingDistance.y) {
          this.bird.shiftUp()
        }
      }
    })

    document.addEventListener('mouseup', (event) => {
      if (
        mouseIsDragging
        && event.pageX !== mouseStartX
        && event.pageY !== mouseStartY
      ) {
        const diffX = Math.abs(event.pageX - mouseStartX);
        const diffY = Math.abs(event.pageY - mouseStartY);
        const threshold = 10;

        if (diffX > threshold || diffY > threshold) {
          if (
            this.bird.listen
            && !angryBirds.spaceBar
          ) {
            this.bird.stopControls();
            this.bird.initProjectile();
            this.birdSoundOnLaunch.play();

            angryBirds.spaceBar = true;
          }
        }
      }

      mouseIsDragging = false
    })
  }

  updateInputHandler(newBird) {
    this.bird = newBird;
  }
}
