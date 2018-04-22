class Tail extends BodyPart{
    constructor(parentAttachPoint, type, parts = []){
        super(parentAttachPoint.position.x,parentAttachPoint.position.y, type);
        



        this.type = AllCards.Cards[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));
        this.sprite.debug = false;

        this.rotation = 0;

        this.parentAttachPoint = parentAttachPoint;

        this.parts = parts;

        this.direction = Math.random()>5?1:-1;
        this.scale = 1;
    }


    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        this.translateSprite(this.parentAttachPoint.position.x, this.parentAttachPoint.position.y)

        if (movements.forward){
            if (this.direction < 0) {
                this.rotation += 0.05*(1.5+Math.random()*2)+Math.abs(deltaRotation);
            } else if(this.direction > 0) {
                this.rotation -= 0.05*(1.5+Math.random()*2)+Math.abs(deltaRotation);
            }
            if (this.rotation < -0.7) {
                this.direction = -1;
            } else if(this.rotation > 0.7) {
                this.direction = 1;
            }
        } else {
            this.rotation += deltaRotation*(1.5+Math.random()*2);
            
        }
        this.rotation = Math.min(1, Math.max(-1, this.rotation));
        
        
        rotate(this.rotation + this.parentAttachPoint.rotation);
        this.translateSprite(this.type.attachPoint.x, this.type.attachPoint.y);
        
        this.handleOverlap()
        

        push();
        scale(this.scale);
        drawSprite(this.sprite);
        pop();

        if (engine.scenesManager.isSceneType(EditorScene)){
            fill(255,255,255,200);
            ellipse(-this.type.attachPoint.x, -this.type.attachPoint.y, 10)
        }
        

        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
        this.restoreCollider();
    }


}