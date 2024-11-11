// Class to handle input events for the bird
class InputHandler {
  constructor(birdObject, game) {
    this.bird = birdObject;
    this.game = game; // Reference to the Game instance
    this.mouseStartX = 0;
    this.mouseStartY = 0;
    this.mouseIsDragging = false;
    this.birdSoundOnLaunch = new Audio('./sounds/bird-launch.mp3');

    // Set up event listeners
    document.addEventListener('keydown', this.handleKeydown.bind(this));
    document.addEventListener('mousedown', this.handleMousedown.bind(this));
    document.addEventListener('mousemove', this.handleMousemove.bind(this));
    document.addEventListener('mouseup', this.handleMouseup.bind(this));
  }

  /**
   * Updates the bird object with a new bird.
   * Ensures the new bird is valid before assigning it.
   */
  updateInputHandler(newBird) {
    if (newBird && typeof newBird === 'object') {
      this.bird = newBird;
    }
  }

  /**
   * Handles keydown events to launch the bird when the spacebar is pressed.
   * Ensures that the bird is ready to be launched and the game is in the correct state.
   */
  handleKeydown(event) {
    if (event.code === 'Space' && this.bird && this.bird.listen && !this.game.spaceBar) {
      this.launchBird();
    }
  }

  /**
   * Handles mouse down event to start dragging.
   */
  handleMousedown(event) {
    if (event.button !== 0 || !this.bird || !this.bird.listen) return; // Ensure it's the left mouse button and bird is ready
    this.mouseStartX = event.pageX;
    this.mouseStartY = event.pageY;
    this.mouseIsDragging = true;
  }

  /**
   * Handles mouse move event to control bird's movement.
   */
  handleMousemove(event) {
    if (!this.mouseIsDragging || !this.bird || !this.bird.listen) return;

    const diffX = event.pageX - this.mouseStartX;
    const diffY = event.pageY - this.mouseStartY;

    if (Math.abs(diffX) > this.bird.shiftingDistance.x) {
      diffX > 0 ? this.bird.shiftRight() : this.bird.shiftLeft();
    }
    if (Math.abs(diffY) > this.bird.shiftingDistance.y) {
      diffY > 0 ? this.bird.shiftDown() : this.bird.shiftUp();
    }

    // Check if the bird has moved from its initial position
    const birdMoved = this.bird.position.x !== this.bird.initialPosition.x ||
                      this.bird.position.y !== this.bird.initialPosition.y;

    // Launch the bird if moved and spaceBar is not yet pressed
    if (birdMoved && !this.game.spaceBar) {
      this.launchBird();
    }
  }

  /**
   * Handles mouse up event to stop dragging.
   */
  handleMouseup() {
    this.mouseIsDragging = false;
  }

  /**
   * Launches the bird and plays the sound effect.
   */
  launchBird() {
    try {
      if (this.bird && this.bird.listen) {
        this.bird.stopControls();
        this.bird.initProjectile();
        this.birdSoundOnLaunch.play().catch((err) => {
          console.error("Failed to play sound:", err);
        });
        this.game.spaceBar = true;
      }
    } catch (error) {
      console.error("Error launching bird:", error);
    }
  }

  /**
   * Removes all event listeners to prevent memory leaks.
   */
  removeEventListeners() {
    document.removeEventListener('keydown', this.handleKeydown.bind(this));
    document.removeEventListener('mousedown', this.handleMousedown.bind(this));
    document.removeEventListener('mousemove', this.handleMousemove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseup.bind(this));
  }
}