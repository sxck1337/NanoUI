class cWindow {
    #nRender = null;          // nRender class
    #nInput = null;           // nInput class
    #nTheme = null;           // nTheme class
        
    #title = "";              // window title (obviously) 
    #isFocused = false;       // if window is being focused
    #blockMove = false;       // if movement should be blocked
    #isMoving = false;        // if window is being moved
    #pos = new vec2(0,0);     // window pos, top left
    #size = new vec2(0,0);    // window size
    #isBtnClicked = false;
    #radius = 0;
    
    getTitle() {
        return this.#title;
    }
    
    setPos(pos) {
        this.#pos = pos;
    }
    
    getPos() {
      return this.#pos;
    }
    
    setSize(size) {
        this.#size = size;
    }
    
    getSize() {
        return this.#size; 
    }
    
    getMoving() {
        return this.#isMoving;
    }
    
    getFocused() {
        return this.#isFocused;
    }
    
    getMoveBlocked() {
        return this.#blockMove;
    }
    
    setMoveBlocked(val) {
        this.#blockMove = val;
    }
    
    setWindowRounding(radius) {
        this.#radius = radius;
    }
    
    getWindowRounding(radius) {
        return this.#radius;
    }
    
    newButton(text, pos, size, radius = 0) {
        //let clicked = (this.#nRender.isInside(this.#nInput.getOldTouchPos(), this.#pos.add(new vec2(0, 25)).add(pos), size) && this.#nInput.getTouchOnce() && !this.#nInput.getSwiping());
        let color = this.#nTheme.get().button;
        let title_stripped = this.#nRender.strip_text(text);
        
        let input = this.#nInput.handleInput(this.#nRender.isInside(this.#nInput.getOldTouchPos(), this.#pos.add(new vec2(0, 25)).add(pos), size) );
        
        
        if(this.#nInput.getAllowTouch()) {
          if(input.hold)
            color = this.#nTheme.get().button_p;
        }
        
        // render background tect
        this.#nRender.drawRectFilled(this.#pos.add(new vec2(0, 25)).add(pos), size, color, radius, 0, true, this.#title);
        
        // render btn text
        this.#nRender.drawText(title_stripped,  this.#pos.add(new vec2(0, 25)).add(pos).calcCenter(size).sub(this.#nRender.getTextSize(title_stripped).div(new vec2(2,2))), "sans-serif", 14,  this.#nTheme.get().white.retAlpha(0.8), true, this.#title);      
        return input.click;
    }
    
    onUpdate() {
        
        // render titlebar
        this.#nRender.drawRectFilled(this.#pos, new vec2(this.#size.x, 25), this.#nTheme.get().accent, this.#radius, 1, true, this.#title)
        
        // title text
        this.#nRender.drawText(this.#nRender.strip_text(this.#title), this.#pos.add(new vec2(6,7)), "sans-serif", 14, this.#nTheme.get().white.retAlpha(0.8), true, this.#title);
        
        // close button
        this.#nRender.drawText("×", this.#pos.add(new vec2(this.#size.x - 18, 6)), "sans-serif", 14, this.#nTheme.get().closebtn, true, this.#title);
        
        // window background
        this.#nRender.drawRectFilled(this.#pos.add(new vec2(0,25)), this.#size.sub(new vec2(0, 25)), this.#nTheme.get().windowbg, this.#radius, 2, true, this.#title);
        
        
        
        // handle window movement
        
            if(this.#blockMove)
                return;
                
            if((this.#nInput.getSwiping() && this.#nRender.isInside(this.#nInput.getMousePos(), this.#pos, new vec2(this.#size.x, 25))) || (this.#nInput.getSwiping() && this.#isMoving)) {
                this.#isMoving = true;
                this.#pos = this.#pos.add(this.#nInput.getMousePos()).sub(this.#nInput.getOldTouchPos());
                this.#nInput.setOldTouchPos(this.#nInput.getMousePos());
            }
            else {
              this.#isMoving = false;
            }
        }
        
    
    
    constructor(title, pos, size, render, input, theme) {
        this.#title = title;
        this.#pos = pos;
        this.#size = size;
        this.#nRender = render;
        this.#nInput = input;
        this.#nTheme = theme;
        this.#nRender.createQueue(title);
        console.warn("new cWindow (" + title + ") created...");
    }
}
