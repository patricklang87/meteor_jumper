/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

let Field;
let keyListeners = [];

const px = (n) => `${n}px`;
const man = () => document.getElementById('man');
// jsdom doesn't implement innerText, which the game uses for messages, so read both.
const announcement = () => {
  const div = document.getElementById('announcementDiv');
  return `${div.innerText ?? ''} ${div.textContent}`;
};
const status = () => document.getElementById('statusBar').textContent;
const press = (key) => window.dispatchEvent(new KeyboardEvent('keyup', { key }));

// Build a board from rows of symbols: X ship, H astronaut, O / A asteroids, C bolt, F empty space.
const startBoard = (rows) => {
  new Field(rows.map((row) => row.split(''))).generateBrowserField();
};

beforeEach(() => {
  jest.useFakeTimers();
  document.documentElement.innerHTML = html.replace(/<script[\s\S]*?<\/script>/g, '');
  window.HTMLMediaElement.prototype.play = jest.fn();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  // Keep the astronaut still (it only moves when Math.random() * 100 < 33).
  jest.spyOn(Math, 'random').mockReturnValue(0.99);
  const addEventListener = window.addEventListener.bind(window);
  jest.spyOn(window, 'addEventListener').mockImplementation((type, listener, options) => {
    if (type === 'keyup') keyListeners.push(listener);
    addEventListener(type, listener, options);
  });
  jest.isolateModules(() => {
    ({ Field } = require('../index.js'));
  });
});

afterEach(() => {
  keyListeners.forEach((listener) => window.removeEventListener('keyup', listener));
  keyListeners = [];
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('Field.createField', () => {
  beforeEach(() => Math.random.mockRestore());

  it('builds a board of the requested size with the ship and astronaut placed', () => {
    const field = Field.createField(8, 12, 5);
    expect(field).toHaveLength(12);
    field.forEach((row) => expect(row).toHaveLength(8));
    expect(field[0][0]).toBe('X');
    expect(field[10]).toContain('H');
    expect(field.flat().filter((cell) => cell === 'H')).toHaveLength(1);
    field.flat().forEach((cell) => expect('XHOACF').toContain(cell));
  });

  it('places more asteroids at higher difficulty', () => {
    const asteroidShare = (difficulty) => {
      let asteroids = 0;
      for (let i = 0; i < 20; i++) {
        asteroids += Field.createField(20, 20, difficulty)
          .flat()
          .filter((cell) => cell === 'O' || cell === 'A').length;
      }
      return asteroids / (20 * 20 * 20);
    };
    expect(asteroidShare(15)).toBeGreaterThan(asteroidShare(1));
  });
});

describe('rendering the board', () => {
  it('draws each piece at its grid position', () => {
    startBoard(['XFO', 'FFC', 'FHA']);
    const fieldVisual = document.getElementById('fieldVisual');
    expect(fieldVisual.style.width).toBe('150px');
    expect(fieldVisual.style.height).toBe('150px');
    expect(man().style.left).toBe('0px');
    expect(document.getElementById('hat').style.top).toBe('100px');
    expect(document.querySelectorAll('.hole')).toHaveLength(2);
    expect(document.querySelectorAll('.altMeteor')).toHaveLength(1);
    expect(document.querySelector('.chicken').style.left).toBe('100px');
  });
});

describe('asteroid movement', () => {
  it('moves asteroids one square per turn and wraps them around the edges', () => {
    startBoard(['XFF', 'FFF', 'OFH']);
    const asteroid = document.querySelector('.hole');
    Field.updateElementCoords('hole', 'left');
    expect(asteroid.style.left).toBe(px(100)); // wrapped from the left edge to the right
    Field.updateElementCoords('hole', 'up');
    expect(asteroid.style.top).toBe(px(50));
    Field.updateElementCoords('hole', 'down');
    Field.updateElementCoords('hole', 'down');
    expect(asteroid.style.top).toBe(px(0)); // wrapped from the bottom edge to the top
  });
});

describe('playing a turn', () => {
  it('moves the ship with the arrow keys', () => {
    startBoard(['XFFF', 'FFFF', 'FFFF', 'FFFH']);
    press('ArrowRight');
    press('ArrowDown');
    expect(man().style.left).toBe(px(50));
    expect(man().style.top).toBe(px(50));
    press('ArrowLeft');
    press('ArrowUp');
    expect(man().style.left).toBe(px(0));
    expect(man().style.top).toBe(px(0));
  });

  it('wins by reaching the astronaut', () => {
    startBoard(['XFF', 'HFF', 'FFF']);
    press('ArrowDown');
    expect(announcement()).toMatch(/you feast on delicious earthling/i);
    expect(announcement()).toMatch(/Score: \d+ points/);
    expect(document.getElementById('hat').src).toMatch(/skeleton\.gif$/);
  });

  it('loses by leaving the board', () => {
    startBoard(['XFF', 'FFF', 'FFH']);
    press('ArrowUp');
    expect(announcement()).toMatch(/cosmic undertow/i);
  });

  it('loses a life when an oncoming asteroid hits the ship, and the game when out of lives', () => {
    // Asteroids drift one square left each turn, so they meet the ship as it moves right.
    startBoard(['XFOOF', 'FFFFF', 'FFFFF', 'FFFFH']);
    press('ArrowRight');
    expect(status()).toBe('Lives: 0');
    expect(announcement()).not.toMatch(/broke all your bones/i);

    press('b'); // hold still while the second asteroid arrives
    expect(status()).toBe('Lives: 0');
    expect(announcement()).toMatch(/broke all your bones/i);
  });

  it('gains a life by catching a lightning bolt', () => {
    // Bolts drift upward, so this one meets the ship as it moves down.
    startBoard(['XFF', 'FFF', 'CFF', 'FFH']);
    press('ArrowDown');
    expect(status()).toBe('Lives: 2');
    expect(document.querySelector('.chicken')).toBeNull();
  });

  it('resets the board after a game', () => {
    startBoard(['XFF', 'HFF', 'FFF']);
    press('ArrowDown');
    document.querySelector('input[value="Play Again"]').click();
    expect(document.getElementById('fieldDiv').children).toHaveLength(0);
    expect(document.getElementById('setupDiv').style.display).toBe('block');
  });
});
