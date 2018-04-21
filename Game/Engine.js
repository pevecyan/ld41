
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
