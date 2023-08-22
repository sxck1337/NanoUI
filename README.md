# NanoUI JavaScript Canvas Library (w.i.p)

NanoUI is a lightweight JavaScript canvas library that aims to provide a user interface toolkit similar to ImGui. This project is currently a work in progress and is being developed as a side project.

## Features

- Simple and intuitive API for creating user interfaces on the canvas.
- Lightweight and minimalistic, designed for fast and efficient UI rendering.
- Inspired by the popular ImGui library, making it familiar to developers.

## Installation

```bash
todo
```

## Example Usage (app.js)

```javascript
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
    
```

## Getting Started

1. Download NanoUI from this repo.
2. Include the NanoUI library in your project.
3. Create a canvas element in your HTML file with a unique ID.
4. Initialize NanoUI with the canvas element.
5. Use the provided methods to create windows, buttons, and other UI elements.


## Contribution

Contributions are welcome! Feel free to fork this repository and submit pull requests. Keep in mind that this project is currently a side project and may not be actively maintained.

## License

NanoUI is released under the [MIT License](LICENSE).

---

*Note: This library is a work in progress and may undergo significant changes before reaching a stable version, most of the features are incomplete and are being worked on.*
