let testvar = { value: false };

let ui = new NanoUI("game-window", new vec2(2048, 2048));


ui.newWindow("NanoUI Demo Window", new vec2(700, 250), new vec2(640, 400), (win) => {
    win.onUpdate(); //  call update for current window 
    win.setWindowRounding(8); // set rounding for current window
    
    
    if(win.newButton("Test##1", new vec2(10, 10), new vec2(160, 35), 4)) {
      console.log("clicked, amazing")
    }
})

ui.newWindow("Second Window", new vec2(100,100), new vec2(500, 300),(win) => {
    win.onUpdate();
    
    
    win.newButton("Test##2", new vec2(10, 10), new vec2(160, 35));
})
    
    
    