import Game from './Game.js';

window.onload = () => {
  // Get DOM elements after the window is fully loaded
  const canvas = document.getElementById('canvas');
  const sound = document.getElementById('mainAudio');
  const startScreen = document.getElementById('startScreen');

  // Check if elements are loaded correctly
  if (!canvas || !sound || !startScreen) {
    console.error('Error: One or more DOM elements could not be found.');
    return;
  }

  // Play background music when the user clicks to start the game
  startScreen.addEventListener('click', () => {
    startScreen.style.display = 'none';

    // Initialize the game instance
    const gameInstance = new Game(canvas);

    // Play background music after user interaction
    sound.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  });
};
