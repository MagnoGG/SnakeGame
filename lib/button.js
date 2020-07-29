class Button
{
    constructor ()
    {
        this.isPressed = -1;

        this.setText("Hello World!");
        this.setBounds(0, 0);
        this.setFont("Calibri");
        this.setTextColor(color(0));
        this.setRolloverTextColor(color(0));
        this.setPressedTextColor(color(0));

        this.setColor(true);
        this.setRolloverColor(true);
        this.setPressedColor(true);

        this.setStroke(true);
        this.setRolloverStroke(true);
        this.setPressedStroke(true);
    }
    setBounds(x, y, w = textWidth(this.text), h = textAscent() + textDescent())
    {
        this.x = x; 
        this.y = y;
        this.w = w;
        this.h = h;
    }
    setText(text) {this.text = text}
    setFont              (font)    {this.textFont= font;}
    setTextColor         (c, s=12)              {this.textColor         = c; this.textSize         = s;}
    setRolloverTextColor (c, s=this.textSize+2) {this.textRolloverColor = c; this.textRolloverSize = s;}
    setPressedTextColor  (c, s=this.textSize+2) {this.textPressedColor  = c; this.textPressedSize  = s;}

    setColor         (f, c=color(200)) {this.fillBackground = f; this.colorBackground = c;}
    setRolloverColor (f, c=color(255)) {this.rolloverFill   = f; this.rolloverColor   = c;}
    setPressedColor  (f, c=color(255)) {this.pressedFill    = f; this.pressedColor    = c;}
    
    setStroke         (f, s=1, c=color(0))                 {this.strokeBackground = f; this.strokeSize         = s; this.strokeColor         = c;}
    setRolloverStroke (f, s=this.strokeSize+2, c=color(0)) {this.rolloverStroke   = f; this.rolloverStrokeSize = s; this.rolloverStrokeColor = c;}
    setPressedStroke  (f, s=this.strokeSize+2, c=color(0)) {this.pressedStroke    = f; this.pressedStrokeSize  = s; this.pressedStrokeColor  = c;}

    render()
    {
        smooth();
        rectMode(CENTER);
        let setBackgroundButtonStyle = function(f, c)
        {
            if (f === false) noFill();
            else if (f === true) fill(c);
            else throw " param error";
        }
        let setStrokeButtonStyle = function(f, s, c)
        {
            if (f === false) noStroke();
            else if (f === true)
            {
                stroke(c);
                strokeWeight(s);
                strokeCap(SQUARE);
                strokeJoin(MITER);
            }
            else throw " param error";
        }
        let setTextButtonStyle = function(font, s, c)
        {
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(s);
            textStyle(NORMAL);
            fill(c);
            textFont(font);
        }

        if (mouseX >= this.x - this.w/2 && mouseX <= this.x + this.w/2 &&
            mouseY >= this.y - this.h/2 && mouseY <= this.y + this.h/2)
        {
            if (mouseIsPressed)
            {
                this.isPressed = 0;
                setBackgroundButtonStyle(this.pressedFill, this.pressedColor);
                setStrokeButtonStyle(this.pressedStroke, this.pressedStrokeSize, this.pressedStrokeColor);
                rect(this.x, this.y, this.w, this.h);
                setTextButtonStyle(this.textFont, this.textPressedSize, this.textPressedColor);
                text(this.text, this.x, this.y);
            }
            else
            {
                if (this.isPressed === 0) this.isPressed = 1;
                else this.isPressed = -1;

                setBackgroundButtonStyle(this.rolloverFill, this.rolloverColor);
                setStrokeButtonStyle(this.rolloverStroke, this.rolloverStrokeSize, this.rolloverStrokeColor);
                rect(this.x, this.y, this.w, this.h);
                setTextButtonStyle(this.textFont, this.textRolloverSize, this.textRolloverColor);
                text(this.text, this.x, this.y);
            }
        }
        else
        {
            if (this.isPressed === 0) this.isPressed = 1;
            else this.isPressed = -1;
            
            setBackgroundButtonStyle(this.fillBackground, this.colorBackground);
            setStrokeButtonStyle(this.strokeBackground, this.strokeSize, this.strokeColor);
            rect(this.x, this.y, this.w, this.h);
            setTextButtonStyle(this.textFont, this.textSize, this.textColor);
            text(this.text, this.x, this.y);
        }
        return this.isPressed;
    }
}