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

        this.iterator += scale/3;

        //Principal function to set text
        let renderText = function(t, x, y, s, c)
        {
            textSize(s);
            fill(c);
            text(t, x, y);
        }

        //Render the GAME OVER text
        if (height - this.iterator > scale*2)
            renderText("GAME OVER", scale, height - this.iterator, scale*2, color(200, 0, 0));
        //Render what was before and the RESULTS text
        else if (height * 2 - this.iterator > scale*4)
        {
            renderText("GAME OVER", scale, scale*2, scale*2, color(200, 0, 0));
            renderText("Results"  , scale*5/3, height*2 - this.iterator, scale*5/3, color(200, 200, 100));
        }
        //Render what was before and the LIVES USED message
        else if (height * 3 - this.iterator > scale*6)
        {
            renderText("GAME OVER", scale    , scale*2, scale*2  , color(200,   0,   0));
            renderText("Results"  , scale*5/3, scale*4, scale*5/3, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, scale*10/3, height*3-this.iterator, scale, color(200));
        }
        //Render what was before and the SCORE message
        else if (height * 4 - this.iterator > scale*8)
        {
            renderText("GAME OVER", scale    , scale*2, scale*2  , color(200,   0,   0));
            renderText("Results"  , scale*5/3, scale*4, scale*5/3, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, scale*10/3, scale*6, scale, color(200));
            renderText("Score: "      + gameVariable.score   , scale*10/3, height*4-this.iterator, scale, color(200));
        }
        //Render what was before and the DIFICULTY message
        else if (height * 5 - this.iterator > scale*10)
        {
            renderText("GAME OVER", scale    , scale*2, scale*2  , color(200,   0,   0));
            renderText("Results"  , scale*5/3, scale*4, scale*5/3, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, scale*10/3, scale*6, scale, color(200));
            renderText("Score: "      + gameVariable.score   , scale*10/3, scale*8, scale, color(200));
            switch (gameVariable.dificulty)
            {
                case   1: renderText("Dificulty: EASY"  , scale*10/3, height*5-this.iterator, scale, color(200)); break;
                case 1.5: renderText("Dificulty: MEDIUM", scale*10/3, height*5-this.iterator, scale, color(200)); break;
                case   2: renderText("Dificulty: HARD"  , scale*10/3, height*5-this.iterator, scale, color(200));
            }
        }
        //Render all of them
        else
        {
            renderText("GAME OVER", scale    , scale*2, scale*2  , color(200,   0,   0));
            renderText("Results"  , scale*5/3, scale*4, scale*5/3, color(200, 200, 100));
            renderText("Lives used: " + gameVariable.maxLives, scale*10/3, scale*6, scale, color(200));
            renderText("Score: "      + gameVariable.score   , scale*10/3, scale*8, scale, color(200));
            switch (gameVariable.dificulty)
            {
                case   1: renderText("Dificulty: EASY"  , scale*10/3, scale*10, scale, color(200)); break;
                case 1.5: renderText("Dificulty: MEDIUM", scale*10/3, scale*10, scale, color(200)); break;
                case   2: renderText("Dificulty: HARD"  , scale*10/3, scale*10, scale, color(200));
            }
        }
        //Render the opction buttons
        if (height * 6 - this.iterator < scale*12)
        {
            //Store any event of a button
            let event;

            //Set the play again button
            setButton(this.buttons.playAgain, "Play again");
            this.buttons.playAgain.setBounds(scale*10/3, height - scale*4/3, scale*5, scale*4/3);

            if (this.buttons.playAgain.render() === 1) event = "play";

            //Set the return to menu button
            setButton(this.buttons.startMenu, "Return to menu");
            this.buttons.startMenu.setBounds(width - scale*14/3, height - scale*4/3, scale*23/3, scale*4/3);

            if (this.buttons.startMenu.render() === 1) event = "menu";

            return event;
        }
    }
}