class Particle{
    constructor(){
      this.X = random(actionBox.X - 100, actionBox.X + actionBox.width + 100)
      this.Y = random(actionBox.Y - 100, actionBox.Y + actionBox.height + 100)
      this.size = 20
      this.image = particleFlowey
      this.speed = 3
      this.lastAnimationTime = random(0, 800);
      this.time = 0;
    }
  
    update() {
      // Calculate the direction vector
      let dx = (player.X + player.size / 2) - this.X;
      let dy = (player.Y + player.size / 2) - this.Y;
  
      // Calculate the distance (magnitude)
      let distance = Math.sqrt(dx * dx + dy * dy);
  
      // If the distance is greater than a small threshold, move the particle
      if (distance > 0.1) { 
          // Normalize the direction vector
          let normalizedDx = dx / distance;
          let normalizedDy = dy / distance;
  
          // Move the particle at a constant speed
          this.X += normalizedDx * this.speed;
          this.Y += normalizedDy * this.speed;
      }
      
      this.time++;
      this.collision(); // Handle collisions
  }
  
    
  
    draw() {
      this.update(); // Update the position
      this.animation(particleFlowey, particleFlowey2);
      tint(255)
      image(this.image, this.X, this.Y, this.size, this.size); // Draw the particle
    }
  
    collision(){
  
      for (let i = particles.length - 1; i >= 0; i--) { // Iterate backwards to handle removal
        let particle = particles[i];
  
        if(
          particle.X < player.X + player.size && // Particle's left is to the left of player's right
          particle.X + particle.size > player.X && // Particle's right is to the right of player's left
          particle.Y < player.Y + player.size && // Particle's top is above player's bottom
          particle.Y + particle.size > player.Y // Particle's bottom is below player's top
          ){
          particles.splice(i, 1)
          player.health = max(0, player.health - 1)
          hurt.setVolume(0.3)
          hurt.play()
        }
      }
    }
  
    animation(img1, img2) {
      let currentTime = millis();
      if (currentTime - this.lastAnimationTime > 50) { // Change every 500ms
        this.image = this.image === img1 ? img2 : img1;
        this.lastAnimationTime = currentTime; // Update animation time
      }
    }
  }