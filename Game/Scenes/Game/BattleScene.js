class BattleScene extends Scene{
    
    constructor(character){
        super();
        this.character = character;
        this.Cards = [];
        for(var i = 0; i < this.character.usedCards.length; i++){
            var c = this.character.usedCards[i];
            this.Cards.push(new Card(this.character.usedCards[i].card, i));
        }
    }

    loaded(){

    }

    draw(){
        noStroke();
        fill('#c96168');
        rect(0,0, this.width(), this.height());

        for(var i = 0; i < this.character.usedCards.length; i++){
            this.Cards[i].draw();
        }
    }
}