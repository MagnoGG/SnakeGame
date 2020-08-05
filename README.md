# SnakeGame
Classic arcade game where you have to eat to increase the score and avoid colliding with your own tail.
Created with [p5.js library](https://p5js.org/)!

**Note**: This proyect is not finish yet. Wait for updates!

![SnkeGame tilte animation](./doc/SnkeTitle.gif)

## Setup
* Clone the repository using [git](https://git-scm.com/downloads): `git clone https://github.com/MagnoGG/SnakeGame.git` Or [download the zip file](https://github.com/MagnoGG/SnakeGame/archive/master.zip) and extract them into any folder.
* To run the program, we recommend you to use the `SnkeGame-complete.html` file. It contains all the necesary for the full version of the game, thus you can move it to any other folder (requires internet connection). Otherwise, `SnkeGame.html` needs to be on the folder with all the data for the game (`src/GUI/.`, `src/main/.`, `lib/.` ...).

## Files information
 `SnkeGame`
  ├─ `lib`: Used libraries
  │   ├─ `p5.min.js`: [p5 library](https://p5js.org/) (small version).
  │   └─ `button.js`: Library created by us used to create buttons using p5.
  ├─ `src`: Game files
  │   ├─ `gameObjects`: Objects of the game.
  │   │   ├─ `food.js`: Contains the _Food_ object.
  │   │   └─ `snake.js`: Contains the _Snake_ object.
  │   ├─ `GUI`: Graphic User Interface for the game.
  │   │   ├─ `game.js`: Contains the _GameGUI_ object. Renders the pause menu too.
  │   │   ├─ `over.js`: Contains the _GameOverMenu_ object.
  │   │   └─ `start.js`: Contains the _StartMenu_ object. 
  │   └─ `main`: Main scripts
  │       ├─ `draw`: Renders each frame depending on the game state: Start, Game, Pause...
  │       └─ `global`: Prepares the variables and controls the events.
  ├─ `stl`: Styles of the page.
  │   ├─ `fonts`: Used fonts (not implemented yet).
  │   │   └─ `NovaSquare-Regular.ttf`
  │   └─ `styles.css`
  ├─ `LICENSE`
  ├─ `README.md`
  ├─ `SnkeGame.html`
  ├─ `SnkeGame-complete.html`
  └─ `SnkeTitle.gif`: Preview of the animated tilte.

## Update information

### **v1.2** - 4th commit
* Now, the canvas on the game will resize depending on the free space avaliable.
* README.md updated.

### **v1.1** - 3rd commit
* Bug fixed: control the snake with the mouse/finger was not working properly.
* Now you can access to the pause menu by pressing the new button.
* Now the buttons on the pause menu match with the style of the menu.
* Added new file: `SnkeGame-complete.html`. This new file contains all the game, and it is the only file needed to run it (include all the code). This is also the file needed to run the program on mobile.

### **v1.0** - 2nd commit
* New features:
    * The start animation happens x3 faster.
    * Now, on the start menu you can change the maximum lives and the dificulty (which is no longer the size of the snake, now it is its speed).
    * When you start a new game (score is 0 and you have maximum lives) now it is shown drawings of the controls of the snake, using the arrows or the mouse/touching.
    * Game over menu updated.
    * Now, on the pause menu, you have extra options: return to menu and play again.
* Solved bugs:
    * Coming to the start menu through the Game Over menu caused the title animation problem.
    * The start menu animation was starting too soon.
    * The play button on the start menu was starting too soon.
    * On the start menu animation there was a square appearing where it should not be.
    * `button.js`: now only return if the button have been pressed when the mouse is released. Otherwise, on the start menu, in order to increase the max lives, it becomes uncontrollable. 
* README updated
* Optimization, refactoring and cleaning. Now, it all should be easier to read.
    * `button.js`: deleted **154 lines** of code.
    * `main.js`: divided in 2 files: global (contains global variables, objects and functions) and draw (draw each frame).
    * `gui.js`: divided into 3 classes: Startmenu, GameGUI and GameOverMenu. All of them are now situated in the `src/GUI` folder
    * `snake.js`: deleted 71 lines of code.
    * `food.js`: deleted 20 lines of code.
    
### **v0.0** - 1st commit
 * Adding files for the basic game:
    * `SnkeGame.html`
    * `src` folder:
        * `main.js`: setup the system, draw each frame, control the events, the game variables and the game objects
        * `snake.js`: controls and renders the snake (player)
        * `food.js`: controls and renders the target of the snake
        * `gui.js`: controls and renders the GUI of the game
    * `lib` folder:
        * `p5.min.js`: p5 library
        * `button.js`: library to create buttons

## Contact information