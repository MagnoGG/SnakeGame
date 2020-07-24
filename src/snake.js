/**
 * This object controls and renders the snake.
 */
class Snake
{
    constructor(x = floor(width/2), y = floor(height/2), xspeed = 0, yspeed = 0)
    {
        //Tail of the snake is an array of the
        //last positions of the head
        this.tail = [];

        this.x = x;
        this.y = y;

        this.xspeed = xspeed;
        this.yspeed = yspeed;

        //Determine if the snake is blinking
        //after dead.
        // · -1  = not blinking
        // · 0   = start blinking
        // · > 0 = if the number is even, the
        // snake is shown, else not.
        this.beeping = -1;

        //The tail of the snake starts with 1
        //Add the current position of the snake
        //at the start of the array.
        this.tail.unshift(createVector(this.x, this.y));
    }
    //Restart the snake
    restart()
    {
        //Start blinking, the render would do the rest
        this.beeping = 0;
    }
    clear()
    {
        this.beeping == -1;
        this.x = floor(width /2);
        this.y = floor(height/2);
        this.xspeed = 0;
        this.yspeed = 0;
        this.tail = [];
        this.tail.unshift(createVector(this.x, this.y));
    }
    setSpeed(x, y)
    {
        this.xspeed = x;
        this.yspeed = y;
    }
    //Returns if the head it touching the tail
    tailTouching(x, y)
    {
        //Initialite on false, and if it does not
        //change, it means that we did not found
        //any coordinates are equal to the head 
        //position in the tail array.
        let touching = false;

        //At the begining of the game, the head and
        //the tail are in the same position
        if (this.xspeed != 0 || this.yspeed != 0)
            for (let i = 0; !touching && i < this.tail.length; i++)
                if (this.tail[i].x == x && this.tail[i].y == y)
                    touching = true;
        return touching;
    }
    //Update the snake and tail positions
    update(f)
    {
        //If the game is not paused and it is not blinking
        if (this.beeping == -1)
        {
            //If the head position is equal to the food position,
            //increase the score, generate a new food position and
            //add a new part to the tail
            if (this.x == f.x && this.y == f.y)
            {
                score++;
                f.newPosition();
                this.tail.unshift(createVector(this.x, this.y));
            }
            else
            {
                //Update the tail
                //Add the last position of the head
                this.tail.unshift(createVector(this.x, this.y));
                //To keep the same distance, delete the last one
                this.tail.pop();
            }

            //Update the head position depending on the speed
            this.x += this.xspeed * scale;
            this.y += this.yspeed * scale;

            //Return if the new position is valid to continue
            return !this.tailTouching(this.x, this.y) && 
                this.x < width  && this.x > -1 &&
                this.y < height && this.y > -1;
        }
    }
    move(xs, ys, addTail)
    {
        if (addTail)
            this.tail.unshift(createVector(this.x, this.y));
        else
        {
            this.tail.unshift(createVector(this.x, this.y));
            this.tail.pop();
        }
        this.x += xs * scale;
        this.y += ys * scale;
    }
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
    render()
    {
        
        fill(255);
        stroke(30);
        strokeWeight(3);
        strokeCap(SQUARE);
        strokeJoin(MITER);
        noSmooth();
        rectMode(CORNER);
        
        //If it is not blinking
        if (this.beeping == -1)
        {
            //Draw the head
            rect(this.x, this.y, scale, scale);

            //Draw the tail
            for (let i = 0; i < this.tail.length; i++)
                rect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        //If it is blinking
        else if (this.beeping >= 0)
        {
            if (this.beeping%2 == 0)
            {
                //Render the snake on the even frames
                //Render the head
                rect(this.x, this.y, scale, scale);
                //Render the tail
                for (let i = 0; i < this.tail.length; i++)
                    rect(this.tail[i].x, this.tail[i].y, scale, scale);
            }
            //Increase the value if the value is less than 5
            if (this.beeping <= 5)
                this.beeping++;
            else
            {
                //Restart the snake
                this.beeping = -1;
                this.x = floor(width/2);
                this.y = floor(height/2);
                this.xspeed = 0;
                this.yspeed = 0;

                //Reset the tail to the head position
                for (let i = 0; i < this.tail.length; i++)
                {
                    this.tail.unshift(createVector(this.x, this.y));
                    this.tail.pop();
                }
            }
        }
    }
}