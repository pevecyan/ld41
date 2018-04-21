class Tail extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            tailProto:{asset:'Assets/tail-proto.png', attachPoint:{x:0,y:30}}  
        };



        this.type = this.types[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));
        this.sprite.debug = true;

        this.position = {x,y};
        this.rotation = 0;

        this.parts = parts;

        this.direction = 1;
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

    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        this.translateSprite(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);

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
        
        
        rotate(this.rotation);
        this.translateSprite(this.type.attachPoint.x, this.type.attachPoint.y)
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

    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
    }

}