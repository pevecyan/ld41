
class Character {
    constructor(){
        this.allCards = [];
        this.usedCards = [];

        let bodyAttachments =  [{position:{x:0,y:30}, rotation:0}];

        this.body = this.addCard(new Head(0,0,'head2',[
            this.addCard(new Tail(bodyAttachments[0],'tail2'),'tail2'),
            //new Eye(0,-20, 'eyeProto')
        ],bodyAttachments),'head2');

        
        this.position = {x:100,y:100}
        this.rotation = 0;
        this.editMode = false;
        this.collider = undefined;
    }

    draw(){
        let previousRotation = this.rotation;
        let movements = {forward: false, left:false, right:false}
        this.handleControls(movements);

        let deltaRotation = this.rotation - previousRotation;

        push();
        if (this.collider){
            this.collider.position.x = this.collider.position.x -this.position.x;
            this.collider.position.y = this.collider.position.y -this.position.y;
            

        }
        translate(this.position.x, this.position.y);
        rotate(this.rotation)
        this.body.draw(-deltaRotation, movements);
        pop();
    }

    addCard(item, type){
        let id = type+new Date().getTime();
        this.allCards.push({id, card:AllCards.Cards[type]});
        this.usedCards.push({id, card:AllCards.Cards[type]});
        item.id = id;
        return item
    }

    useExistingCard(item){
        this.usedCards.push(item);
    }

    handleControls(movements){
        
        if(this.editMode) return;
        
        if (keyDown(LEFT_ARROW)){
            this.rotation -= 0.05;
        }
        if (keyDown(RIGHT_ARROW)){
            this.rotation += 0.05;
        }
        if (keyDown(UP_ARROW)){
            let xChange = 2*Math.sin(this.rotation);
            let yChange = 2*Math.cos(this.rotation);
                this.position.x = this.position.x + xChange;
                this.position.y = this.position.y - yChange;
            
            
            movements.forward = true;
        }
    }

    updateCollider(collider, onMouseOver){
        this.body.updateCollider(collider, onMouseOver);
    }
}