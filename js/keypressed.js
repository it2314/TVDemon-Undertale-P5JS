function keyPressed() {
    if(menuLayer == 1){
      if ((key === 'a' || key === 'A' || key === 'ArrowLeft') && currentSelected >= 2 && !playMode) { // Check only if greater than 0
        menuMove.setVolume(0.3)
        menuMove.play()
        currentSelected--;
      }else if((key === 'a' || key === 'A' || key === 'ArrowLeft') && currentSelected == 2 && !playMode && acting == true){
        currentActSelected--;
      }
    
      if ((key === 'd' || key === 'D' || key === 'ArrowRight')  && currentSelected <= 4-1 && !playMode) { // Check only if less than 4
        menuMove.setVolume(0.3)
        menuMove.play()
        currentSelected++;
      }

      if (key === 'Enter' && !playMode && currentSelected != 0) { // Check for Enter key and valid selection
      
        if(menuLayer == 1){
          switch(currentSelected) {
            case 1:
              menuSelect.setVolume(0.3)
              menuSelect.play()
              menuLayer = 2;
              fightingl2 = true;
              break;
            case 2:
              act();
              menuSelect.setVolume(0.3)
              menuSelect.play()
              break;
            case 3:
              item();
              menuSelect.setVolume(0.3)
              menuSelect.play()
              break;
            case 4:
              mercy();
              menuSelect.setVolume(0.3)
              menuSelect.play()
              break;
            default:
              console.log("guck you");
          }
        }      
      }
    } else if (fighting === true && key === 'Enter' && fightingl2 == true) {
      // Log the position of movingRectangle when fighting is true
      if (movingRectangle) {
        rectangleTimer += 1;
        movingRectangle.speed = 0;
      }
    }else if (key === 'Enter' && menuLayer == 2){
      if(currentSelected == 1){
        menuSelect.setVolume(0.3)
        menuSelect.play()
        fight()
      }

      if(key === 'Enter' && currentSelected == 2 && acting == true){
        if(currentActSelected != 0){
          menuLayer = 3;
          index = 0;
          startMercyWait(mercyWaitTime)
        }
      }
    }

    if(menuLayer == 2){
      if((key === 'd' || key === 'D' || key === 'ArrowRight')  && acting == true){
        currentActSelected++;
        currentActSelected = constrain(currentActSelected, 1, 3)
      }

      if((key === 'a' || key === 'A' || key === 'ArrowLeft')  && acting == true){
        currentActSelected--;
        currentActSelected = constrain(currentActSelected, 1, 3)
      }
    }

    

    if(keyCode === 16 && menuLayer == 2 && isWaitingMercy != true && fighting != true){
      acting = false;
      fightingl2 = false;
      menuLayer = 1;
      currentActSelected = 0;
    }

    if(keyCode == 81){
      debugInfoDraw = !debugInfoDraw
    }
  
  }