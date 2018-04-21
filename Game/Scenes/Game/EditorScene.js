
class EditorScene extends Scene{
    constructor(character){
        super();
        this.character = character;
        this.character.position = {x:0, y:0};
        this.character.editMode = true;

        this.mouseCollider = createSprite(0,0);
        this.mouseCollider.addImage(loadImage('Assets/eye-proto/eye-body.png'));
        this.mouseCollider.debug = true;
        this.mouseCollider.setCollider('circle',0,0,2);

        this.character.updateCollider(this.mouseCollider, this.onItemClicked.bind(this))

        this.availableItems = [];
        this.itemOnMouse = undefined;

        this.updateAvailableItems();
    }

    updateAvailableItems(){
        let unusedCards = this.character.allCards.filter(a=>(this.character.usedCards.find(b=>a.id == b.id))?false:true);
        this.availableItems = [];
        unusedCards.forEach(c=>{
            let itemSprite = createSprite(0,0);
            itemSprite.addImage(loadImage(c.card.asset));
            itemSprite.debug = true;
            this.availableItems.push({sprite:itemSprite, card:c});
        })
    }

    onItemClicked(item){
        if (item == this.character.body)return;
        let index = item.parent.parts.indexOf(item)
        if(index > -1){
            item.parent.parts.splice(index, 1);
            let card = this.character.usedCards.find(c=>c.id == item.id);
            this.character.usedCards.splice(this.character.usedCards.indexOf(card),1);
            item.parent.freeAttachPoint(item.parentAttachPoint);
        }
            
        
        this.updateAvailableItems();
    }


    loaded(){
        this.pg = createGraphics(100, 100);
        this.pg.background(100);
        this.pg.noStroke();
        this.pg.ellipse(this.pg.width / 2, this.pg.height / 2, 50, 50)
    }

    draw(){
        this.mouseCollider.position.x = mouseX;
        this.mouseCollider.position.y = mouseY;
         

        noStroke();
        fill('#AC9678');
        rect(0,0,this.width(), this.height());


       
        
        
        push();
        this.storeCollider();
        this.mouseCollider.position.x = this.mouseCollider.position.x - this.width()/2;
        this.mouseCollider.position.y = this.mouseCollider.position.y - this.height()/2;
        
        translate(this.width()/2.0, this.height()/2.0 )
        this.character.draw();

        this.restoreCollider();
        pop();

        drawSprite(this.mouseCollider);

        if (this.itemOnMouse){
            let nearestAttachPoint = this.character.body.getNearestUnusedPoint(mouseX - this.width()/2.0 ,mouseY - this.height()/2.0); 
            console.log(nearestAttachPoint.distance);

            if(nearestAttachPoint && nearestAttachPoint.distance < 25){
                if (!mouseIsPressed){
                    this.character.body.addPart(this.itemOnMouse.card, nearestAttachPoint);
                    this.character.useExistingCard(this.itemOnMouse.card);
                    this.itemOnMouse = undefined;
                    this.updateAvailableItems()
                    this.character.body.hideAttachPoint();
                }
                else {
                    this.itemOnMouse.sprite.position.x = nearestAttachPoint.attachPoint.position.x + this.width()/2.0 + this.itemOnMouse.card.card.attachPoint.x;
                    this.itemOnMouse.sprite.position.y = nearestAttachPoint.attachPoint.position.y +this.height()/2.0 + this.itemOnMouse.card.card.attachPoint.y;
                    
                }
                
                
            }
            else {
                this.itemOnMouse.sprite.position.x = mouseX + this.itemOnMouse.card.card.attachPoint.x;
                 this.itemOnMouse.sprite.position.y = mouseY+ this.itemOnMouse.card.card.attachPoint.y;
            }

            if (this.itemOnMouse){
                drawSprite(this.itemOnMouse.sprite);
            }
                
        }

        push();
        this.storeCollider();
        this.translateSprite(50,600);
        this.availableItems.forEach(i=>{
            if (i == this.itemOnMouse){
            } else {
                drawSprite(i.sprite)
            }
            
            
            
            if (i.sprite.overlap(this.mouseCollider)){
                i.sprite.scale = 1.2;
                if (mouseIsPressed && !this.itemOnMouse){
                    this.itemOnMouse = i;
                    this.character.body.showAttachPoints();
                } 
            }else {
                i.sprite.scale = 1;
                if (!mouseIsPressed && this.itemOnMouse){
                    this.itemOnMouse.sprite.position.x = 0;
                    this.itemOnMouse.sprite.position.y = 0;
                    this.itemOnMouse = undefined;
                    this.character.body.hideAttachPoint();
                }
            }


            this.translateSprite(50,0);
        })
        this.restoreCollider();
        pop();

    }

    translateSprite(x,y){
        translate(x,y);
        if(this.mouseCollider){
            this.mouseCollider.position.x  = this.mouseCollider.position.x -x
            this.mouseCollider.position.y  = this.mouseCollider.position.y -y
        }
    }


    storeCollider(){
        if(this.mouseCollider)
            this.oldColliderPosotion = {x:this.mouseCollider.position.x,y:this.mouseCollider.position.y};
    }
    restoreCollider(){
        if(this.mouseCollider){
            this.mouseCollider.position.x = this.oldColliderPosotion.x;
            this.mouseCollider.position.y = this.oldColliderPosotion.y;

        }
    }
}