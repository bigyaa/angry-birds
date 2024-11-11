import InputHandler from './InputHandler';

let birdMock;
let birdSoundMock;
let spaceBar;

beforeEach(() => {
  birdMock = {
    position: { x: 0, y: 0 },
    initialPosition: { x: 0, y: 0 },
    shiftingDistance: { x: 10, y: 10 },
    shiftRight: jest.fn(),
    shiftLeft: jest.fn(),
    shiftUp: jest.fn(),
    shiftDown: jest.fn(),
    stopControls: jest.fn(),
    initProjectile: jest.fn(),
    listen: true,
    collision: false,
    resetAttributes: jest.fn(),
  };

  birdSoundMock = { play: jest.fn() };

  // Mock the Audio class for bird launch sound
  global.Audio = jest.fn(() => birdSoundMock);

  // Mock the spaceBar object
  spaceBar = { value: false };

  // Create a new InputHandler instance
  inputHandler = new InputHandler(birdMock, spaceBar);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('InputHandler', () => {
  test('should start dragging on left mousedown', () => {
    const event = new MouseEvent('mousedown', { button: 0, pageX: 50, pageY: 50 });
    document.dispatchEvent(event);

    expect(inputHandler.mouseIsDragging).toBe(true);
    expect(inputHandler.mouseStartX).toBe(50);
    expect(inputHandler.mouseStartY).toBe(50);
  });

  test('should not start dragging on non-left mouse button', () => {
    const event = new MouseEvent('mousedown', { button: 1 });
    document.dispatchEvent(event);

    expect(inputHandler.mouseIsDragging).toBe(false);
  });

  test('should stop dragging on mouseup', () => {
    const event = new MouseEvent('mouseup');
    document.dispatchEvent(event);

    expect(inputHandler.mouseIsDragging).toBe(false);
  });

  test('should handle mousemove and shift bird position', () => {
    inputHandler.mouseIsDragging = true;
    birdMock.position = { x: 20, y: 20 };

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 40, pageY: 10 }));

    expect(birdMock.shiftRight).toHaveBeenCalled();
    expect(birdMock.shiftUp).toHaveBeenCalled();
  });

  test('should not move bird if not dragging', () => {
    inputHandler.mouseIsDragging = false;

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 30, pageY: 30 }));

    expect(birdMock.shiftRight).not.toHaveBeenCalled();
    expect(birdMock.shiftLeft).not.toHaveBeenCalled();
    expect(birdMock.shiftUp).not.toHaveBeenCalled();
    expect(birdMock.shiftDown).not.toHaveBeenCalled();
  });

  test('should launch bird when conditions are met', () => {
    inputHandler.mouseIsDragging = true;
    birdMock.position = { x: 20, y: 20 };

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 50, pageY: 50 }));

    expect(birdMock.stopControls).toHaveBeenCalled();
    expect(birdMock.initProjectile).toHaveBeenCalled();
    expect(birdSoundMock.play).toHaveBeenCalled();
    expect(spaceBar.value).toBe(true);
  });

  test('should not launch bird if spaceBar is already true', () => {
    spaceBar.value = true;
    inputHandler.mouseIsDragging = true;

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 50, pageY: 50 }));

    expect(birdMock.initProjectile).not.toHaveBeenCalled();
    expect(birdSoundMock.play).not.toHaveBeenCalled();
  });

  test('should update bird object with new bird', () => {
    const newBirdMock = {
      ...birdMock,
      position: { x: 10, y: 10 },
      initialPosition: { x: 10, y: 10 },
    };
    inputHandler.updateInputHandler(newBirdMock);

    expect(inputHandler.bird).toBe(newBirdMock);
  });

  test('should reset bird position after launch when updated with a new bird', () => {
    inputHandler.mouseIsDragging = true;
    birdMock.position = { x: 20, y: 20 };

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 30, pageY: 30 }));
    const newBirdMock = { ...birdMock, position: { x: 0, y: 0 } };
    inputHandler.updateInputHandler(newBirdMock);

    expect(newBirdMock.position).toEqual(newBirdMock.initialPosition);
  });

  test('should allow bird to relaunch after spaceBar is reset', () => {
    inputHandler.mouseIsDragging = true;
    birdMock.position = { x: 20, y: 20 };
    spaceBar.value = true;

    spaceBar.value = false; // Reset spaceBar to allow relaunch
    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 50, pageY: 50 }));

    expect(birdMock.stopControls).toHaveBeenCalled();
    expect(birdMock.initProjectile).toHaveBeenCalled();
    expect(spaceBar.value).toBe(true);
  });

  test('should not shift bird if mouse is not dragging', () => {
    inputHandler.mouseIsDragging = false;

    document.dispatchEvent(new MouseEvent('mousemove', { pageX: 100, pageY: 100 }));

    expect(birdMock.shiftRight).not.toHaveBeenCalled();
    expect(birdMock.shiftLeft).not.toHaveBeenCalled();
    expect(birdMock.shiftUp).not.toHaveBeenCalled();
    expect(birdMock.shiftDown).not.toHaveBeenCalled();
  });
});