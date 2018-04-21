class BattleScene extends Scene{
    
    constructor(character){
        super();
        this.X = undefined;
        this.Y = undefined;

        this.cardOnMouse = undefined;
        this.Placed = false;
        this.onBattleField = false;

        this.battleField = createSprite(200, 400);
        this.battleField.debug = true;
        this.battleField.width = 300;
        this.battleField.height = 300;
        this.battleField.depth = 1;
        this.battleField.visible = false;

        this.mouseCollider = createSprite(0,0);
        this.mouseCollider.debug = true;
        this.mouseCollider.width = 10;
        this.mouseCollider.height = 10;
        this.mouseCollider.setCollider('circle',0,0,4);

        this.character = character;
        this.enemy = character;
        this.allCharacterCards = [];
        
        this.allCharacterCards = [];
        this.characterDeck = [];
        this.characterEquipedCards = []; //Starting Hand

        this.allEnemyCards = [];
        this.enemyDeck = [];
        this.enemyEquipedCards = []; //Starting Hand
        //Define all equiped cards
        for(var i = 0; i < this.character.usedCards.length; i++){
            this.allCharacterCards.push(new Card(this.character.usedCards[i].card, i)); //Probably useless
            if(i < 3)
                this.characterEquipedCards.push(new Card(this.character.usedCards[i].card, i));
            else
                this.characterDeck.push(new Card(this.character.usedCards[i].card, -1));
        }
        for(var i = 0; i < this.enemy.usedCards.length;i++){
            this.allEnemyCards.push(new EnemyCard(this.enemy.usedCards[i].card, i)); //Probably useless
            if(i < 3)
                this.enemyEquipedCards.push(new EnemyCard(this.enemy.usedCards[i].card, i));
            else
                this.enemyDeck.push(new EnemyCard(this.enemy.usedCards[i].card, -1));
        }

    }

    loaded(){

    }

    draw(){
        this.mouseCollider.position.x = mouseX;
        this.mouseCollider.position.y = mouseY;
        
        noStroke();
        fill('#c96168');
        rect(0,0, this.width(), this.height());
        
        drawSprite(this.battleField);
        drawSprite(this.mouseCollider);
        if(this.itemOnMouse){
            if(this.itemOnMouse.sprite.overlap(this.battleField) && !mouseIsPressed && !this.onBattleField){
                this.itemOnMouse.sprite.position.x = 155 + this.itemOnMouse.sprite.width / 2;
                this.itemOnMouse.sprite.position.y = 330 + + this.itemOnMouse.sprite.height / 2;
                this.Placed = true;
                this.onBattleField = true;
            }
            else{
                this.itemOnMouse.sprite.position.x = mouseX;
                this.itemOnMouse.sprite.position.y = mouseY;
            }
        }
        this.characterEquipedCards.forEach(card => {
            if(card.sprite != undefined ){
                if(card == this.cardOnMouse){}
                else{
                    card.draw();
                }
    
                if(card.sprite.overlap(this.mouseCollider)){
                    card.sprite.scale = 1.2;
                    if(mouseIsPressed && !this.itemOnMouse){
                        this.X = card.sprite.position.x;
                        this.Y = card.sprite.position.y;
                        this.itemOnMouse = card;
                    }
                }
                else{
                    card.sprite.scale = 1;
                    if(!mouseIsPressed && this.itemOnMouse){
                        if(this.Placed){
                            this.itemOnMouse = undefined;
                            this.Placed = false;
                        }
                        else{
                            this.itemOnMouse.sprite.position.x = this.X;
                            this.itemOnMouse.sprite.position.y = this.Y;
                            this.itemOnMouse = undefined;
                        }
                    }
                }
            }
        });
        
        for(var i = 0; i < this.characterEquipedCards.length; i++){
            this.characterEquipedCards[i].draw();
        }
        for(var i = 0; i < this.enemyEquipedCards.length; i++){
            this.enemyEquipedCards[i].draw();
        }
    }
}