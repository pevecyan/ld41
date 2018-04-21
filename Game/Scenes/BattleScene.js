class BattleScene extends Scene{
    
    constructor(){
        super();
        this.card = new Card(0,0,0,"card");

    }

    loaded(){

    }

    draw(){
        noStroke();
        fill('#c96168');
        rect(0,0, this.width(), this.height());

        this.card.draw();
    }
}