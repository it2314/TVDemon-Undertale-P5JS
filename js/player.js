class Player{
    constructor(){
      this.size = 24
      this.X = actionBox.X - this.size/2 + actionBox.width/2
      this.Y = actionBox.Y - this.size/2 + actionBox.height/2
      this.normalSpeed = 8;
      this.diagonalSpeed = this.normalSpeed*0.707;
      this.keyCount = 0;
      this.health = 100;
      this.invincible = false;
    }
  
    draw(){
      player.update()
      noStroke()
      fill(0,0,255)
      noSmooth();
      tint(255)
  
      image(soul, this.X, this.Y, this.size ,this.size)
    }
  
    update() {
  
      this.keyCount = 0;
      if (keyIsDown(87)) this.keyCount++; // 'W'
      if (keyIsDown(65)) this.keyCount++; // 'A'
      if (keyIsDown(83)) this.keyCount++; // 'S'
      if (keyIsDown(68)) this.keyCount++; // 'D'
    
  
      if (keyIsDown(87) || keyIsDown(UP_ARROW)) { // 'W'
        this.Y -= this.keyCount > 1 ? this.diagonalSpeed : this.normalSpeed;
      }
      if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // 'A'
        this.X -= this.keyCount > 1 ? this.diagonalSpeed : this.normalSpeed;
      }
      if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { // 'S'
        this.Y += this.keyCount > 1 ? this.diagonalSpeed : this.normalSpeed;
      }
     
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { // 'D'
        this.X += this.keyCount > 1 ? this.diagonalSpeed : this.normalSpeed;
      }
  
      this.collision()
    }
  
    collision(){
  
      // LEFT 
      if(this.X < actionBox.X){
        this.X = actionBox.X
      }
  
      //RIGHT
      if(this.X + this.size > actionBox.X + actionBox.width){
        this.X = actionBox.X + actionBox.width - this.size
      }
  
      //UP
      if(this.Y < actionBox.Y){
        this.Y = actionBox.Y
      }
  
      //DOWN
      if(this.Y + this.size > actionBox.Y + actionBox.height){
        this.Y = actionBox.Y + actionBox.height - this.size
      }
  
    }
  }