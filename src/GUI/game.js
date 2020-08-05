/**Renders and controls the GUI while playing*/
class GameGUI
{
    constructor()
    {
        this.buttons = 
        {
            playAgain : new Button(),
            startMenu : new Button(),
            pause     : new Button()
        };
    }

    /**Render some information about the controls*/
    renderControlInfo()
    {
        //Render key shapes
        setDefaultConfiguration();
        noFill();
        stroke(100);
        square(width*1.5/2          , height/2 - scale*2, scale*5/3);
        square(width*1.5/2          , height/2          , scale*5/3);
        square(width*1.5/2 + scale*2, height/2          , scale*5/3);
        square(width*1.5/2 - scale*2, height/2          , scale*5/3);

        //Render mouse lines of the arrows
        line(width / 4        , height / 2 - scale, width / 4            , height / 2 - scale*7/3);
        line(width / 4        , height / 2 + scale, width / 4            , height / 2 + scale*7/3);
        line(width / 4 - scale, height / 2        , width / 4 - scale*7/3, height / 2);
        line(width / 4 + scale, height / 2        , width / 4 + scale*7/3, height / 2);

        //Render key simbols
        noStroke();
        fill(100);
        triangle(width * 1.5 / 2 + scale*25/30, height / 2 - scale*5/3, 
                 width * 1.5 / 2 + scale/3    , height / 2 - scale*2/3, 
                 width * 1.5 / 2 + scale*4/3  , height / 2 - scale*2/3);
        triangle(width * 1.5 / 2 + scale*25/30, height / 2 + scale*4/3, 
                 width * 1.5 / 2 + scale/3    , height / 2 + scale/3, 
                 width * 1.5 / 2 + scale*4/3  , height / 2 + scale/3);
        triangle(width * 1.5 / 2 + scale*10/3 , height / 2 + scale*25/30, 
                 width * 1.5 / 2 + scale*7/3  , height / 2 + scale/3, 
                 width * 1.5 / 2 + scale*7/3  , height / 2 + scale*4/3);
        triangle(width * 1.5 / 2 - scale*5/3  , height / 2 + scale*25/30, 
                 width * 1.5 / 2 - scale*2/3  , height / 2 + scale/3, 
                 width * 1.5 / 2 - scale*2/3  , height / 2 + scale*4/3);

        //Render arrow heads
        triangle(width / 4            , height / 2 - scale*8/3, 
                 width / 4 + scale/3  , height / 2 - scale*7/3,
                 width / 4 - scale/3  , height / 2 - scale*7/3);
        triangle(width / 4            , height / 2 + scale*8/3, 
                 width / 4 + scale/3  , height / 2 + scale*7/3,
                 width / 4 - scale/3  , height / 2 + scale*7/3);
        triangle(width / 4 - scale*8/3, height / 2,
                 width / 4 - scale*7/3, height / 2 - scale/3,
                 width / 4 - scale*7/3, height / 2 + scale/3);
        triangle(width / 4 + scale*8/3, height / 2,
                 width / 4 + scale*7/3, height / 2 - scale/3,
                 width / 4 + scale*7/3, height / 2 + scale/3);

        //Render mouse representation
        circle(width/4, height/2, scale*2/3);
    }

    /**Render the GUI while playing*/
    renderGame()
    {
        setDefaultConfiguration();
        noStroke();

        //Render the lives display
        textAlign(RIGHT, TOP);
        text("Lives:" + gameVariable.lives, width - scale, scale);

        //Render the score display
        textAlign(LEFT, TOP);
        text("Score: " + gameVariable.score, scale, scale);

        //Render the dificulty display
        textAlign(RIGHT, BOTTOM);
        switch (gameVariable.dificulty)
        {
            case   1: text("EASY"  , width - scale, height - scale); break;
            case 1.5: text("MEDIUM", width - scale, height - scale); break;
            case   2: text("HARD"  , width - scale, height - scale);
        }

        //Set the continue button
        setButton(this.buttons.pause, "Pause");
        this.buttons.pause.setStroke(true, scale*5/30, color(100));
        this.buttons.pause.setTextColor(color(100), scale);
        this.buttons.pause.setBounds(scale*10/3, height - scale*4/3, scale*5, scale*4/3);

        if (this.buttons.pause.render() === 1) return "pause";
    }

    /**Render the GUI of the pause menu*/
    renderPause()
    {
        setDefaultConfiguration();
        noStroke();
        
        //Render pause message
        textSize(scale*2);
        textStyle(BOLD);
        textAlign(CENTER, CENTER)
        text("Pause", width/2, height/2);

        //Store any event of the buttons
        let event;

        //Set the continue button
        setButton(this.buttons.pause, "Continue");
        this.buttons.pause.setStroke(true, scale*5/30, color(100));
        this.buttons.pause.setTextColor(color(100), scale);
        this.buttons.pause.setBounds(width/2, (height*2.5)/4, scale*5, scale*4/3);

        if (this.buttons.pause.render() === 1) event = "continue";

        //Set the play again button
        setButton(this.buttons.playAgain, "Play again");
        this.buttons.playAgain.setStroke(true, scale*5/30, color(100));
        this.buttons.playAgain.setTextColor(color(100), scale);
        this.buttons.playAgain.setBounds(100, height - scale*4/3, scale*5, scale*4/3);

        if (this.buttons.playAgain.render() === 1) event = "play";

        //Set the return to menu button
        setButton(this.buttons.startMenu, "Return to menu");
        this.buttons.startMenu.setStroke(true, scale*5/30, color(100));
        this.buttons.startMenu.setTextColor(color(100), scale);
        this.buttons.startMenu.setBounds(width - scale*14/3, height - scale*4/3, scale*23/3, scale*4/3);

        if (this.buttons.startMenu.render() === 1) event = "menu";

        return event;
    }
}