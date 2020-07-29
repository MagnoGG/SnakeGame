# SnakeGame
Classic arcade game where you have to eat to increase the score and avoid colliding with your own tail.
Created with [p5.js library](https://p5js.org/)!

**Note**: This proyect is not finish yet. Wait for updates!

## Update information
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