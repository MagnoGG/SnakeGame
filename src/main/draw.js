/**
 * Depending on the gameState draw the game
 * 
 * This is the main script:
 *  · Draw the new frames
 *  · Button event control
 *  · Update game variables and objects
 */
function draw()
{
    background(30);

    switch(gameVariable.gameState)
    {
        //Start menu
        case 0:
            frameRate(15);

            switch (gui.start.render())
            {
                //Start to play
                case "play":
                    gameVariable.lives = gameVariable.maxLives;
                    gameVariable.gameState = 1;
                    break;

                //Change max lives
                case "+lives": if (gameVariable.maxLives < 5) gameVariable.maxLives++; break;
                case "-lives": if (gameVariable.maxLives > 1) gameVariable.maxLives--; break;

                //Change dificulty
                case "dif":
                    switch(gameVariable.dificulty)
                    {
                        case   1: gameVariable.dificulty = 1.5; break;
                        case 1.5: gameVariable.dificulty =   2; break;
                        case   2: gameVariable.dificulty =   1;
                    }
            }
            break;

        //Playing
        case 1:
            frameRate(4 * gameVariable.dificulty);

            //Show controls if the player has not started yet
            if (gameVariable.score === 0 && gameVariable.lives === gameVariable.maxLives)
                gui.game.renderControlInfo();
            
            //Check if it is dead or need to generate a new position 
            switch (game.snake.update(game.food))
            {
                case "dead":
                    gameVariable.lives--;
                    game.snake.startBlink();
                    if (gameVariable.lives <= 0) gameVariable.gameState = 3; //Game over
                    break;
                case "position":
                    gameVariable.score++;
                    game.food.newPosition(game.snake);
            }
            gui.game  .renderGame();
            game.food .render();
            game.snake.render();
            break;

        //Pause menu
        case 2:
            frameRate(30);
            game.snake.render();
            game.food .render();
            switch (gui.game.renderPause())
            {
                case "play": gameVariable.gameState = 1; clearAll(); break;
                case "menu": gameVariable.gameState = 0; clearAll();
            }
            break;

        //Game over menu
        case 3:
            frameRate(30);

            //Start again or return to menu
            switch (gui.over.render())
            {
                case "play": gameVariable.gameState = 1; clearAll(); break;
                case "menu": gameVariable.gameState = 0; clearAll();
            }
    }
}