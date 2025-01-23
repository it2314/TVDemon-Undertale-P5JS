function fight() {
    menuLayer = 2;
    fighting = true;
    
    // Spawn a rectangle only if one doesn't already exist
    if (!movingRectangle) {
      let rectWidth = 20;
      let rectHeight = actionBox.height;
      let rectX = actionBox.X + actionBox.width - rectWidth; // Start at the right edge of actionBox
      let rectY = actionBox.Y;
  
      // Create the rectangle object
      movingRectangle = {
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: rectHeight,
        speed: 10   // Speed of movement
      };
    }
  }

  function item(){
    menuLayer = 2;
    textVisible = false; // Hide text when entering act
    // Add specific behavior for "act"
    console.log("Item action executed");
  }
  
  function act(){
    menuLayer = 2;
    textVisible = false; // Hide text when entering act
    acting = true;
  }
  
  
  function mercy() {
    menuLayer = 2;
    isWaitingMercy = true; // Start waiting
    
    // Set the text and ensure text is visible during the wait
    currentDialogText = "* You tried to talk to the TV but no answer came.";
    textVisible = true; // Ensure text is visible during the wait
  
    // Start the wait process
    index = 0;
    startMercyWait(mercyWaitTime);
  }
  
  function startMercyWait(duration) {
    mercyStartTime = millis(); // Store the current time
    isWaitingMercy = true;      // Set waiting flag to true
    mercyWaitTime = duration;   // Set the desired wait time
  }
  
  function checkMercyWait() {
    if (isWaitingMercy && millis() - mercyStartTime > mercyWaitTime) {
      isWaitingMercy = false;  // Stop waiting after the specified time
      playMode = 1;            // Set playMode to 1 after waiting
      currentSelected = 0;     // Reset the selected option, if needed
      textVisible = false;     // Hide the text after the wait
      currentActSelected = 0;
      demonDamage = false;
    }
  }