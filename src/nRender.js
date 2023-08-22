class nRender {
    #canvas = null;       // canvas element
    #ctx = null;  
    #size = null;         // vec2 size of canvas
    
    #rqueue = [];          // queue with elements to render;
    #lastfocused = "";     // last focused window
    
    // find window by title and return its id
    #findWindow(title) {
        let wid = null;
        for(let i = 0; i < this.#rqueue.length; i++) {
            if (this.#rqueue[i].name == title) {
                wid = i;
            }
        }
        return wid;
    }
    
    // create render queue for window
    createQueue(title) {
        this.#rqueue.push({
            name: title,
            elements: []    
        })
        console.warn("created render queue (" + title + ")..")
    }
    
    // render desired queue and empty it afterwards 
    renderQueue(title) {
        let window_id = this.#findWindow(title);
        this.#rqueue[window_id].elements.forEach((e)=>{
            switch (e.task) {
                case "RectFilled":
                    this.drawRectFilled(e.pos, e.size, e.color, e.radius, e.corners);
                    break;
                case "Text":
                    this.drawText(e.text, e.pos, e.font, e.fontsize, e.color);
                    break;
              }
        })
        this.#rqueue[window_id].elements = [];
    }
    
    // render rect filled
    drawRectFilled(pos, size, color, radius = 0, corners = 0, queue = false, title = "") {
        // fix half pixel rendering cuz canvas gets blurry
        pos = new vec2(Math.round(pos.x), Math.round(pos.y));
        size = new vec2(Math.round(size.x), Math.round(size.y));
          
        if(queue) {
            let window_id = this.#findWindow(title);
            this.#rqueue[window_id].elements.push({
                task: "RectFilled",
                pos: pos,
                size: size,
                color: color,
                radius: radius,
                corners: corners
            });
        }
        else {
          this.#ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", " + color.a + ")";
          this.#ctx.strokeStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", " + color.a + ")";
          this.#ctx.beginPath();
          switch (corners) {
            case 0: // all
                this.#ctx.roundRect(pos.x, pos.y, size.x, size.y, radius);
                break;
            case 1: // top
                this.#ctx.roundRect(pos.x, pos.y, size.x, size.y, [radius, radius, 0, 0]);
                break;
            case 2: // bottom
                this.#ctx.roundRect(pos.x, pos.y, size.x, size.y, [0, 0, radius, radius]);
                break;
            case 3: // left
                this.#ctx.roundRect(pos.x, pos.y, size.x, size.y, [radius, 0, 0, radius]);
                break;
            case 4: // right
                this.#ctx.roundRect(pos.x, pos.y, size.x, size.y, [0, radius, radius, 0]);
                break;
          }
          this.#ctx.stroke();
          this.#ctx.fill();  
        }
    }
    
    // render text
    drawText(text, pos, font, fontsize, color, queue = false, title = "") {
        // fix half pixel rendering cuz canvas gets blurry
        pos = new vec2(Math.round(pos.x), Math.round(pos.y));
            
        if(queue) {
            let window_id = this.#findWindow(title);
            this.#rqueue[window_id].elements.push({
                task: "Text",
                text: text,
                pos: pos,
                font: font,
                fontsize: fontsize,
                color: color
            });
        }
        else {
            this.#ctx.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", " + color.a + ")";
            this.#ctx.font = fontsize + "px " + font;
            this.#ctx.textBaseline = "top";
            this.#ctx.fillText(text, pos.x, pos.y);
        }
    }
    
    getTextSize(text) {
        let met = this.#ctx.measureText(text);
        return new vec2(met.width, met.actualBoundingBoxAscent + met.actualBoundingBoxDescent);
    }
    
    isInside(point, start, size) {
        return (start.x + size.x > point.x && point.x > start.x && start.y + size.y > point.y && point.y > start.y) 
    }
    
    strip_text(str) {
        const index = str.indexOf('##');
        if (index !== -1) {
            return str.substring(0, index);
        }
        return str;
    }
    
    // clears canvas / context
    clearFrame() {
        this.#ctx.clearRect(0,0,this.#size.x, this.#size.y);
    } 
    
    constructor(canvas, size) {
        this.#canvas = document.getElementById(canvas);
        this.#ctx = this.#canvas.getContext("2d");
        this.#size = size;    
        this.#canvas.width = size.x;
        this.#canvas.height = size.y;
        console.warn("nRender initalized..");
    }    
}
