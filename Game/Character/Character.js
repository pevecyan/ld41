
class Character {
    constructor(){
        this.bodyParts = new Group();

        this.body = new Head(0,0,'headProto',[
            new Tail(0,50,'tailProto')
        ]);

        this.position = {x:100,y:100}
        this.rotation = 0;
        
    }

    draw(){
        let previousRotation = this.rotation;
        this.handleControls();

        let deltaRotation = this.rotation - previousRotation;

        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation)
        this.body.draw(-deltaRotation);
        pop();
    }


    handleControls(){
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
        }
    }
}