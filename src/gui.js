/**
 * Object which renders the GUI
 * for the game
 */
let s;
let n;
let k1;
let k2;
let e;
let e2;
class GUI
{
    constructor ()
    {
        this.speed = 40;
        this.isGameOver = -1;
        this.startMenu = 0;

        s = new Snake(scale*4, scale);
        n = new Snake(scale*6, scale*4);
        k1 = new Snake(scale*11, scale);
        k2 = new Snake(scale, scale);
        e = new Snake(scale*18, scale);
        e2 = new Snake(scale, scale);
    }
    renderStartMenu()
    {
        let gameMode;
        if (this.startMenu >= 0)
        {
            this.startMenu++;

            switch(this.startMenu)
            {
                case 1:
                case 2:
                    e.move(-1, 0, true);
                case 3:
                    s.move(-1, 0, true);
                    n.move(0, -1, true);
                    k1.move(0, 1, true);
                    break;
                case 4:
                case 5:
                case 6:
                    s.move(0, 1, true);
                    n.move(1, 1, true);
                    k1.move(1, -1, true);
                    k2.setPosition(scale*11, scale*5);
                    e.move(0, 1, true);
                    break;
                case 7:
                case 8:
                case 9:
                    s.move(1, 0, true);
                    n.move(0, -1, true);
                    k2.move(0, -1, true);
                    e.move(0, 1, true);
                    break;
                case 10:
                case 11:
                    e.move(1, 0, true);
                    e2.setPosition(scale*16, scale*4);
                case 12:
                    s.move(0, 1, true);
                    k2.move(1, 1, true);
                    e2.move(1, 0, true);
                    break;
                case 13:
                case 14:
                case 15:
                    s.move(-1, 0, true);
                    break;                   
            }

            if (this.startMenu >= 15)
            {
                let p = new Button();
                p.setBounds(width/2, scale * 15);

                p.setText("Play", scale*2);
                p.setFont(font);
                p.setTextColor(255);
                p.setRolloverTextColor(-1, 255, 255, 100);
                p.setPressedTextColor(-1, 255, 0, 0);

                p.setColor(false);
                p.setRolloverColor(false);
                p.setPressedColor(false);

                p.setStroke(true, 5, 255);
                p.setRolloverStroke(true, 7, -1, 255, 255, 100);
                p.setPressedStroke(true, 7, -1, 255, 0, 0);
                if (p.render()) gameMode = 1;
            }
            s.render();
            n.render();
            k1.render();
            k2.render();
            e.render();
            e2.render();
        }
        return gameMode;
    }
    renderGameUI()
    {
        //Set apareance configuration
        textAlign(RIGHT, TOP);
        textFont("Consolas");
        textSize(scale);
        textStyle(NORMAL);
        fill(100);

        noStroke();
        noSmooth();
        rectMode(CORNER);

        //Render the lives display
        text("Lives:" + lives, width - scale, scale);

        //Render the score display
        textAlign(LEFT, TOP);
        text("Score: " + score, scale, scale);

        //Render the dificulty display
        textAlign(RIGHT, BOTTOM);
        //The dificult depends on the scale:
        // · if it is big, then there will be less space
        //   to go on the canvas.
        // · if it is smaller, then there will be more
        //   space to go on the canvas
        switch (scale)
        {
            case 10: 
                text("HARD", width - scale, height - scale);
                break;
            case 20:
                text("MEDIUM", width - scale, height - scale);
                break;
            case 30:
                text("EASY", width - scale, height - scale);
                break;
        }
    }

    renderPause()
    {
        //Set apareance configuration
        textAlign(CENTER, CENTER);
        textFont("Consolas");
        textSize(scale*3);
        textStyle(NORMAL);
        fill(100);

        noStroke();
        noSmooth();
        rectMode(CORNER);

        //Render pause message
        text("Pause", width/2, height/2);

        //Set apareance configuration
        textSize(scale);

        //Render message to continue
        text("To continue press SPACE...", width/2, (height*2.5)/4);
    }

    //Render the game over menu
    renderGameOver()
    {
        let restart = false;

        textAlign(LEFT, CENTER);
        textFont("Consolas");
        textSize(floor(scale * 1.5));
        textStyle(BOLD);

        fill(255);
        noStroke();
        noSmooth();
        rectMode(CENTER);

        this.isGameOver++;

        //Render the background menu
        if (this.isGameOver <= this.speed)
            rect(width/2,
                 height/2,
                 (width  - scale * 2) / this.speed * this.isGameOver, 
                 (height - scale * 2) / this.speed * this.isGameOver, 
                 scale/this.speed * this.isGameOver);
        else
            rect(width/2, height/2, width - scale * 2, height - scale * 2, scale);

        //Render Results
        if (this.isGameOver >= this.speed + floor(this.speed * 0.5))
        {
            fill(200, 0, 0);
            text("Results", width / 2, scale * 3);
        }

        //Render total score
        if (this.isGameOver >= this.speed + floor(this.speed * 0.5) * 2)
        {
            textSize(scale);
            textStyle(NORMAL);
            fill(0);

            text("Total score: " + score, scale * 3, scale * 7);
        }

        //Render used lives
        if (this.isGameOver >= this.speed + floor(this.speed * 0.5) * 3)
            text("Used lives " + (maxLives - lives), scale * 3, scale * 9);

        //Render dificulty
        if (this.isGameOver >= this.speed + floor(this.speed * 0.5) * 4)
            switch (scale)
            {
                case 10: 
                    text("Dificulty: dificult", scale * 3, scale * 11);
                    break;
                case 20:
                    text("Dificulty: medium", scale * 3, scale * 11);
                    break;
                case 30:
                    text("Dificulty: easy", scale * 3, scale * 11);
                    break;
            }
            
        //Render button
        if (this.isGameOver >= this.speed + floor(this.speed * 0.5) * 5)
        {
           let b = new Button();

           b.setBounds(width/2, scale * 15, width - scale * 3, scale * 3);

           b.setText("Play again", scale);
           b.setTextColor(0);
           b.setRolloverTextColor(-1, 255, 0, 0);
           b.setPressedTextColor(-1, 255, 0, 0);

           b.setColor(true, -1, 0, 200, 0);
           b.setRolloverColor(true, -1, 0, 255, 0);
           b.setPressedColor(true, -1, 0, 255, 0);

           b.setStroke(true, floor(scale/4), 0);
           b.setRolloverStroke(true, floor(scale/3), 0);
           b.setPressedStroke(true, floor(scale/2), -1, 255, 0, 0);

           restart = b.render();
        }
        return restart;
    }
    clear()
    {
        this.isGameOver = -1;
    }
}