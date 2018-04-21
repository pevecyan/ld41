class Eye extends BodyPart{
    constructor(parentAttachPoint, type, parts = []){
        super(parentAttachPoint.position.x,parentAttachPoint.position.y, type);
       
        this.type = AllCards.Cards[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));

        this.position = parentAttachPoint.position;
        this.rotation = 0;

        this.parentAttachPoint = parentAttachPoint;

        this.rotation = 0;
        this.scale = 1;

        this.parts = parts;
    }


    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        
        this.translateSprite(this.position.x, this.position.y)
        
        rotate(this.rotation);
        this.translateSprite(this.type.attachPoint.x, this.type.attachPoint.y);
        this.handleOverlap()


        push();
        scale(this.scale);
        drawSprite(this.sprite);
        pop();

        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
        this.restoreCollider();
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }

    storeCollider(){
        if(this.collider)
            this.oldColliderPosotion = {x:this.collider.position.x,y:this.collider.position.y};
    }
    restoreCollider(){
        if(this.collider){
            this.collider.position.x = this.oldColliderPosotion.x;
            this.collider.position.y = this.oldColliderPosotion.y;

        }
    }



    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
    }

    handleOverlap(){
        if (this.collider){
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

    translateSprite(x,y){
        translate(x,y);
        if(this.collider){
            this.collider.position.x  = this.collider.position.x -x
            this.collider.position.y  = this.collider.position.y -y
        }
    }


    setParent(parent){this.parent = parent}
}