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

