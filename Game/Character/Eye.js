class Eye extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            eyeProto:  {asset:'Assets/eye-proto/eye-body.png', attachPoint:{x:0,y:0}}
        };

        this.type = this.types[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));

        this.position = {x,y};
        this.rotation = 0;
        this.scale = 1;

        this.parts = parts;
    }


    draw(deltaRotation, movements){
        push();
        //translate(this.position.x, this.position.y);

        
        this.translateSprite(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);
        
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
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
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