
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

        this.character.updateCollider(this.mouseCollider, (item)=>{

        })


        this.mouseCollider2 = createSprite(200,200);
        this.mouseCollider2.addImage(loadImage('Assets/eye-proto/eye-body.png'));
        this.mouseCollider2.debug = true;

    
    }

    loaded(){}

    draw(){
        this.mouseCollider.position.x=mouseX;
        this.mouseCollider.position.y= mouseY;
        

        if(this.mouseCollider.overlap(this.mouseCollider2)){
            console.log('overlap');
        }

        

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
        drawSprite(this.mouseCollider2);

        

        

    }
}