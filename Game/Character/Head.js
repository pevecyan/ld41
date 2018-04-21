class Head extends AttachmantPart{
    constructor(x,y, type, parts = [], attachPoints = []){
        super(x,y, type);

        this.type = AllCards.Cards[type]; 


        this.sprite = createSprite(x,y);
        this.sprite.addImage(loadImage(this.type.asset));
        this.sprite.debug = true;
        this.parts = parts;

        this.attachPoints = attachPoints;
        this.usedAttachPoints = [];

        this.parts.forEach(p=>{
            p.setParent(this);
        })


        this.scale = 1;;

        this.visibleAttachPoints = false;
    }


    draw(deltaRotation, movements){
        push();

        push();
        scale(this.scale);
        drawSprite(this.sprite);
        this.handleOverlap();
        pop();

        if (this.visibleAttachPoints){
            this.getUnusedAttachPoints().forEach(p=>{
                push();
                fill(255);
                translate(p.position.x, p.position.y)
                ellipse(0,0,10);
                pop();
            })
        }
        
        this.parts.forEach(part=>{
            part.draw(deltaRotation, movements);
        })
        
        pop();

        
    }
    



}
