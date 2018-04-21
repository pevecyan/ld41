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
        this.scale = 1;

        this.parts = parts;
    }


    draw(deltaRotation, movements){
        push();
        //translate(this.position.x, this.position.y);

        
        this.translateSprite(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);
        
        rotate(this.rotation);
        this.translateSprite(this.type.attachPoint.x, this.type.attachPoint.y);
        this.handleOverlap()


        push();
        scale(this.scale);
        drawSprite(this.sprite);
        pop();

        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }


    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
    }

    handleOverlap(){
        if (this.collider){
            if (this.collider.overlap(this.sprite)){
                if (mouseIsPressed){this.mousePressedOn = true; }
                if (!mouseIsPressed && this.mousePressedOn)  this.onItemClick(this);
                this.onMouseOver();
                
            } else {
                this.onMouseOut();
                this.mousePressedOn = false;
            }
        }
    }

    translateSprite(x,y){
        translate(x,y);
        if(this.collider){
            this.collider.position.x  = this.collider.position.x -x
            this.collider.position.y  = this.collider.position.y -y
        }
    }


    setParent(parent){this.parent = parent}
}
class Head extends BodyPart{
    constructor(x,y, type, parts = []){
        super(x,y, type);
        this.types = {
            headProto:'Assets/head-proto.png'  
        };


        this.sprite = createSprite(x,y);
        this.sprite.addImage(loadImage(this.types[type]));
        this.sprite.debug = true;
        this.parts = parts;
        this.parts.forEach(p=>{
            p.setParent(this);
        })

        this.scale = 1;
        this.overlaping = false;
        this.collider = undefined;
        this.onColliderOverlap = undefined;
    }


    draw(deltaRotation, movements){
        push();
        push();
        scale(this.scale);
        drawSprite(this.sprite);
        this.handleOverlap();
        pop();
        
        this.parts.forEach(part=>{
            part.draw(deltaRotation, movements);
        })
        
        pop();

        
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }

    handleOverlap(){
        if (this.collider && this.parts.length == 0){
            if (this.collider.overlap(this.sprite)){
                if (mouseIsPressed){this.mousePressedOn = true; }
                if (!mouseIsPressed && this.mousePressedOn)  this.onItemClick(this);
                this.onMouseOver();
                
            } else {
                this.onMouseOut();
                this.mousePressedOn = false;
            }
        }
    }

    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
        this.parts.forEach(p=>{
            p.updateCollider(collider, onItemClick);
        })
    }

    setParent(parent){this.parent = parent}
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
        this.sprite.debug = true;

        this.position = {x,y};
        this.rotation = 0;

        this.parts = parts;

        this.direction = 1;
        this.scale = 1;
    }

    storeCollider(){
        if(this.collider)
            this.oldColliderPosotion = {x:this.collider.position.x,y:this.collider.position.y};
    }
    restoreCollider(){
        if(this.collider){
            this.collider.position.x = this.oldColliderPosotion.x;
            this.collider.position.y = this.oldColliderPosotion.y;

        }
    }

    draw(deltaRotation, movements){
        this.storeCollider();
        push();
        //translate(this.position.x, this.position.y);

        this.translateSprite(this.position.x-this.type.attachPoint.x, this.position.y-this.type.attachPoint.y);

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
        this.translateSprite(this.type.attachPoint.x, this.type.attachPoint.y)
        this.handleOverlap()
        

        push();
        scale(this.scale);
        drawSprite(this.sprite);
        pop();

        this.parts.forEach(part=>{
            part.draw();
        })
        pop();
        this.restoreCollider();
    }

    onMouseOver(){
        this.scale = 1.2;
    }
    onMouseOut(){
        this.scale = 1;
    }

    handleOverlap(){
        if (this.collider){
            if (this.collider.overlap(this.sprite)){
                if (mouseIsPressed){this.mousePressedOn = true; }
                if (!mouseIsPressed && this.mousePressedOn)  this.onItemClick(this);

                this.onMouseOver();
            } else {
                this.onMouseOut();
                this.mousePressedOn = false;
            } 
        }
    }

    translateSprite(x,y){
        translate(x,y);
        if(this.collider){
            this.collider.position.x  = this.collider.position.x -x
            this.collider.position.y  = this.collider.position.y -y
        }
    }

    setParent(parent){this.parent = parent}

    updateCollider(collider, onItemClick){
        this.collider = collider;
        this.onItemClick = onItemClick;
    }

}

class Engine {
    
    setup(){
        this.scenesManager = new ScenesManager();
        this.height = 800;
        this.width = 1024;
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

        this.character.updateCollider(this.mouseCollider, this.onItemClicked)

    
    }

    onItemClicked(item){
        let index = item.parent.parts.indexOf(item)
        if(index != undefined)
            item.parent.parts.splice(index, 1);
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

    keyPressed(){
        if (keyCode == 69){
            engine.scenesManager.pushNewScene(new EditorScene(this.character));
        }
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
