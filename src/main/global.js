/**
 * SNAKE GAME
 * This is the classic snake game. It
 * have to eat all the red dots to grow,
 * but careful, you lose if it touches
 * itself o goes out the edge.
 * 
 * This is the setup program, and have the
 * event control for the mouse and keyboard
 */
 
/**Global variables*/
let gameVariable;
let gui;
let game;
let temp
 
/**Set up the system, iniciate variables*/
function setup()
{
    //Creating a canvas and linking it to the html
    createCanvas(600, 600).parent("game");

    //Initialating
    game = 
    {
        snake : new Snake(),
        food  : new Food()
    };
    gui = 
    {
        start : new StartMenu(),
        game  : new GameGUI(),
        over  : new GameOverMenu()
    };
    gameVariable = 
    {
        /*Determinate current state of the game
          · 0 = start menu
          · 1 = playing
          · 2 = pause
          · 3 = game over menu*/
        gameState : 0,
         
        /*Determinate the dificulty
        It would be how fast is the snake moving (frameRate).
          · 1   = easy
          · 1.5 = medium
          · 2   = hard*/
        dificulty : 1,
 
        //How many lives left
        lives : 3,
 
        /*How many times can the player 
        lose until restart the game*/
        maxLives : 3,
 
        //Score of the player
        score : 0
    };
    temp = 
    {
        /*Store mouse position to create a vector and
        determine in which direction moved the mouse
        while pressed*/
        lastMouseX : 0,
        lastMouseY : 0
    };
}

function keyPressed()
{
    //If we are playing, control the snake
    switch (gameVariable.gameState)
    {
        case 1:
            /*Depending which key is pressed, the snake speed is changed.
            If the snake is moving along the X axis, the player should 
            not be able to move more on the X axis. The snake can only
            be moved perpendicularly*/
            switch (keyCode)
            {
                case LEFT_ARROW:  snakeControl("x", -1,  0); break;
                case RIGHT_ARROW: snakeControl("x",  1,  0); break;
                case DOWN_ARROW:  snakeControl("y",  0,  1); break;
                case UP_ARROW:    snakeControl("y",  0, -1); break;
                case 32: gameVariable.gameState = 2; //Pause
            }
            break;
        case 2: if (keyCode === 32) gameVariable.gameState = 1;//Continue playing
    }
    return false;
}

function mousePressed()
{
    /*Only if the mouse is on the canvas & playing,
    store the position when the clic starts*/
    if (mouseX >= 0 && mouseX <= width  &&
        mouseY >= 0 && mouseY <= height &&
        gameVariable.gameState === 1)
    {
        temp.lastMouseX = mouseX;
        temp.lastMouseY = mouseY;
    }
    return false;
}

function mouseReleased()
{
    /*Only if the mouse is on the canvas & playing,
    control the snake*/
    if (mouseX >= 0 && mouseX <= width  &&
        mouseY >= 0 && mouseY <= height &&
        gameVariable.gameState === 1)
    {
        //Create a vector of the mouse movement while pressed
        let movement = createVector(mouseX - temp.lastMouseX, mouseY - temp.lastMouseY);
        /*We only need to move in one axis, so we determinate
        which axis had more movement*/
        if (abs(movement.x) > abs(movement.y))
            if      (movement.x < 0) snakeControl("x", -1, 0);
            else if (movement.x > 0) snakeControl("x",  1, 0);
        else if (abs(movement.x) < Math.abs(movement.y))
            if      (movement.y < 0) snakeControl("y", 0, -1);
            else if (movement.y > 0) snakeControl("y", 0,  1);
    }
    return false;
}

/**Clean the game variables & objects*/
function clearAll()
{
    gameVariable.score = 0;
    gameVariable.lives = gameVariable.maxLives;
    game.snake.clear();
    game.food .clear();
    gui.start .clear();
    gui.over  .clear();
}

/**Control the snake: isX determine in which axis we are moving*/
function snakeControl(isX, x, y)
{
    switch (isX)
    {
        case "x": 
            if ((game.snake.xspeed === 0 && game.snake.yspeed === 0) || game.snake.yspeed != 0)
                game.snake.setSpeed(x, y); 
            break;
        case "y": 
            if ((game.snake.xspeed === 0 && game.snake.yspeed === 0) || game.snake.xspeed != 0)
                game.snake.setSpeed(x, y);
    }
}

/**Default configuration for a button*/
function setButton(b, text)
{
    b.setText(text);
    b.setTextColor(color(255), 30);
    b.setRolloverTextColor(color(255, 255, 100));
    b.setPressedTextColor(color(255, 0, 0));

    b.setColor(false);
    b.setRolloverColor(false);
    b.setPressedColor(false);

    b.setStroke(true, 5, color(255));
    b.setRolloverStroke(true, 7, color(255, 255, 100));
    b.setPressedStroke(true, 7, color(255, 0, 0));
}

/**Set the default configuration for the render*/
function setDefaultConfiguration()
{
    textAlign(LEFT, CENTER);
    textFont("Consolas");
    textSize(30);
    textStyle(NORMAL);
 
    fill(100);
     
    stroke(30);
    strokeWeight(5);
    strokeCap(SQUARE);
    strokeJoin(MITER);
 
    noSmooth();
    rectMode(CORNER);
}