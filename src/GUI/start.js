/**Renders and controls the start menu*/
class StartMenu
{
    constructor()
    {
        //Count the frames to make the animation
        this.iterator = -4;

        //Objects needed for the animation
        this.snakeTitle = 
        {
            s  : new Snake(),
            n  : new Snake(),
            k1 : new Snake(),
            k2 : new Snake(),
            e  : new Snake(),
            e2 : new Snake()
        };

        //Buttons of the start menu
        this.buttons = 
        {
            playButton      : new Button(),
            lessLivesButton : new Button(),
            moreLivesButton : new Button(),
            changeDificulty : new Button()
        };
    }

    /**Clean and leave the object as initialy*/
    clear()
    {
        this.iterator = -4;
        this.snakeTitle.s .clear();
        this.snakeTitle.n .clear();
        this.snakeTitle.k1.clear();
        this.snakeTitle.k2.clear();
        this.snakeTitle.e .clear();
        this.snakeTitle.e2.clear();
    }

    /**Shows up the start menu*/
    render()
    {
        this.iterator++;

        //Snake animation
        switch(this.iterator)
        {
            case -3:
                /*I use this notation (30*n) to understand easily
                in which position is situated (being n the number
                of columns/rows)*/
                this.snakeTitle.s .setPosition(30 *  4, 30    ); //Default
                this.snakeTitle.n .setPosition(30 *  6, 30 * 4);
                this.snakeTitle.k1.setPosition(30 * 11, 30    );
                this.snakeTitle.k2.setPosition(30 *  4, 30    );
                this.snakeTitle.e .setPosition(30 * 18, 30    );
                this.snakeTitle.e2.setPosition(30 *  4, 30    );
                
                //Snake starts with an element on the tail
                this.snakeTitle.s .tail.pop();
                this.snakeTitle.n .tail.pop();
                this.snakeTitle.k1.tail.pop();
                this.snakeTitle.k2.tail.pop();
                this.snakeTitle.e .tail.pop();
                this.snakeTitle.e2.tail.pop();
                break;
            case 1: case 2:
                this.snakeTitle.e .move(-1,  0, true);
            case 3:
                this.snakeTitle.s .move(-1,  0, true);
                this.snakeTitle.n .move( 0, -1, true);
                this.snakeTitle.k1.move( 0,  1, true);
                break;
            case 4: case 5: case 6:
                this.snakeTitle.s .move( 0,  1, true);
                this.snakeTitle.n .move( 1,  1, true);
                this.snakeTitle.k1.move( 1, -1, true);
                this.snakeTitle.k2.setPosition(30 * 11, 30 * 5);
                this.snakeTitle.e .move( 0,  1, true);
                break;
            case 7: case 8: case 9:
                this.snakeTitle.s .move( 1,  0, true);
                this.snakeTitle.n .move( 0, -1, true);
                this.snakeTitle.k2.move( 0, -1, true);
                this.snakeTitle.e .move( 0,  1, true);
                break;
            case 10: case 11:
                this.snakeTitle.e.move( 1,  0, true);
                this.snakeTitle.e2.setPosition(30 * 16, 30 * 4);
            case 12:
                this.snakeTitle.s .move(0, 1, true);
                this.snakeTitle.k2.move(1, 1, true);
                this.snakeTitle.e2.move(1, 0, true);
                break;
            case 13: case 14: case 15:
                this.snakeTitle.s.move(-1, 0, true);
        }

        //Render the snakes
        if (this.iterator >= 0)
        {
            this.snakeTitle.s .render();
            this.snakeTitle.n .render();
            this.snakeTitle.k1.render();
            this.snakeTitle.k2.render();
            this.snakeTitle.e .render();
            this.snakeTitle.e2.render();
        }

        //Store any event of the buttons
        let event;

        //Render play button
        if (this.iterator >= 25)
        {
            setButton(this.buttons.playButton, "Play");
            this.buttons.playButton.setBounds(width/2, 30*16, width/3, 40);

            if(this.buttons.playButton.render() === 1) event = "play";
        }

        //Render max Lives configuration
        if (this.iterator >= 35)
        {
            setDefaultConfiguration();
            noStroke();
            fill(255);

            //Render maxLives indicator
            text("Lives: " + gameVariable.maxLives, 30, height - 30);

            //Render less lives button
            setButton(this.buttons.lessLivesButton, "-");
            this.buttons.lessLivesButton.setBounds(30 * 7, height - 30, 30, 30);

            if (this.buttons.lessLivesButton.render() === 1) event = "-lives";

            //Render more lives button
            setButton(this.buttons.moreLivesButton, "+");
            this.buttons.moreLivesButton.setBounds(30 * 8 + 8, height - 30, 30, 30);

            if (this.buttons.moreLivesButton.render() === 1) event = "+lives";
        }

        //Render dificulty configuration
        if (this.iterator >= 45)
        {
            switch (gameVariable.dificulty)
            {
                case   1: setButton(this.buttons.changeDificulty, "EASY"  ); break;
                case 1.5: setButton(this.buttons.changeDificulty, "MEDIUM"); break;
                case   2: setButton(this.buttons.changeDificulty, "HARD"  );
            }
            this.buttons.changeDificulty.setBounds(width - 100, height - 35, 150, 35);

            if (this.buttons.changeDificulty.render() === 1) event = "dif";
        }
        return event;
    }
}