class WorldScene extends Scene{

    constructor(){
        super();
        this.character = new Character();
    }

    loaded(){
        
    }

    draw(){
        noStroke();
        fill('#6aa177');
        rect(0,0,this.width(), this.height());

        this.character.draw();
    }

    keyPressed(){
        if(keyCode == 69){
            engine.scenesManager.pushNewScene(new EditorScene(this.character));
        }
        if(keyCode == 66){
            engine.scenesManager.pushNewScene(new BattleScene(this.character));
        }
    }
}