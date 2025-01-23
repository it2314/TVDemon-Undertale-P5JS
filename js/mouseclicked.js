function mouseClicked() {
    textVisible = true;
    menuLayer = 1;
    acting = false;
    
  
    switch(round(random(0, 11))) {
      case 0: currentDialogText = "* You see movement in the corner of your eye."; break;
      case 1: currentDialogText = "* You feel hands on your back."; break;
      case 2: currentDialogText = "* Your vision is getting blurry."; break;
      case 3: currentDialogText = "* The TV flickers."; break;
      case 4: currentDialogText = "* Fear is justified."; break;
      case 5: currentDialogText = "* The static pulses, like a heartbeat."; break;
      case 6: currentDialogText = "* Don't look directly at the screen."; break;
      case 7: currentDialogText = "* You can hear whispers around you."; break;
      case 8: currentDialogText = "* Your thoughts are drowning in the static."; break;
      case 9: currentDialogText = "* I AM ABOUT TO BLOW"; break;
      case 10: currentDialogText = "* 01100011 01110101 01101101"; break;
      case 11: currentDialogText = "* backshots bbg?"; break;
      default: console.log("nuh uh");
    }
  
    index = 0;
    playMode = !playMode;
  
    if (playMode) {
      menuLayer = 0; // Reset to initial menu layer
      textVisible = false; // Hide text in play mode
    } else {
      menuLayer = 1; // Transition to the menu layer
      textVisible = true;
    }
  }