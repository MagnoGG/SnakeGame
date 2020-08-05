        /**This object controls and renders the snake*/
class Snake
{
    constructor (x=floor(width/2), y=floor(height/2), xs=0, ys=0) {this.clear(x, y, xs, ys);}
    setSpeed    (x, y) {this.xspeed = x; this.yspeed = y;}
    setPosition (x, y) {this.x = x; this.y = y;}
    clear(x = floor(width/2), y = floor(height/2), xs=0, ys=0)
    {
        this.setPosition(x, y);
        this.setSpeed(xs, ys);
        /*Determine if the snake is blinking after dead.
          · -1  = not blinking
          · 0   = start blinking
          · > 0 = if the number is even, the snake is shown, else not*/
        this.blink = -1;
        /*Tail of the snake is an array of the
        last positions of the head*/
        this.tail = [];
        //The tail of the snake starts with 1
        this.tail.unshift(createVector(this.x, this.y));
    }

    startBlink() {this.blink = 0;/*Start blinking, the render would do the rest*/}
    /**Returns if the head it touching the tail*/
    tailTouching(x, y)
    {
        /*Initialite on false, and if it does not change,
        it means that we did not found any coordinates are
        equal to the head position in the tail array.*/
        let touching = false;
        /*At the begining of the game, the head and
        the tail are in the same position*/
        if (!(this.xspeed === 0 && this.yspeed === 0))
            for (let i = 0; !touching && i < this.tail.length; i++)
                if (this.tail[i].x === x && this.tail[i].y === y)
                    touching = true;
        return touching;
    }
    move(xs, ys, addTail)
    {
        //Add a new position to the tail
        if (addTail) this.tail.unshift(createVector(this.x, this.y));
        else //Update the snake, delete the last position to keep same length
        {
            this.tail.unshift(createVector(this.x, this.y));
            this.tail.pop();
        }
        //Update the head position
        this.x += xs * scale;
        this.y += ys * scale;
    }
    update(f)
    {
        //If the game is not paused and it is not blinking
        if (this.blink === -1)
        {
            let newPosition = false;
            /*If the head position is equal to the food position (f);
            increase the score, indicate that a new food position is
            required and add a new part to the tail*/
            if (this.x === f.x && this.y === f.y)
            {
                newPosition = true;
                this.move(this.xspeed, this.yspeed, true);
            }
            else this.move(this.xspeed, this.yspeed, false);
            if (newPosition) return "position";
            if (this.tailTouching(this.x, this.y) ||
                this.x > width-1  || this.x < -1||
                this.y > height-1 || this.y < -1)
                return "dead";
        }
    }
    render()
    {
        setDefaultConfiguration();
        fill(255);
        strokeWeight(3);

        let renderSnake = function(x, y, tail)
        {
            //Draw the head
            square(x, y, scale);
            //Draw the tail
            for (let i = 0; i < tail.length; i++)
                square(tail[i].x, tail[i].y, scale);
        };
        if (this.blink === -1) renderSnake(this.x, this.y, this.tail);
        else if (this.blink >= 0)
        {
            //Render the snake on the even frames
            if (this.blink%2 === 0) renderSnake(this.x, this.y, this.tail); 
            if (this.blink    <= 5) this.blink++;
            else if(this.blink > 5)
            {
                //Store the tail lenght and clean the snake
                let tailLenght = this.tail.length;
                this.clear();
                //Reset the tail to the head position
                for (let i = 0; i < tailLenght-1; i++) 
                    this.tail.unshift(createVector(this.x, this.y));
            }
        }
    }
}