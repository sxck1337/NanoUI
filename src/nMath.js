class vec2 {
    
    calcCenter(size) {
        let temp = new vec2(this.x + size.x, this.y + size.y);
        return new vec2((this.x + temp.x) / 2, (this.y + temp.y) / 2) 
    }
    
    to_string() {
        return "x: " + this.x + ", y: " + this.y
    }
    
    add(other) {
        return new vec2(this.x + other.x, this.y + other.y);
    }
    
    sub(other) {
        return new vec2(this.x - other.x, this.y - other.y);
    }
    
    div(other) {
        return new vec2(this.x / other.x, this.y / other.y);
    }

    times(factor) {
        return new vec2(this.x * factor, this.y * factor);
    }
   
    constructor(x, y) {
        this.x = x; this.y = y;
    }
}
 

class vec3 {
    
    add(other) {
        return new vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    times(factor) {
        return new vec3(this.x * factor, this.y * factor, this.z * factor);
    }
   
    constructor(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
}

class nColor {
    
    // changes the alpha for current instance
    setAlpha(a) {
        this.a = a;
    }
    
    // returns color with custom alpha without changing its original alpha
    retAlpha(a) {
        return new nColor(this.r, this.g, this.b, a);
    }
  
    constructor(r, g, b, a) {
        this.r = r; this.g = g; this.b = b; this.a = a;
    }
}