class Head extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            headProto:'Assets/head-proto.png'  
        };


        this.sprite = createSprite(x,y);
        this.sprite.addImage(loadImage(this.types[type]));
        this.sprite.debug = true;
        this.parts = parts;

        this.scale = 1;
        this.overlaping = false;
        this.collider = undefined;
        this.onColliderOverlap = undefined;
    }


    draw(deltaRotation, movements){
        push();
        push();
        scale(this.scale);
        drawSprite(this.sprite);
        this.handleOverlap();
        pop();
        
        this.parts.forEach(part=>{
            part.draw(deltaRotation, movements);
        })
        
        pop();

        
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }

    handleOverlap(){
        if (this.collider){
            if (this.collider.overlap(this.sprite)){
                this.onColliderOverlap(this);
                this.onMouseOver();
                
            } else {
                this.onMouseOut();
            }
        }
    }

    updateCollider(collider, onColliderOverlap){
        this.collider = collider;
        this.onColliderOverlap = onColliderOverlap;
        this.parts.forEach(p=>{
            
            p.updateCollider(collider, onColliderOverlap);
        })
    }

}