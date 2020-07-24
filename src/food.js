/**
 * This object controls and renders the food.
 */
class Food
{
    constructor(randomPos = true, x = 0, y = 0)
    {
        if (randomPos)
            this.newPosition();
        else
            this.setPosition(x, y);
    }
    //Generate a new position
    newPosition()
    {
        //Store the last positions to check 
        //later to determinate if the new position
        //is equal to the last one
        this.lastx = this.x;
        this.lasty = this.y;

        //Generate a new position depending on
        //the scale and the size of the canvas
        // · width /scale = number of columns
        // · height/scale = number of rows
        // Pick a random value between those
        // and 0, and then set it into the grid
        // (* scale)
        this.x = floor(random(width /scale)) * scale;
        this.y = floor(random(height/scale)) * scale;

        //If the position generated is equal to 
        //the last one, or is touching the snake,
        //then generate a new position
        if (snake.tailTouching(this.x, this.y) || this.lastx == this.x && this.lasty == this.y)
            this.newPosition();
    }
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
    render()
    {
        fill(255, 0, 0);
        stroke(30);
        strokeWeight(5);
        strokeCap(SQUARE);
        strokeJoin(MITER);
        noSmooth();
        rectMode(CORNER);
        rect(this.x, this.y, scale, scale);
    }
}