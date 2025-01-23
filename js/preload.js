function preload(){
    soul = loadImage("./img/soul.png");
    flowey = loadImage("./img/floweyangery.png");
    particleFlowey = loadImage("./img/friendpellet1.png");
    particleFlowey2 = loadImage("./img/friendpellet2.png");
    television = loadImage("./img/televisiondemonface.png")
    televisionHands = loadImage("./img/televisiondemon.png")
    televisionColor = loadImage("./img/televisionstaticcolor.png")
    televisionStatic = loadImage("./img/televisionstatic.png")
    televisionDemon = loadImage("./img/tvdemon.png")
    televisionDead = loadImage("./img/televisionbluescreen.png")
    attackGraph = loadImage("./img/attackgraph.png")
    staticImage = loadImage("./img/Television_static.gif")
    pentagramWhite = loadImage("./img/pentagram.png")
  
    fightButton = loadImage("./img/fightbutton.png")
    fightButtonSelected = loadImage("./img/fightbuttonselected.png")
  
    actButton = loadImage("./img/actbutton.png")
    actButtonSelected = loadImage("./img/actbuttonselected.png")
  
    itemButton = loadImage("./img/itembutton.png")
    itemButtonSelected = loadImage("./img/itembuttonselected.png")
  
    mercyButton = loadImage("./img/mercybutton.png")
    mercyButtonSelected = loadImage("./img/mercybuttonselected.png")
  
    soundFormats("mp3", "wav")
    static = loadSound("./audio/staticsound.mp3")
    hurt = loadSound("./audio/snd_hurt1.wav")
    menuSelect = loadSound("./audio/snd_select.wav")
    menuMove = loadSound("./audio/snd_squeak.wav")
    damage = loadSound("./audio/snd_damage.wav")
  
    scaryFont = loadFont("./fonts/DoubleHomicide.ttf")
    normalFont = loadFont("./fonts/DeterminationMonoWebRegular-Z5oq.ttf")
    damageFont = loadFont("./fonts/HachicroUndertaleBattleFontRegular-L3zlg.ttf")
    currentImage = television;
    buttons.push(fightButton, actButton, itemButton, mercyButton)
    buttonsSelected.push(fightButtonSelected, actButtonSelected, itemButtonSelected, mercyButtonSelected)
  }