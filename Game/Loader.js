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

let engine;

function setup(){
    engine  = new Engine();
    engine.setup();
}

function draw(){
    engine.draw();
}

function keyPressed(){engine.keyPressed()}


class WorldScene extends Scene{

    draw(){
        noStroke();
        fill('#6aa177');
        rect(0,0,this.width(), this.height());
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



class SplashScene extends Scene {

    loaded(){
        console.log('splash loaded');
        setTimeout(() => {
            engine.scenesManager.pushScene('menu');
        }, 2000);
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