class Head extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            headProto:'Assets/head-proto.png'  
        };


        this.sprite = createSprite(x,y);
        this.sprite.addImage(loadImage(this.types[type]));

        this.parts = parts;
    }


    draw(deltaRotation){
        drawSprite(this.sprite);
        this.parts.forEach(part=>{
            part.draw(deltaRotation);
        })
    }

}