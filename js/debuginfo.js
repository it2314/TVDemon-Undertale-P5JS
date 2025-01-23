function drawDebugInfo() {
    fill(255, 0, 0);
    noStroke();
    textSize(20);
    textFont(normalFont)

    const debugText = `
  DEBUG INFO:
  particle amount: ${particles.length}
  player health: ${player.health}
  demon health ${demonHealth}

  player X: ${player.X.toFixed(3)}
  player Y: ${player.Y.toFixed(3)}

  Action Box X: ${actionBox.X.toFixed(3)}
  Action Box Y: ${actionBox.Y.toFixed(3)}
  Action Box current width: ${actionBox.width.toFixed(3)}
  Action Box current height: ${actionBox.height.toFixed(3)}
  Action Box set width: ${currentBoxWidth}
  Action Box set height: ${currentBoxHeight}

  current mode: ${playMode}
  current selected square: ${currentSelected}
  current selected act: ${currentActSelected}
  menu layer: ${menuLayer}
  text visible: ${textVisible}
  fighting: ${fighting}
  acting: ${acting}
  fightingl2: ${fightingl2}

  frame rate: ${frameRate().toFixed(2)}
  time (tickrate?): ${time.toFixed(2)}
  current index: ${index}
  rectangle timer: ${rectangleTimer}
    `;
    text(debugText, 0, 0);
    textSize(100)
    //text("Qwambee was here", width/2 - 380, height/2, )
}