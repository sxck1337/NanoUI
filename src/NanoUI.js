class NanoUI {
    #nTheme = null;        // nTheme class
    #nRender = null;       // nRender class
    #nInput = null;        // nInput class
    
    #ActiveWindows = [];     // Array with all window objects
    #currentMoving = "";     // name of the current moved window
    
    // sort array to focused window
    #sortByFocusedName(arr, focusedName) {
        const focusedIndex = arr.findIndex((item) => item.wi.getTitle() === focusedName);
        if (focusedIndex === -1)
            return;
       
        const focusedObject = arr.splice(focusedIndex, 1)[0];
        arr.sort((a, b) => a.wi.getTitle().localeCompare(b.wi.getTitle()));
        arr.push(focusedObject);    
    }
    
    // create a new window object and start render loop on that window
    newWindow(title, pos = new vec2(0,0), size = new vec2(0,0), callback) {
        let wInstance = new cWindow(title, pos, size, this.#nRender, this.#nInput, this.#nTheme);
        this.#ActiveWindows.push({wi: wInstance, cb: callback, fc: false, mv: false});
    }
    
    #onUpdate() {
      this.#nRender.clearFrame();
      this.#ActiveWindows.forEach((e) => {
        e.mv = e.wi.getMoving();
        e.fc = e.wi.getFocused();
      
        if (e.mv) {
          this.#currentMoving = e.wi.getTitle();
        }
      
        if (this.#currentMoving == e.wi.getTitle() && !e.mv)
          this.#currentMoving = "";
      
        if (this.#currentMoving != e.wi.getTitle() && this.#currentMoving != "")
          e.wi.setMoveBlocked(true);
        else
          e.wi.setMoveBlocked(false);
      
        e.cb(e.wi); // call each window callback and pass window class
        this.#nRender.renderQueue(e.wi.getTitle()); // render queued elements
      })
      
      // reset touch to allow one click per frame only
      this.#nInput.setTouchOnce(false);
      
      if (this.#currentMoving != "")
        this.#sortByFocusedName(this.#ActiveWindows, this.#currentMoving)
      
    }
    
    constructor(canvas, size) {
        this.#nTheme = new nTheme(0);
        this.#nRender = new nRender(canvas, size);
        this.#nInput = new nInput(canvas, size);
        
        setInterval(()=>{
          this.#onUpdate();
        },0)
            
        console.error("NanoUI initalized..");
        
    }
}
