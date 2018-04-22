
class Character {
    constructor(){
        this.allCards = [];
        this.usedCards = [];

        let bodyAttachments =  [
            {position:{x:0,y:30}, rotation:0},
            {position:{x:20,y:-15 },rotation: Math.PI},
            {position:{x:0,y:-30 },rotation: Math.PI},
            {position:{x:-20,y:-15 },rotation: Math.PI},
        ];

        

        this.body = this.addCard(new Head(0,0,'head2',[
            //this.addCard(new Tail(bodyAttachments[0],'tail2'),'tail2'),
            this.addCard(new Body(bodyAttachments[0],'body1',[
                this.addCard(new Tail(AllCards.Cards['body1'].attachments[0],'tail2'),'tail2'),
                //this.addCard(new Tail(AllCards.Cards['body1'].attachments[1],'tail2'),'tail2'),
                //this.addCard(new Tail(AllCards.Cards['body1'].attachments[2],'tail2'),'tail2'),
                //this.addCard(new Tail(AllCards.Cards['body1'].attachments[3],'tail2'),'tail2'),
                //this.addCard(new Tail(AllCards.Cards['body1'].attachments[4],'tail2'),'tail2'),
            ],AllCards.Cards['body1'].attachments),'body1',),
           // this.addCard(new Eye(bodyAttachments[1],'eye1'),'eye1'),
            //this.addCard(new Eye(bodyAttachments[2],'eye1'),'eye1'),
            //this.addCard(new Eye(bodyAttachments[3],'eye1'),'eye1'),
            
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
        rotate(this.rotation);
        this.body.draw(-deltaRotation, movements);
        pop();
    }

    addCard(item, type){
        let id = type+new Date().getTime()+Math.floor(Math.random()*100);
        let card = JSON.parse(JSON.stringify(AllCards.Cards[type]))
        this.allCards.push({id, card});
        this.usedCards.push({id, card});
        item.id = id;
        return item
    }

    useExistingCard(item){
        this.usedCards.push(item);
    }

    handleControls(movements){
        
        //if(this.editMode) return;
        
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
        if (keyDown(DOWN_ARROW)){
            let xChange = 2*Math.sin(this.rotation);
            let yChange = 2*Math.cos(this.rotation);
                this.position.x = this.position.x - xChange;
                this.position.y = this.position.y + yChange;
            
            
            movements.forward = true;
        }
    }

    updateCollider(collider, onMouseOver){
        this.body.updateCollider(collider, onMouseOver);
    }
}