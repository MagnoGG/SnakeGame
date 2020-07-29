/**This object controls and renders the food*/
class Food
{
    constructor() {this.clear();}
    clear(){this.x = width/2; this.y = height/4;}
    /**Generate a new random position*/
    newPosition(s)
    {
        /*Store the last positions to check later to 
        determinate if the new position is equal to the last one*/
        this.lastx = this.x;
        this.lasty = this.y;

        /*Generate a new position depending on the scale
        and the size of the canvas:
          · width /30 = number of columns
          · height/30 = number of rows
        Pick a random value between those and 0, and then
        set it into the grid (* 30)*/
        this.x = floor(random(width /30)) * 30;
        this.y = floor(random(height/30)) * 30;

        /*If the position generated is equal to the last
        one, or is touching the snake, then generate a 
        new position*/
        if (s.tailTouching(this.x, this.y) || this.lastx === this.x && this.lasty === this.y)
            this.newPosition();
    }
    render()
    {
        setDefaultConfiguration();
        fill(255, 0, 0);
        square(this.x, this.y, 30);
    }
}