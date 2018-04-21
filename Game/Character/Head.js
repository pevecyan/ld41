class Head extends BodyPart{
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

        

        this.scale = 1;
        this.overlaping = false;
        this.collider = undefined;
        this.onColliderOverlap = undefined;

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
        } else {
            this.onMouseOut();
                this.mousePressedOn = false;
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

    useAttachPoint(attachPoints){
        this.usedAttachPoints.push(attachPoints);
    }

    showAttachPoints(){
        this.visibleAttachPoints = true;
    }
    hideAttachPoint(){
        this.visibleAttachPoints = false;
    }
    getUnusedAttachPoints(){
        return this.attachPoints.filter(a=>this.usedAttachPoints.indexOf(a)==-1);
    }
    freeAttachPoint(ap){
        let index = this.usedAttachPoints.indexOf(ap);
        if(index > -1){
            this.usedAttachPoints.splice(index,1);
        }
    }

    getNearestUnusedPoint(x,y){
        let unusedAttachPoint = this.getUnusedAttachPoints();

        unusedAttachPoint = unusedAttachPoint.map(a=>{
            return {
                attachPoint: a,
                distance: Math.sqrt(Math.pow((x-a.position.x),2)+Math.pow(y-a.position.y,2))
            }
        }).sort((a,b)=>a.distance-b.distance);

        return unusedAttachPoint[0];


    }

    addPart(item, point){
       // this.usedAttachPoints.push(point.attachPoint);

        let attachmentIndex = this.attachPoints.indexOf(point.attachPoint);

        if (item.card.type == 'Tail') {
            this.parts.push(new Tail(point.attachPoint,item.card.id));
        }
        else if (item.card.type == 'Eye'){
            this.parts.push(new Eye(point.attachPoint,item.card.id));
        }
        this.parts.forEach(p=>{
            p.setParent(this);
        })

        this.updateCollider(this.collider, this.onItemClick);
        //
    }
}
