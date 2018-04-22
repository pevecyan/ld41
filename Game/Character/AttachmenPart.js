//1
class AttachmantPart extends BodyPart{
    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
        this.parts.forEach(p=>{
            p.updateCollider(collider, onItemClick);
        })
    }

    handleOverlap(){

        


        if (this.collider && this.parts.length == 0){
            let distance =  Math.sqrt(
                Math.pow((-this.type.attachPoint.x-this.collider.position.x),2)+
                Math.pow(-this.type.attachPoint.y-this.collider.position.y,2)
            )
            if (distance< 25){
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

    
    useAttachPoint(attachPoints){
        this.usedAttachPoints.push(attachPoints);
    }

    
    showAttachPoints(){
        this.visibleAttachPoints = true;
        this.parts.forEach(p=>{
            if (p instanceof AttachmantPart){
                p.showAttachPoints();
            }
        })
    }
    hideAttachPoint(){
        this.visibleAttachPoints = false;
        this.parts.forEach(p=>{
            if (p instanceof AttachmantPart){
                p.hideAttachPoint();
            }
        })
    }

    
    getUnusedAttachPoints(children=true){
        let points = this.attachPoints.filter(a=>this.usedAttachPoints.indexOf(a)==-1).map(a=>{
            a.owner = this;
            return a;    
        });
        if (children){
            this.parts.forEach(p=>{
                if (p instanceof AttachmantPart){
                    points = points.concat(p.getUnusedAttachPoints());
                }
            })
        }
        
        return points;
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
            let offset = {
                x:a.position.x,
                y:a.position.y,
            }
            if (a.owner.parent){
                offset.x = offset.x + a.owner.type.attachPoint.x; + a.owner.parentAttachPoint.position.x;
                offset.y = offset.y + a.owner.type.attachPoint.y + a.owner.parentAttachPoint.position.y;
                
            } 
            push();
           
                fill(255);
                translate(a.position.x+100, a.position.y+100)
                ellipse(0,0,10);
                pop();
            return {
                offset,
                attachPoint: a,
                distance: Math.sqrt(Math.pow((x-offset.x),2)+Math.pow(y-offset.y,2))
            }
        }).sort((a,b)=>a.distance-b.distance);

        return unusedAttachPoint[0];


    }

    

    addPart(item, point){
       // this.usedAttachPoints.push(point.attachPoint);

        let attachmentIndex = this.attachPoints.indexOf(point.attachPoint);
        let newPart = undefined;
        if (item.card.type == 'Tail') {
            newPart = new Tail(point.attachPoint,item.card.id);
        }
        else if (item.card.type == 'Eye'){
            newPart = new Eye(point.attachPoint,item.card.id);
        }
        else if (item.card.type == 'Body'){
            newPart = new Body(point.attachPoint,item.card.id,[],AllCards.Cards['body1'].attachments);
        }
        newPart.id = item.id;
        this.parts.push(newPart);
        this.usedAttachPoints = [];
        this.parts.forEach(p=>{
            p.setParent(this);
        })

        this.updateCollider(this.collider, this.onItemClick);
        //
    }

    

}