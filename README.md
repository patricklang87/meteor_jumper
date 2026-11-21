<h1 align="center">Meteor Jumper</h1>

<p align="center">A simple frontend game written to practice object oriented programming in vanilla JavaScript.</p>

## Links

- [Play it on GitHub Pages](https://patricklang87.github.io/meteor_jumper/)
- [Repo](https://github.com/patricklang87/meteor_jumper "Meteor Jumper Repo")

## How to play

- The goal of the game is to find and devour the astronaut floating somewhere near the end of the game field.
- Avoid hitting asteroids or leaving the game field. Lightning bolts give you an extra life.
- On a computer, use the arrow keys to control your ship. Press B to hold still while the asteroids advance. On mobile, tap the screen in the direction you wish to travel, or tap on your spaceship to hold still. Moving toward an oncoming asteroid allows you to jump it.

## Run the project

There's no build step: open `index.html` in a browser, or serve the folder (for example `npx serve .`).

## Run the tests

```bash
npm install
npm test
```

Jest runs the real `index.html` and `index.js` in jsdom. The tests cover board generation (size, piece placement, difficulty), rendering, asteroids drifting and wrapping around the edges, arrow-key movement, every way a game can end (reaching the astronaut, leaving the board, running out of lives), and catching lightning bolts for extra lives. Tests run on every push and pull request via GitHub Actions.

## Screenshots

![startscreen](https://user-images.githubusercontent.com/73432960/132588414-56bfc016-1c8a-4d2c-9738-45f9de1adc68.JPG)
![gamestart](https://user-images.githubusercontent.com/73432960/132588416-ec5c15de-2a67-4f65-993d-b14fde9749d0.JPG)
![gameplay](https://user-images.githubusercontent.com/73432960/132588422-5ea7b218-f4ab-436d-b6df-f20566490c5d.JPG)
![victory](https://user-images.githubusercontent.com/73432960/132588428-6db45515-89c2-449f-aa42-217b7ece841c.JPG)

## Built with

- JavaScript (ES6 classes), HTML, CSS
- Jest + jsdom for tests

## Potential Future Updates

- [ ] Fix footer formatting and improve mobile formatting.
- [ ] Creation of story mode.
- [ ] Animation of asteroid progression.
- [ ] Creation of user profiles.
- [ ] Addition of Two-Player Racing Mode.
 
## Author

**Patrick Lang**

- [Profile](https://github.com/patricklang87 "Patrick Lang")
- [Email](mailto:patricklang87@gmail.com?subject=MeteorJumper "Meteor Jumper")
