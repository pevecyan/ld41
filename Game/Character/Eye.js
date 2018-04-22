class Eye extends BodyPart{
    constructor(parentAttachPoint, type, parts = []){
        super(parentAttachPoint.position.x,parentAttachPoint.position.y, type);
       
        this.type = AllCards.Cards[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));

 
        this.rotation = 0;
        this.scale = 1;
        this.parentAttachPoint = parentAttachPoint;

        this.parts = parts;
    }


    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        
        this.translateSprite(this.parentAttachPoint.position.x, this.parentAttachPoint.position.y)
        
        rotate(this.rotation);
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