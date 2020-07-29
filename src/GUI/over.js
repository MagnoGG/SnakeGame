/**Renders and controls the game over menu*/
class GameOverMenu
{
    constructor () 
    {
        this.clear();
        this.buttons =
        {
            playAgain : new Button(),
            startMenu : new Button()
        };
    }
    clear       () {this.iterator = 0;}

    /**Render the game over menu*/
    render()
    {
        setDefaultConfiguration();
        noStroke();

        this.iterator += 10;

        //Principal function to set text
        let renderText = function(t, x, y, s, c)
        {
            textSize(s);
            fill(c);
            text(t, x, y);
        }

        //Render the GAME OVER text
        if (height - this.iterator > 60)
            renderText("GAME OVER", 30, height - this.iterator, 60, color(200, 0, 0));
        //Render what was before and the RESULTS text
        else if (height * 2 - this.iterator > 60*2)
        {
            renderText("GAME OVER", 30, 60, 60, color(200, 0, 0));
            renderText("Results", 50, height*2 - this.iterator, 50, color(200, 200, 100));
        }
        //Render what was before and the LIVES USED message
        else if (height * 3 - this.iterator > 60*3)
        {
            renderText("GAME OVER", 30,  60, 60, color(200,   0,   0));
            renderText("Results"  , 50, 120, 50, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, 100, height*3-this.iterator, 30, color(200));
        }
        //Render what was before and the SCORE message
        else if (height * 4 - this.iterator > 60*4)
        {
            renderText("GAME OVER", 30,  60, 60, color(200,   0,   0));
            renderText("Results"  , 50, 120, 50, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, 100, 60*3, 30, color(200));
            renderText("Score: "      + gameVariable.score   , 100, height*4-this.iterator, 30, color(200));
        }
        //Render what was before and the DIFICULTY message
        else if (height * 5 - this.iterator > 60*5)
        {
            renderText("GAME OVER", 30,  60, 60, color(200,   0,   0));
            renderText("Results"  , 50, 120, 50, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, 100, 60*3, 30, color(200));
            renderText("Score: "      + gameVariable.score   , 100, 60*4, 30, color(200));
            switch (gameVariable.dificulty)
            {
                case   1: renderText("Dificulty: EASY"  , 100, height*5-this.iterator, 30, color(200)); break;
                case 1.5: renderText("Dificulty: MEDIUM", 100, height*5-this.iterator, 30, color(200)); break;
                case   2: renderText("Dificulty: HARD"  , 100, height*5-this.iterator, 30, color(200));
            }
        }
        //Render all of them
        else
        {
            renderText("GAME OVER", 30,  60, 60, color(200,   0,   0));
            renderText("Results"  , 50, 120, 50, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, 100, 60*3, 30, color(200));
            renderText("Score: "      + gameVariable.score   , 100, 60*4, 30, color(200));
            switch (gameVariable.dificulty)
            {
                case   1: renderText("Dificulty: EASY"  , 100, 60*5, 30, color(200)); break;
                case 1.5: renderText("Dificulty: MEDIUM", 100, 60*5, 30, color(200)); break;
                case   2: renderText("Dificulty: HARD"  , 100, 60*5, 30, color(200));
            }
        }
        //Render the opction buttons
        if (height * 6 - this.iterator < 60*6)
        {
            //Store any event of a button
            let event;

            //Set the play again button
            setButton(this.buttons.playAgain, "Play again");
            this.buttons.playAgain.setBounds(100, height - 40, 150, 40);

            if (this.buttons.playAgain.render() === 1) event = "play";

            //Set the return to menu button
            setButton(this.buttons.startMenu, "Return to menu");
            this.buttons.startMenu.setBounds(width - 140, height - 40, 230, 40);

            if (this.buttons.startMenu.render() === 1) event = "menu";

            return event;
        }
    }
}