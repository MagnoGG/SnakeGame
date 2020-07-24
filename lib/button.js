class Color
{
    constructor(a = -1, r = -1, g = -1, b = -1)
    {
        this.setColor(a, r, g, b);
    }
    setColor(a, r = -1, g = -1, b= -1)
    {
        this.a = a;
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

class Button
{
    constructor (text = "Hello World!", x = 0, y = 0, w = 0, h = 0)
    {
        this.isPressed = false;

        //Save the param info
        this.text = text;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.setBounds(this.x, this.y);

        //Text
        this.setText(this.text);
        //Text color
        this.tc = new Color();
        this.setTextColor(this.tc.a, this.tc.r, this.tc.g, this.tc.b);
        //Rollover text color
        this.rtc = new Color();
        this.setRolloverTextColor(this.rtc.a, this.rtc.r, this.rtc.g, this.rtc.b);
        //Pressed text color
        this.ptc = new Color();
        this.setPressedTextColor(this.ptc.a, this.ptc.r, this.ptc.g, this.ptc.b);

        
        //Background color
        this.cc = new Color();
        this.setColor(true, this.cc.a, this.cc.r, this.cc.g, this.cc.b);
        //Rollover background color
        this.rcc = new Color();
        this.setRolloverColor(true, this.rcc.a, this.rcc.r, this.rcc.g, this.rcc.b);
        //Pressed background color
        this.pcc = new Color();
        this.setPressedColor(true, this.pcc.a, this.pcc.r, this.pcc.g, this.pcc.b);

        //Stroke color
        this.sc = new Color();
        this.setStroke(true, 1, this.sc.a, this.sc.r, this.sc.g, this.sc.b);
        //Rollover stroke color
        this.rsc = new Color();
        this.setRolloverStroke(true, 2, this.rsc.a, this.rsc.r, this.rsc.g, this.rsc.b);
        //Pressed stroke color
        this.psc = new Color();
        this.setPressedStroke(true, 2, this.psc.a, this.psc.r, this.psc.g, this.psc.b);
    }
    setBounds(x, y, w = textWidth(this.text), h = textAscent() + textDescent())
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    setText(text, size = 12)
    {
        this.text = text;
        this.tsize = size;
    }
    setFont(font){
        this.tfont = font;
    }
    setTextColor(a = 0, r = -1, g = -1, b = -1)
    {
        this.tc.setColor(a, r, g, b);
    }
    setRolloverTextColor(a = 30, r = -1, g = -1, b = -1)
    {
        this.rtc.setColor(a, r, g, b);
    }
    setPressedTextColor(a = -1, r = 200, g = 0, b = 0)
    {
        this.ptc.setColor(a, r, g, b);
    }

    setColor(color, a = 255, r = -1, g = -1, b = -1)
    {
        this.c = color;
        this.cc.setColor(a, r, g, b);
    }
    setRolloverColor(color, a = 255, r = -1, g = -1, b = -1)
    {
        this.rc = color;
        this.rcc.setColor(a, r, g, b);
    }
    setPressedColor(color, a = -1, r = 200, g = 0, b = 0)
    {
        this.pc = color;
        this.pcc.setColor(a, r, g, b);
    }
    
    setStroke(stroke = false, size = 1, a = 0, r = -1, g = -1, b = -1)
    {
        this.s = stroke;
        this.ssize = size;
        this.sc.setColor(a, r, g, b);
    }
    setRolloverStroke(stroke = false, size = 2, a = 0, r = -1, g = -1, b = -1)
    {
        this.rs = stroke;
        this.rssize = size;
        this.rsc.setColor(a, r, g, b);
    }
    setPressedStroke(stroke = false, size = 2, a = 0, r = -1, g = -1, b = -1)
    {
        this.ps = stroke;
        this.pssize = size;
        this.psc.setColor(a, r, g, b);
    }

    render()
    {
        this.isPressed = false;
        smooth();
        rectMode(CENTER);
        if (mouseX >= this.x - this.w/2 && mouseX <= this.x + this.w/2 &&
            mouseY >= this.y - this.h/2 && mouseY <= this.y + this.h/2)
        {
            if (mouseIsPressed)
            {
                this.isPressed = true;
                if (this.pc == false)
                    noFill();
                else if (this.pc == true)
                {
                    if (this.pcc.a == -1)
                        fill(this.pcc.r, this.pcc.g, this.pcc.b);
                    else
                        fill(this.pcc.a);
                }
                else
                    throw " button.js error: 1st param of setPressedColor is not a boolean";

                if (this.ps == false)
                    noStroke();
                else if (this.ps == true)
                {
                    if (this.psc.a == -1)
                        stroke(this.psc.r, this.psc.g, this.psc.b);
                    else
                        stroke(this.psc.a);
                    strokeWeight(this.pssize);
                    strokeCap(SQUARE);
                    strokeJoin(MITER);
                }
                else
                    throw " button.js error: 1st param of setPressedStroke is not a boolean";
                rect(this.x, this.y, this.w, this.h);

                noStroke();
                textAlign(CENTER, CENTER);
                textSize(this.tsize);
                textStyle(NORMAL);
                if (this.ptc.a == -1)
                    fill(this.ptc.r, this.ptc.g, this.ptc.b);
                else
                    fill(this.ptc.a);
                if (this.tfont != undefined)
                    textFont(this.tfont);
                text(this.text, this.x, this.y);
            }
            else
            {
                if (this.rc == false)
                    noFill();
                else if (this.rc == true)
                {
                    if (this.rcc.a == -1)
                        fill(this.rcc.r, this.rcc.g, this.rcc.b);
                    else
                        fill(this.rcc.a);
                }
                else
                    throw " button.js error: 1st param of setRolloverColor is not a boolean";

                if (this.rs == false)
                    noStroke();
                else if (this.rs == true)
                {
                    if (this.rsc.a == -1)
                        stroke(this.rsc.r, this.rsc.g, this.rsc.b);
                    else
                        stroke(this.rsc.a);
                    strokeWeight(this.rssize);
                    strokeCap(SQUARE);
                    strokeJoin(MITER);
                }
                else
                    throw " button.js error: 1st param of setRolloverStroke is not a boolean";
                rect(this.x, this.y, this.w, this.h);

                noStroke();
                textAlign(CENTER, CENTER);
                textSize(this.tsize);
                textStyle(NORMAL);
                if (this.rtc.a == -1)
                    fill(this.rtc.r, this.rtc.g, this.rtc.b);
                else
                    fill(this.rtc.a);
                if (this.tfont != undefined)
                    textFont(this.tfont);
                text(this.text, this.x, this.y);
            }
        }
        else
        {
            if (this.c == false)
                noFill();
            else if (this.c == true)
            {
                if (this.cc.a == -1)
                    fill(this.cc.r, this.cc.g, this.cc.b);
                else
                    fill(this.cc.a);
            }
            else
                throw " button.js error: 1st param of setColor is not a boolean";

            if (this.s == false)
                noStroke();
            else if (this.s == true)
            {
                if (this.sc.a == -1)
                    stroke(this.sc.r, this.sc.g, this.sc.b);
                else
                    stroke(this.sc.a);
                strokeWeight(this.ssize);
                strokeCap(SQUARE);
                strokeJoin(MITER);
            }
            else
                throw " button.js error: 1st param of setStroke is not a boolean";
            rect(this.x, this.y, this.w, this.h);

            noStroke();
            textAlign(CENTER, CENTER);
            textSize(this.tsize);
            textStyle(NORMAL);
            if (this.tc.a == -1)
                fill(this.tc.r, this.tc.g, this.tc.b);
            else
                fill(this.tc.a);
            if (this.tfont != undefined)
                textFont(this.tfont);
            text(this.text, this.x, this.y);
        }
        return this.isPressed;
    }
}