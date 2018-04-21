//0
class BodyPart{
    constructor(x,y, type){
    }

    attach(parent, type, x, y){
        
    }
    dettach(parent){
        parent.remove(this.sprite);
    };


    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }

    //Collider stuff
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

    translateSprite(x,y){
        translate(x,y);
        if(this.collider){
            this.collider.position.x  = this.collider.position.x -x
            this.collider.position.y  = this.collider.position.y -y
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

    //Hiarchy
    setParent(parent){
        this.parent = parent;
        this.parent.useAttachPoint(this.parentAttachPoint);
    }
}