//0
class Scene {
    constructor(){
        
    }
    
    draw(){

    }

    height(){
        return engine.height;
    }
    width(){
        return engine.width;
    }
}

class Engine {
    
    setup(){
        this.scenesManages = new ScenesManager();
        this.height = 480;
        this.width = 640;
        createCanvas(this.width, this.height);
        console.log('Engine loaded')

        setTimeout(()=>{
            this.scenesManages.pushNewScene(new MenuScene());
        },10000)
    }
    
    draw(){
        this.scenesManages.draw();
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


class MenuScene extends Scene {

    draw(){
        fill(0);
        rect(0,0,this.width(), this.height());
    }
}
class ScenesManager {
    constructor(){
        this.scenes = {
            'splash': new SplashScene(),
        }
        this.scenesStack = [this.scenes['splash']];
    }

    draw(){
        this.scenesStack[this.scenesStack.length-1].draw();
    }

    //Stack managment
    pushNewScene(scene){
        this.scenesStack.push(scene);
    }
    pushScene(name){
        this.scenesStack.push(this.scenes[name]);
    }
    popScene(){
        this.scenesStack.pop();
    }
}



class SplashScene extends Scene {
    draw(){
        noStroke()
        fill(200, 200, 200, 255)
        rect(0, 0, this.width(), this.height())
    }
}