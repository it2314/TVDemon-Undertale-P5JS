
let particles = [];
let images = [];
let lastChangeTime = 0;
let playMode = true;
let currentSelected = 0;
let currentActSelected = 0;
let currentDialogText = "";
let menuLayer = 0;
let menuTextToggle = false;
let textVisible = true; // Flag to control text visibility
let playerName = "Stinyx"
let debugInfoDraw = false;
let rectangleTimer = 0;
let fightingl2 = false;
let actText = false;
let demonDamage = false;
let demonDamageTimer = 0;

let lastFlickerTime = 0;
let flickerInterval; // Time in milliseconds between flickers (adjust as necessary)
let flickerChance = 0.1; // Chance for the flicker to occur on each frame (adjust as needed)

let demonHealth = 1000;
let movingRectangle = null; // Object to track the rectangle

let mercyWaitTime = 3000; // 3 seconds wait time
let mercyStartTime;
let isWaitingMercy = false;
let buttons = [];
let buttonsSelected = [];

let fighting = false;
let time = 0;
let index = 0;
let acting = false;

let actActions = ["* Check", "* Turn off", "* Talk"];
let encounter = false;

let currentBoxWidth = 250;
let currentBoxHeight = 750;

let diedThisFrame = true;

function setup() {
  frameRate(60);
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);

  actionBox = new Square()
  player = new Player()
  demon = new Demon()

}

function draw() {

  time+=0.01;

  background("black");

  let staticLevel = map(demonHealth, 1000, 0, 0, 255);
  if(demonHealth >= 0){
    tint(max(staticLevel, 0))
    image(staticImage, 0, 0, width, height)
  }
  currentMode();
  
  drawStats();
  //  image(pentagramWhite, actionBox.X, actionBox.Y)

  if(fighting == true){
    tint(255)
    image(attackGraph, actionBox.X, actionBox.Y, actionBox.width, actionBox.height)
  }

  

  fill(255)
  if(isWaitingMercy && menuLayer == 2 && currentSelected == 4){
    currentDialogText = "* You tried to talk to the TV but no answer came..."
    animatedText(currentDialogText, Math.min(currentDialogText.length, index++), actionBox.X + 20, actionBox.Y + 50)
  }
  
  checkMercyWait(); // Call checkMercyWait to check if the mercy wait is over
  

  if(menuLayer == 2 && fighting == true){
    updateAndDrawRectangle();
  }

  if(acting == true && currentActSelected > 0 && menuLayer == 3){
    switch(currentActSelected){
      case 0:
        break;
      case 1:
        currentDialogText = "* TV Demon - ATK ??? DEF ???\n* An old television with a face seemingly engraved into the screen."
        animatedText(currentDialogText, Math.min(currentDialogText.length, index++), actionBox.X + 20, actionBox.Y + 50)
        break;
      case 2:
        currentDialogText = "* You tried to turn off the television... there is no off button."
        animatedText(currentDialogText, Math.min(currentDialogText.length, index++), actionBox.X + 20, actionBox.Y + 50)
        break;
      case 3:
        currentDialogText = "* You tried to reason with the television, only static could be heard."
        animatedText(currentDialogText, Math.min(currentDialogText.length, index++), actionBox.X + 20, actionBox.Y + 50)
        break;
      default:
        console.log("huh?")

    }
  }

  if(fightingl2 == true && fighting != true){
    text("* Oscironis - \"The Eternal Flicker\"", actionBox.X + 20, actionBox.Y + 50)
    fill(169,5,8);
    rect(actionBox.X + 60, actionBox.Y + 90, 180, 40);
    fill(244,252,60);
    rect(actionBox.X + 60, actionBox.Y + 90, (demonHealth / 1000) * 180, 40);
  }

  if(acting == true && menuLayer == 2){
    for(let i = 0; i < actActions.length; i++){
      fill(255)
      
      if(i < 2){
        text(actActions[i], actionBox.X + 120 + 350*i, actionBox.Y + 50)
        if (currentActSelected != 0 && currentActSelected != 3){
          image(soul, actionBox.X + 120 + 350*(currentActSelected-1)  - soul.width, actionBox.Y + 50 - soul.width/2, 30, 30)
        }
        
      }else{
        text(actActions[i], actionBox.X + 120 , actionBox.Y + 110)
        if(currentActSelected == 3){
          image(soul, actionBox.X + 120  - soul.width, actionBox.Y + 110 - soul.width/2, 30, 30)
        }
      }
    }
  }
    
  if (particles.length > 0) {
      for (let particle of particles) {
          particle.draw();
          if(particle.time > 50){
            particles.splice(particle, 1)
          }
      }
  }

  if (keyIsDown(82)) { // Add particles on 'R'
      for (let i = 0; i < 5; i++) {
          particles.push(new Particle());
      }
  }

  if(demonHealth > 0 && demonDamage != true){
    flickerInterval = round(random(70, 300))
    handleFlicker();
  }else if(demonHealth <=0){
    currentImage = televisionDead
  }

  if(demonDamage == true){
    currentImage = televisionColor;
    demonDamageTimer ++;
  }

  if(demonDamageTimer >= 25){
    demonDamage = false;
  }

  if (keyIsDown(79)) { // 'O' key to expand box
      actionBox.width += 50;
      currentBoxWidth += 50;
      actionBox.X -= 25;
  }

  if (keyIsDown(73)) { // 'I' key to shrink box
      actionBox.width -= 50;
      currentBoxWidth -= 50;
      actionBox.X += 25;
  }
  demon.draw();

  if(player.health <= 0){
    
    index++;
    background(0);
    textAlign(CENTER, CENTER)
    textSize(260)
    text("GAME", windowWidth/2, windowHeight/2 - 300)
    text("OVER", windowWidth/2, windowHeight/2 - 100)
    text("OVER", windowWidth/2, windowHeight/2 - 100)
    textSize(30)
    text("- Press F5 to restart fight.", actionBox.X + 80, actionBox.Y + 150)
    
    textAlign(LEFT, LEFT)
    console.log(index)
  }

  if(player.health <= 0){
    if (diedThisFrame) {
      diedThisFrame = false;
      index = 0;
    }
    currentDialogText = "* Don't let the demon steal your soul, try again."
    animatedText(currentDialogText, index, actionBox.X - 260, actionBox.Y + 100)
  }
  

  if(debugInfoDraw){
    drawDebugInfo();
  }
}

