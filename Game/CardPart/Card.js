class Card{
    constructor(id, health, attack, info){
        // 48, 70 Topleft corner
        this.id = id;
        this.health = health;
        this.attack = attack;
        this.info = info;
        
        this.sprite = createSprite(48, 70);
        this.sprite.addImage(loadImage('Assets/CardParts/Heads/head1.png'));
    }

    draw(){
        drawSprite(this.sprite);
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