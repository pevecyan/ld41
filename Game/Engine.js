
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
