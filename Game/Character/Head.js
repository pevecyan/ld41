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
        this.parts.forEach(p=>{
            p.setParent(this);
        })

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
        if (this.collider && this.parts.length == 0){
            if (this.collider.overlap(this.sprite)){
                if (mouseIsPressed){this.mousePressedOn = true; }
                if (!mouseIsPressed && this.mousePressedOn)  this.onItemClick(this);
                this.onMouseOver();
                
            } else {
                this.onMouseOut();
                this.mousePressedOn = false;
            }
        }
    }

    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
        this.parts.forEach(p=>{
            p.updateCollider(collider, onItemClick);
        })
    }

    setParent(parent){this.parent = parent}
}