
class nInput {
    #canvas = null;
    #ctx = null;
    #size = null;
    
    #allowtouch = true;                 // if touch controls should be used
    #touchStartTime = null;
    #touchstart = false;                 // on touch start
    #touchonce = false;
    #isswiping = false;                 // if user is swiping on the screen (used for touch controls)
    #mousepos = new vec2(0,0);          // mouse position
    #oldtouchpos = new vec2(0,0);       // old touch position
    
    
    setOldTouchPos(vec2) {
      this.#oldtouchpos = vec2;
    }
    
    getSwiping() {
        return this.#isswiping; 
    }
    
    getTouchOnce() {
        return this.#touchonce;
    }
    
    setTouchOnce(val) {
        this.#touchonce = val;
    }
    
    getAllowTouch() {
        return this.#allowtouch;
    }
    
    getTouchStart() {
        return this.#touchstart;
    }
    
    getTouchStartTime() {
        return this.#touchStartTime;
    }
    
    getMousePos() {
        return this.#mousepos;
    }
    
    getOldTouchPos() {
        return this.#oldtouchpos;
    }
    
    handleInput(is_inside) {
        let ret = {
            click: false,
            hold: false
        }
        
        if(this.#allowtouch && is_inside) {  // handle touch
            if(this.#touchonce && !this.#isswiping) {  // get click
                ret.click = true;
                return ret;
            }
            else if(this.#isswiping || this.#touchstart) { // get hold
                ret.hold = true;
                return ret;
            }
        }
        return ret;
    }
    
    onTouchMove(event) {
        this.#isswiping = true;
        let rect = this.#canvas.getBoundingClientRect();
        this.#mousepos = new vec2(event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top);
    }
    
    onTouchStart(event) {
        if(!this.#touchonce)
          this.#touchonce = true;
      
        this.#touchStartTime = Date.now();
        this.#touchstart = true;
        let rect = this.#canvas.getBoundingClientRect();
        this.#oldtouchpos = new vec2(event.touches[0].clientX - rect.left, event.touches[0].clientY - rect.top);
    }
    
    onTouchEnd(event) {
        this.#touchStartTime = null;
        this.#isswiping = false; 
        this.#touchstart = false;
        this.#touchonce = false;
        let rect = this.#canvas.getBoundingClientRect();
        this.#oldtouchpos = new vec2(event.changedTouches[0].clientX - rect.left, event.changedTouches[0].clientY - rect.top);
    }
    
    constructor(canvas, size) {
        this.#canvas = document.getElementById(canvas);
        this.#ctx = this.#canvas.getContext("2d");
        this.#size = size;
        
        
        this.#canvas.ontouchmove = this.onTouchMove.bind(this);
        this.#canvas.ontouchstart = this.onTouchStart.bind(this);
        this.#canvas.ontouchend = this.onTouchEnd.bind(this);
        
        console.warn("nInput initalized..");
               
    }
}
