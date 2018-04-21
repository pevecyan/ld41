
class EditorScene extends Scene{
    constructor(character){
        super();
        this.character = character;
        this.character.position = {y:0, y:0};
        this.character.editMode = true;

        this.mouseCollider = createSprite(0,0);
        this.mouseCollider.addImage(loadImage('Assets/eye-proto/eye-body.png'));
        this.mouseCollider.debug = true;
        this.mouseCollider.setCollider('circle',0,0,2);

        this.character.updateCollider(this.mouseCollider, this.onItemClicked.bind(this))

        this.availableItems = [];
        this.updateAvailableItems();
    }

    updateAvailableItems(){
        let unusedCards = this.character.allCards.filter(a=>!this.character.usedCards.find(b=>a.id == b.id));
        console.log(unusedCards);
    }

    onItemClicked(item){
        let index = item.parent.parts.indexOf(item)
        if(index != undefined)
            item.parent.parts.splice(index, 1);
        
        this.updateAvailableItems();
    }

    loaded(){}

    draw(){
        this.mouseCollider.position.x=mouseX;
        this.mouseCollider.position.y= mouseY;
         

        noStroke();
        fill('#AC9678');
        rect(0,0,this.width(), this.height());


        
        
        push();
        this.mouseCollider.position.x = this.mouseCollider.position.x - this.width()/2;
        this.mouseCollider.position.y = this.mouseCollider.position.y - this.height()/2;
        
        translate(this.width()/2, this.height()/2 )
        this.character.draw();

        pop();

        drawSprite(this.mouseCollider);

        

        

    }
}