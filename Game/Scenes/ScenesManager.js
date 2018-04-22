class ScenesManager {
    constructor(){
        this.scenesStack = [];

        this.scenes = {
            'splash': new SplashScene(),
            'menu': new MenuScene(),
        }
        this.pushScene('menu');
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

    isSceneType(type){
        return this.scenesStack[this.scenesStack.length-1] instanceof type;
    }
}

