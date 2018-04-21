//0
class BodyPart{
    constructor(x,y, type){
    }

    attach(parent, type, x, y){
        
    }
    dettach(parent){
        parent.remove(this.sprite);
    };
}
//0
class Scene {
    constructor(){
        
    }
    
    draw(){}
    loaded(){}
    unloaded(){}
    keyPressed(){}


    height(){
        return engine.height;
    }
    width(){
        return engine.width;
    }
}
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


    draw(deltaRotation, movements){
        drawSprite(this.sprite);
        this.parts.forEach(part=>{
            part.draw(deltaRotation, movements);
        })
    }

}
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
                this.rotation += 0.05*(1.5+Math.random()*2)+Math.abs(deltaRotation);
            } else if(this.direction > 0) {
                this.rotation -= 0.05*(1.5+Math.random()*2)+Math.abs(deltaRotation);
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
        
        
        rotate(this.rotation);
        translate(this.type.attachPoint.x, this.type.attachPoint.y);


        drawSprite(this.sprite);
        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
    }

}

class Engine {
    
    setup(){
        this.scenesManager = new ScenesManager();
        this.height = 600;
        this.width = 800;
        createCanvas(this.width, this.height);
        console.log('Engine loaded')

    }
    
    draw(){
        this.scenesManager.draw();
    }
    keyPressed(){
        this.scenesManager.keyPressed();
    }
}


class Character {
    constructor(){
        this.bodyParts = new Group();

        this.body = new Head(0,0,'headProto',[
            new Tail(0,50,'tailProto'),
            new Eye(0,-20, 'eyeProto')
        ]);

        this.position = {x:100,y:100}
        this.rotation = 0;
        
    }

    draw(){
        let previousRotation = this.rotation;
        let movements = {forward: false, left:false, right:false}
        this.handleControls(movements);

        let deltaRotation = this.rotation - previousRotation;

        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation)
        this.body.draw(-deltaRotation, movements);
        pop();
    }


    handleControls(movements){
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
}

class WorldScene extends Scene{

    constructor(){
        super();
        this.character = new Character();
    }

    loaded(){
        
    }

    draw(){
        noStroke();
        fill('#6aa177');
        rect(0,0,this.width(), this.height());

        this.character.draw();
    }
}

class MenuScene extends Scene {

    draw(){
        noStroke()
        fill('rgb(1, 119, 186)');
        rect(0, 0, this.width(), this.height());

        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(30);
        text('press space to play', 0, 0, this.width(), this.height()-30);
    }

    keyPressed(){
        if (keyCode == 32){
            engine.scenesManager.pushNewScene(new WorldScene());
        }
    }
    
}

class SplashScene extends Scene {

    loaded(){
        console.log('splash loaded');
        setTimeout(() => {
            engine.scenesManager.pushScene('menu');
        }, 500);
    }
    
    draw(){
        noStroke()
        
        fill('rgb(1, 119, 186)');
        rect(0, 0, this.width(), this.height());
        textAlign(CENTER,CENTER);
        fill(255);
        textSize(30);
        text('GAME NAME', 0, 0, this.width(), this.height())
    }
}   
class ScenesManager {
    constructor(){
        this.scenesStack = [];

        this.scenes = {
            'splash': new SplashScene(),
            'menu': new MenuScene()
        }
        this.pushScene('splash');
    }

    draw(){
        if (this.scenesStack.length > 0)
            this.scenesStack[this.scenesStack.length-1].draw();

        fill(255);
        textAlign(CENTER, BASELINE);
        textSize(30);
        text(keyCode, 0, 0, 800, 30);
    }

    //Stack managment
    pushNewScene(scene){
        this.scenesStack.push(scene);
        scene.loaded();
    }
    pushScene(name){
        this.scenesStack.push(this.scenes[name]);
        this.scenes[name].loaded();
    }
    popScene(){
        let scene = this.scenesStack.pop();
        scene.unloaded();
    }
    keyPressed(){
        if(this.scenesStack.length > 0){
            this.scenesStack[this.scenesStack.length-1].keyPressed();
        }
    }
}


let engine;

function setup(){
    engine  = new Engine();
    engine.setup();
}

function draw(){
    engine.draw();
}

function keyPressed(){engine.keyPressed()}
