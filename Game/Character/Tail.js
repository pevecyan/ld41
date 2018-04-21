class Tail extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            tailProto:{asset:'Assets/tail-proto.png', attachPoint:{x:0,y:30}}  
        };



        this.type = this.types[type];

        this.sprite = createSprite(0,0);
        this.sprite.addImage(loadImage(this.type.asset));

        this.position = {x,y};
        this.rotation = 0;

        this.parts = parts;

        this.direction = 1;
    }


    draw(deltaRotation, movements){
        push();
        //translate(this.position.x, this.position.y);

        translate(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);

        if (movements.forward){
            if (this.direction < 0) {
                this.rotation += 0.05*(1.5+Math.random()*2);
            } else if(this.direction > 0) {
                this.rotation -= 0.05*(1.5+Math.random()*2);
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
        console.log(this.rotation);
        
        
        rotate(this.rotation);
        translate(this.type.attachPoint.x, this.type.attachPoint.y);


        drawSprite(this.sprite);
        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
    }

}