
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
}