class Card{
    constructor(card, counter){
        // 48, 70 Topleft corner
        this.counter = counter;
        this.isPicked = false;
        this.isFighting = false;

        //Starting position of players cards
        this.offSetPlayerCardsY = 620;
        this.offSetPlayerCardsX = 50;
        
        

        loadImage('Assets/CardParts/CardProto.png', (cardImage) => {
            this.width = cardImage.width;   
            this.height = cardImage.height;
            this.sprite = createSprite((((cardImage.width * this.counter) + cardImage.width / 2) + this.offSetPlayerCardsX) + (this.offSetPlayerCardsX * this.counter) , (cardImage.height / 2) + this.offSetPlayerCardsY);                                                                                        
            loadImage(card.asset, (partImage) => {
                this.partImage = partImage;
                this.cardImage = cardImage;
                this.pg = createGraphics(cardImage.width, cardImage.height);
                this.pg.image(this.cardImage, 0, 0);
                this.pg.image(this.partImage, (cardImage.width / 2) - (partImage.width * 0.8 / 2) , (cardImage.height / 2) - (partImage.height * 0.8 / 2) - 10, this.partImage.width * 0.8, this.partImage.height * 0.8);
                //Possible bug, had to refresh a couple of times so that it wrote the texts.
                this.pg.text("Name 1", 17 , 4, 50, 50);
                this.pg.text(card.health, 24 , 112, 50, 50);
                this.pg.text(card.damage, 65 , 112, 50, 50);
                this.pg.depth = 12;
            });
            this.sprite.width = cardImage.width;
            this.sprite.height = cardImage.height;
            this.sprite.depth = 11;
            this.sprite.visible = false;
        });
    } 

    draw(){
        //drawSprite(this.sprite);
        if(this.pg != undefined && this.counter > -1){
            drawSprite(this.sprite);
            this.sprite.debug = mouseIsPressed;
            this.sprite.visible = mouseIsPressed;
            image(this.pg, this.sprite.position.x - this.width / 2, this.sprite.position.y - this.height / 2);
        }
    }

    getHealth(){
        return this.health;
    }
    getAttack(){
        return this.attack;
    }
    setHealth(newHealth){
        this.health = newHealth;
    }
    setAttack(newAttack){
        this.attack = newAttack;
    }

}