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

        this.parts = parts;
    }


    draw(deltaRotation, movements){
        push();
        //translate(this.position.x, this.position.y);

        translate(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);

        
        rotate(this.rotation);
        translate(this.type.attachPoint.x, this.type.attachPoint.y);


        drawSprite(this.sprite);
        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
    }

}