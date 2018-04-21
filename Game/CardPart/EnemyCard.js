class EnemyCard{
    constructor(card, counter){
        // 48, 70 Topleft corner
        this.counter = counter;
        
        this.battleFieldCenterX = 200;
        this.battleFieldCenterY = 400;

        this.offSetEnemyCardsY = 50;
        this.offSetEnemyCardsX = 50;
        this.offSetX = 590;

        loadImage('Assets/CardParts/CardProto.png', (cardImage) => {
            this.width = cardImage.width;   
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
            });
        });
    } 

    draw(){
        if(this.pg != undefined && this.counter > -1){
            image(this.pg, ((this.width * this.counter) + this.offSetX) + (this.offSetEnemyCardsX * this.counter), this.offSetEnemyCardsY);
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