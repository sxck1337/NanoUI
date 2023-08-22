  class nTheme {
    #type = []; // default = 0
    #selected = 0;
    
    get() {
        return this.#type[this.#selected];
    }
    
    constructor(type) {
        this.#selected = type;
        
        this.#type.push({
            accent: new nColor(186, 41, 43, 1),
            white: new nColor(255, 255, 255, 1),
            
            windowbg: new nColor(14, 14, 14, 1),
            
            closebtn: new nColor(255, 255, 255, 0.6),
            closebtn_h: new nColor(255, 255, 255, 0.9),
            closebtn_p: new nColor(255, 255, 255, 0.9),
            
            button: new nColor(35, 35, 35, 1),
            button_h: new nColor(41, 41, 41, 1),
            button_p: new nColor(41, 41, 41, 1),
            
        });
        
        console.warn("nTheme initalized..");
    }
}