function handleFlicker() {
  let currentTime = millis();
  // Check if the flicker time interval has passed
  if (currentTime - lastFlickerTime > flickerInterval) {
    lastFlickerTime = currentTime;

    // Random chance to flicker (switch to television static image)
    if (random() < flickerChance) {
      currentImage = televisionStatic;
      playSound(flickerInterval, static, 0.05)
    } else {
      // Otherwise, restore the normal image
      currentImage = television;
    }
  }
}

function playSound(duration, sound, volume) {
  let originalDuration = sound.duration();
  let speed = originalDuration / duration*1000;
  sound.rate(speed);
  sound.setVolume(volume)
  sound.play(); // Play the sound
  setTimeout(() => {
    sound.stop(); // Stop the sound after the specified duration
  }, duration);
}



function drawStats(){
  textSize(40);
  textFont(normalFont);
  fill(255);
  noStroke();
  text(playerName + "  LV 4 HP                 " + player.health + "/100", actionBox.X - 230, ActionBox.Y - ActionBox.height - 50);

  fill(169,5,8);
  rect(actionBox.X - 290, ActionBox.Y - ActionBox.height - 50, 290, 40);
  fill(244,252,60);
  rect(actionBox.X - 290, ActionBox.Y - ActionBox.height - 50, (player.health / 100) * 290, 40);
  
}

function drawMenu(){
  if (menuLayer != 1 && !menuTextToggle) {
    menuLayer = 2;
    menuTextToggle = true;
  }
  
  let numRectangles = 4; // Number of rectangles
  let spacing = 30; // Adjustable spacing between rectangles
  let totalSpacing = (numRectangles - 1) * spacing; // Total spacing between all rectangles
  let availableWidth = actionBox.width + 2 * actionBox.lineWidth - totalSpacing; // Width available for rectangles
  let rectWidth = availableWidth / numRectangles; // Width of each rectangle
  let rectHeight = 60;

  noStroke()
  
  if (actionBox.width > 750 && fighting == false && menuLayer == 1) { // Show text only if textVisible is true
    let textColor = map(demonHealth, 2000, 0, 255, 0);

    fill(255,textColor ,textColor );
    textFont(scaryFont);
    textSize(50);
    
    animatedText(currentDialogText, Math.min(currentDialogText.length, index++), actionBox.X + 20, actionBox.Y + 50);
  }

}

