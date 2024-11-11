const canvas = document.getElementById('canvas');
const sound = document.getElementById('mainAudio');
const startScreen = document.getElementById('startScreen');

const gameInstance = new Game(canvas);

sound.play();

startScreen.addEventListener('click', () => {
  startScreen.style.display = 'none';
  sound.pause();
  gameInstance.startGameLoop();
});
