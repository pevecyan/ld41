
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