function calculateValue(x, ActionBox) {
  // Calculate the center of the ActionBox
  let center = ActionBox.X + ActionBox.width / 2;
  let halfWidth = ActionBox.width / 2; // The range for value to exist
  
  // Calculate the difference from the center
  let distanceFromCenter = Math.abs(x - center);

  // Scale the peak value at the center (adjust 0.5 to desired peak value)
  let peakValue = halfWidth * 0.35;

  // Compute the value, scaled and clamped
  let value = Math.max(0, peakValue - (distanceFromCenter * (peakValue / halfWidth)));

  return value;
}



function drawRectangles() {
  let numRectangles = 4; // Number of rectangles
  let rectWidth = 200; // Width of each rectangle
  let rectHeight = 80; // Height of each rectangle
  let spacing = 60; // Spacing between rectangles
  let totalSpacing = (numRectangles - 1) * spacing; // Total spacing between all rectangles
  let totalWidth = rectWidth * numRectangles + totalSpacing; // Total width of all rectangles and spacing
  let startX = (width - totalWidth) / 2; // X position for the first rectangle to center the group
  
  for (let i = 0; i < 4; i++) {
    // Set color based on selection
    if (i == currentSelected - 1) {
      fill(255, 0, 0); // Red for selected
    } else {
      fill(0, 0, 255); // Blue for unselected
    }
    
    // Calculate X position for each rectangle
    let x = startX + i * (rectWidth + spacing);
    let y = height/2 + 260
    
    // Draw the rectangle
    rect(x, y, rectWidth, rectHeight);
    if (buttons[i]) {
      if(i == currentSelected -1){
        tint(255)
        image(buttonsSelected[i], x, y, rectWidth, rectHeight);
        image(soul, x+ 10, y + 20, 40, 40)
      }else{
        tint(255)
        image(buttons[i], x, y, rectWidth, rectHeight);
      }

    }
  }
}

function animatedText(str, index, x, y){
  text(str.substr(0, index), x, y, 800, 800);
}

function currentMode(){

  if (playMode == true){
    menuLayer = 0;
      currentBoxWidth = 200;
    if(actionBox.width > currentBoxWidth){
      actionBox.width -= 50;
      actionBox.X += 25;
    }else if(actionBox.width < currentBoxWidth){
      actionBox.width += 50;
      actionBox.X -=25
    }

    actionBox.draw()
    player.draw()
    drawRectangles()

  }else if (playMode == false){
    currentBoxWidth = 800;
    if(actionBox.width < currentBoxWidth){
      actionBox.width += 50;
      actionBox.X -= 25;
    }

    actionBox.draw()
    drawMenu()
    drawRectangles()
  }
}

  function shouldChange(interval) {
    let currentTime = millis();
    if (currentTime - lastChangeTime > interval) {
      lastChangeTime = currentTime; // Update the last change time
      return true; // Indicate that the interval has passed
    }
    return false; // Interval has not yet passed
  }

function updateAndDrawRectangle() {
  menuLayer = 2;
  //textVisible = true; // Hide text when entering fight
  // Spawn a rectangle only if one doesn't already exist
  if (movingRectangle) {
    movingRectangle.x -= movingRectangle.speed; // Move the rectangle to the left

    // Draw the rectangle
    if(rectangleTimer % 10 == 0){
      fill(255); 
      stroke(0);
    }else{
      fill(0)
      stroke(255)
    }
    
    strokeWeight(4)
    rect(movingRectangle.x, movingRectangle.y, movingRectangle.width, movingRectangle.height);

    // Remove the rectangle if it moves out of the actionBox
    if (movingRectangle.x - movingRectangle.width < actionBox.X) {
      movingRectangle.speed = 0;
      rectangleTimer++;
      if(rectangleTimer > 50){
        demonHealth -= calculateValue(movingRectangle.x, actionBox);
        demonDamage = true;
        demonHealth = constrain(demonHealth, -1, demonHealth)
        movingRectangle = null; // Clear the rectangle
        playMode = 1;
        currentSelected = 0;
        fighting = false;
        damage.setVolume(0.3)
        damage.play()
        
        rectangleTimer = 0;
        fightingl2 = false;
        
      }
    }

    if(rectangleTimer > 0){
      rectangleTimer++;
      if(rectangleTimer > 50){
        demonHealth -= calculateValue(movingRectangle.x, actionBox);
        demonDamage = true;
        demonHealth = constrain(demonHealth, -1, demonHealth)
        movingRectangle = null; // Clear the rectangle
        playMode = 1;
        currentSelected = 0;
        fighting = false;
        damage.setVolume(0.3)
        damage.play()
        
        rectangleTimer = 0;
        fightingl2 = false;
        
      }
    }
  }
}
