class Card{
    constructor(card, counter){
        // 48, 70 Topleft corner
        this.counter = counter;
        this.isPicked = false;
        
        //Starting position of players cards
        this.offSetPlayerCardsY = 620;
        this.offSetPlayerCardsX = 50;
        //Starting position of enemies cards
        this.offSetEnemyCardsY = 100;

        this.mouseCollider = createSprite(0,0);
        this.mouseCollider.debug = true;
        this.mouseCollider.setCollider('circle',0,0,4);

        loadImage('Assets/CardParts/CardProto.png', (cardImage) => {
            this.width = cardImage.width;   
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
            });
            this.sprite.width = cardImage.width;
            this.sprite.height = cardImage.height;
            this.sprite.visible = false;
        });
        
        //this.img = loadImage('Assets/CardParts/CardProto.png');
        //this.pg = createGraphics(this.img.width, this.img.height);
    } 

    draw(){
        this.mouseCollider.position.x = mouseX;
        this.mouseCollider.position.y = mouseY;
        //drawSprite(this.sprite);
        if(this.pg != undefined){
            drawSprite(this.sprite);
            drawSprite(this.mouseCollider);
            this.sprite.debug = mouseIsPressed;
            this.sprite.visible = mouseIsPressed;
            if(this.mouseCollider.overlap(this.sprite) && mouseIsPressed){
                this.isPicked = true;
            }
            else{
                this.isPicked = false;
            }
            if(this.isPicked){
                push();
                scale(1.5);
                image(this.pg, this.width * this.counter, 0);
                pop();
            }
            else{
                image(this.pg, ((this.width * this.counter) + this.offSetPlayerCardsX) + (this.offSetPlayerCardsX * this.counter), this.offSetPlayerCardsY);
            }
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