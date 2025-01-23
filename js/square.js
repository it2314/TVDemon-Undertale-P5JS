class Square{
    constructor(){
  
      this.width = 200;
      this.height = 200;
      this.X = (windowWidth/2)-this.width/2
      this.Y = (windowHeight/2)-this.height/2 + 70
      this.lineWidth = 10;
  
    }
  
    draw(){
      noStroke()
      fill(0)
      rect(this.X, this.Y , this.width, this.height);
    
      stroke(255)
      strokeWeight(this.lineWidth)
      strokeCap(SQUARE);
    
      //LEFT SIDE
      line(this.X - this.lineWidth/2, this.Y, this.X - this.lineWidth/2, this.Y + this.height )
      //RIGHT SIDE
      line(this.X + this.lineWidth/2 + this.width, this.Y, this.X + this.lineWidth/2  + this.width, this.Y + this.height )
      //TOP SIDE
      line(this.X - this.lineWidth, this.Y - this.lineWidth/2 , this.X + this.width + this.lineWidth, this.Y - this.lineWidth/2)
      //BOTTOM SIDE
      line(this.X - this.lineWidth, this.Y + this.lineWidth/2 + this.height , this.X + this.width + this.lineWidth, this.Y + this.lineWidth/2 + this.height)
      
    }
  }