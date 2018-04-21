
class Engine {
    
    setup(){
        this.scenesManages = new ScenesManager();
        this.height = 600;
        this.width = 800;
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
