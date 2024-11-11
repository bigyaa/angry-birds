let canvas = document.getElementById('canvas');
let sound = document.getElementById('mainAudio');
let startScreen = document.getElementById('startScreen');

let angryBirds = new Game(canvas);

sound.play();

startScreen.addEventListener('click', () => {
  startScreen.style.display = 'none';
  sound.pause();
  angryBirds.startGameLoop();
});
