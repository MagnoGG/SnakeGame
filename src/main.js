/*
la escala se inicia en 30
gui->start->cambiar dificultad en la parte inferior
gui->start->cambiar vidas max
gui->gameover->boton volver al menu
usar un tipo de letra
*/

/**
 * SNAKE GAME
 * This is the classic snake game. It
 * have to eat all the red dots to grow,
 * but careful, you lose if it touches
 * itself o goes out the edge.
 * 
 * This is the main program:
 *  · Set up the system
 *  · Draw the new frames
 *  · Event control
 */

//Global variables
//
//Determinate current state of the game
// · 0 = start menu
// · 1 = playing
// · 2 = pause
// · 3 = game over menu
// · 4 = configuration menu?
let gameState;

//How big is the grid where the objects apear
//It have to be divisor of the width and height
let scale;

//How many lives left
let lives;

//How many times can the player 
//lose until restart the game
let maxLives;

//Score of the player
let score;

//Store mouse position to create a vector and
//determine in which direction moved the mouse
//while pressed
let lastMouseX;
let lastMouseY;

let font;

//Game Objects
let snake;
let food;
let gui;

/*function preload()
{
    font = loadFont("./lib/fonts/NovaSquare-Regular.ttf");
}*/
function setup()
{
    //Creating a canvas and linking it
    //to the html
    let canvas = createCanvas(600, 600);
    canvas.parent("game");

    gameState = 0;
    scale = 30;
    maxLives = 3;
    lives = maxLives;
    score = 0;

    snake = new Snake();
    food  = new Food();
    gui   = new GUI();
    frameRate(5);
}

//Depending on the gameState draw the game
function draw()
{
    background(30);

    switch(gameState)
    {
        case 0:     //Start menu
            //frameRate(5);
            let temp = gui.renderStartMenu();
            if (temp != undefined)
                gameState = temp;
            break;
        case 1:     //Playing
            frameRate(5);
            //Check if it is dead
            if (snake.update(food) == false)
            {   
                lives--;
                if (lives  <= 0)
                    gameState = 3;      //Game over
                else
                    snake.restart();    //Restart the snake position & speed
            }
            gui.renderGameUI();
            food.render();
            snake.render();
            break;
        case 2:     //Pause menu
            frameRate(30);
            snake.render();
            food.render();
            gui.renderPause();
            break;
        case 3:     //Game over menu
            frameRate(30);
            if (gui.renderGameOver())
            {
                gameState = 1;
                score = 0;
                lives = maxLives;
                snake.clear();
                gui.clear();
            }
            break;
        default:    //Error
            throw "error in game logic: gameState is not in range (main.js -> draw())";
    }//*/
}

//Keyboard event
function keyPressed()
{
    //If we are playing, control the snake
    switch (gameState)
    {
        case 1:
            //Depending which key is pressed, the snake
            //speed is changed.
            //If the snake is moving along the X axis, the
            //player should not be able to move more on the X axis
            //The snake can only be moved perpendicularly
            switch (keyCode)
            {
                case LEFT_ARROW:
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.yspeed != 0)
                        snake.setSpeed(-1, 0);
                    break;
                case RIGHT_ARROW:
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.yspeed != 0)
                        snake.setSpeed(1, 0);
                    break;
                case DOWN_ARROW:
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.xspeed != 0)
                        snake.setSpeed(0, 1);
                    break;
                case UP_ARROW:
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.xspeed != 0)
                        snake.setSpeed(0, -1);
                    break;
                case 32:    //If the space bar is pressed, set pause
                    gameState = 2;
            }
            break;
        case 2:     //Continue playing
            if (keyCode == 32)
                gameState = 1;
    }
    return false;
}
//Mouse event
function mousePressed()
{
    //Only if the mouse is on the canvas
    if (mouseX >= 0 && mouseX <= width &&
        mouseY >= 0 && mouseY <= height)
    {
        if (gameState == 1)
        {
            //If we are playing, store the position when the clic starts
            lastMouseX = mouseX;
            lastMouseY = mouseY;
        }
    }
    return false;
}
function mouseReleased()
{
    //Only if the mouse is on the canvas
    if (mouseX >= 0 && mouseX <= width &&
        mouseY >= 0 && mouseY <= height)
    {
        //If we are playing, control the snake
        if (gameState == 1)
        {
            //Create a vector of the mouse movement while pressed
            let movement = createVector(mouseX - lastMouseX, mouseY - lastMouseY);

            //We only need to move in one axis, so we determinate
            //which axis had more movement
            if (abs(movement.x) > abs(movement.y))
            {
                if (movement.x < 0)
                {
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.yspeed != 0)
                        snake.setSpeed(-1, 0);
                }
                else if (movement.x > 0)
                {
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.yspeed != 0)
                        snake.setSpeed(1, 0);
                }
            }
            else if (Math.abs(movement.x) < Math.abs( movement.y))
            {
                if (movement.y < 0)
                {
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.xspeed != 0)
                        snake.setSpeed(0, -1);
                }
                else if (movement.y > 0)
                {
                    if ((snake.xspeed == 0 && snake.yspeed == 0) || snake.xspeed != 0)
                        snake.setSpeed(0, 1);
                }
            }
        }
    }
    return false;
}