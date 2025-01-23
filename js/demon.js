class Demon{
    constructor(){
        this.x;
        this.y;
    }


    draw(){
        let math1;
        let math2;

        noSmooth();
        tint(255)
        translate(
        actionBox.X + actionBox.width / 2 - 300 / 2 + 50 * 3,
        actionBox.Y - 240 + 67 * 3 / 2
        );

        if(demonHealth > 0){
            rotate(Math.sin(time) * 1)
            math1 = Math.cos(2 * time + Math.sin(time)/time) * 20;
            math2 = Math.sin(time) * Math.cos(time) * 20
        }else{
            math1 = 0;
            math2 = 0;
        }

        
       
        image(
        currentImage,
        -50 * 3 + math1,
        -67*3/2 + math2,
        100 * 3,
        67 * 3
        );
        
        if(demonHealth > 0){
            rotate(-(Math.sin(time) * 1))
        }
        translate(
            -(actionBox.X + actionBox.width / 2 - 300 / 2 + 50 * 3),
            -(actionBox.Y - 240 + 67 * 3 / 2)
            );
    }  
}