class Body extends AttachmantPart{
    constructor(parentAttachPoint, type, parts = [], attachPoints = []){
        super(parentAttachPoint.position.x,parentAttachPoint.position.y, type);
        
        this.type = AllCards.Cards[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));
        this.sprite.debug = true;

        this.position = parentAttachPoint.position;
        this.rotation = 0;

        this.parentAttachPoint = parentAttachPoint;

        this.attachPoints = attachPoints;
        this.usedAttachPoints = [];

        this.parts = parts;

        this.parts.forEach(p=>{
            p.setParent(this);
        })


        this.direction = 1;
        this.scale = 1;

        this.visibleAttachPoints = false;
    }


    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        this.translateSprite(this.position.x, this.position.y)

        if (movements.forward){
            if (this.direction < 0) {
                this.rotation += 0.01*(1.5+Math.random()*2);
            } else if(this.direction > 0) {
                this.rotation -= 0.01*(1.5+Math.random()*2);
            }
            if (this.rotation < -0.3) {
                this.direction = -1;
            } else if(this.rotation > 0.3) {
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

        if (this.visibleAttachPoints){
            this.getUnusedAttachPoints(false).forEach(p=>{
                push();
                fill(255);
                translate(p.position.x, p.position.y)
                ellipse(0,0,10);
                pop();
            })
        }
        if (engine.scenesManager.isSceneType(EditorScene)){
        fill(255,255,255,200);
        ellipse(-this.type.attachPoint.x, -this.type.attachPoint.y, 10)
        }

        this.parts.forEach(part=>{
            part.draw(deltaRotation, movements);
        })
        pop();
        this.restoreCollider();
    }




}