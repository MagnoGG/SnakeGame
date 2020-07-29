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
        square(width*1.5/2   , height/2-60 , 50);
        square(width*1.5/2   , height/2    , 50);
        square(width*1.5/2+60, height/2    , 50);
        square(width*1.5/2-60, height/2    , 50);

        //Render mouse lines of the arrows
        line(width / 4     , height / 2 - 30, width / 4     , height / 2 - 70);
        line(width / 4     , height / 2 + 30, width / 4     , height / 2 + 70);
        line(width / 4 - 30, height / 2     , width / 4 - 70, height / 2);
        line(width / 4 + 30, height / 2     , width / 4 + 70, height / 2);

        //Render key simbols
        noStroke();
        fill(100);
        triangle(width * 1.5 / 2 +  25, height / 2 - 50, 
                 width * 1.5 / 2 +  10, height / 2 - 20, 
                 width * 1.5 / 2 +  40, height / 2 - 20);
        triangle(width * 1.5 / 2 +  25, height / 2 + 40, 
                 width * 1.5 / 2 +  10, height / 2 + 10, 
                 width * 1.5 / 2 +  40, height / 2 + 10);
        triangle(width * 1.5 / 2 + 100, height / 2 + 25, 
                 width * 1.5 / 2 +  70, height / 2 + 10, 
                 width * 1.5 / 2 +  70, height / 2 + 40);
        triangle(width * 1.5 / 2 -  50, height / 2 + 25, 
                 width * 1.5 / 2 -  20, height / 2 + 10, 
                 width * 1.5 / 2 -  20, height / 2 + 40);

        //Render arrow heads
        triangle(width / 4     , height / 2 - 80, 
                 width / 4 + 10, height / 2 - 70,
                 width / 4 - 10, height / 2 - 70);
        triangle(width / 4     , height / 2 + 80, 
                 width / 4 + 10, height / 2 + 70,
                 width / 4 - 10, height / 2 + 70);
        triangle(width / 4 - 80, height / 2,
                 width / 4 - 70, height / 2 - 10,
                 width / 4 - 70, height / 2 + 10);
        triangle(width / 4 + 80, height / 2,
                 width / 4 + 70, height / 2 - 10,
                 width / 4 + 70, height / 2 + 10);

        //Render mouse representation
        circle(width/4, height/2, 20);
    }

    /**Render the GUI while playing*/
    renderGame()
    {
        setDefaultConfiguration();
        noStroke();

        //Render the lives display
        textAlign(RIGHT, TOP);
        text("Lives:" + gameVariable.lives, width - 30, 30);

        //Render the score display
        textAlign(LEFT, TOP);
        text("Score: " + gameVariable.score, 30, 30);

        //Render the dificulty display
        textAlign(RIGHT, BOTTOM);
        switch (gameVariable.dificulty)
        {
            case   1: text("EASY"  , width - 30, height - 30); break;
            case 1.5: text("MEDIUM", width - 30, height - 30); break;
            case   2: text("HARD"  , width - 30, height - 30);
        }

        //Set the continue button
        setButton(this.buttons.pause, "Pause");
        this.buttons.pause.setStroke(true, 5, color(100));
        this.buttons.pause.setTextColor(color(100), 30);
        this.buttons.pause.setBounds(100, height - 40, 150, 40);

        if (this.buttons.pause.render() === 1) return "pause";
    }

    /**Render the GUI of the pause menu*/
    renderPause()
    {
        setDefaultConfiguration();
        noStroke();
        
        //Render pause message
        textSize(60);
        textStyle(BOLD);
        textAlign(CENTER, CENTER)
        text("Pause", width/2, height/2);

        //Store any event of the buttons
        let event;

        //Set the continue button
        setButton(this.buttons.pause, "Continue");
        this.buttons.pause.setStroke(true, 5, color(100));
        this.buttons.pause.setTextColor(color(100), 30);
        this.buttons.pause.setBounds(width/2, (height*2.5)/4, 150, 40);

        if (this.buttons.pause.render() === 1) event = "continue";

        //Set the play again button
        setButton(this.buttons.playAgain, "Play again");
        this.buttons.playAgain.setStroke(true, 5, color(100));
        this.buttons.playAgain.setTextColor(color(100), 30);
        this.buttons.playAgain.setBounds(100, height - 40, 150, 40);

        if (this.buttons.playAgain.render() === 1) event = "play";

        //Set the return to menu button
        setButton(this.buttons.startMenu, "Return to menu");
        this.buttons.startMenu.setStroke(true, 5, color(100));
        this.buttons.startMenu.setTextColor(color(100), 30);
        this.buttons.startMenu.setBounds(width - 140, height - 40, 230, 40);

        if (this.buttons.startMenu.render() === 1) event = "menu";

        return event;
    }
}